<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Admin;
use App\Models\Offer;
use App\Models\Trade;
use App\Models\Country;

use App\Models\Deposit;
use App\Models\Currency;
use App\Models\Transaction;
use App\Models\Withdrawals;
use App\Helpers\MediaHelper;
use Illuminate\Http\Request;
use InvalidArgumentException;
use App\Models\Generalsetting;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use App\Http\Requests\Admin\AdminProfileRequest;

class AdminController extends Controller
{
   public function __construct()
   {
     $this->middleware('auth:admin');
   }


    // DASHBOARD
    public function index()
    {
        $data['totalUser']     = User::where('email_verified',1)->count();
        $data['totalCrypto']   = Currency::where('type',2)->count();
        $data['totalFiat']     = Currency::where('type',1)->count();
        $data['totalCountry']  = Country::count();
        $data['totalRole']     = DB::table('roles')->count();
        $data['totalStaff']    = Admin::where('role','!=','super-admin')->count();
        $data['totalDeposit']  =   0;
        $data['totalWithdraw'] = Withdrawals::with('currency')->sum('amount');
        $data['totalOffer']    = Offer::where('status',1)->count();
        $data['totalTrade']    = Trade::count();

        $data['curr'] = [];
        $data['depositAmount'] = [];
        $data['withdrawAmount'] = [];
       
        foreach (Currency::where('type',2)->get() as $key => $val) {
            $data['curr'][] = $val->code;
            $data['depositAmount'][] = $val->deposits()->sum('total_amount');
            $data['withdrawAmount'][] = $val->withdrawals()->sum('total_amount');
        }

        $data['offers']  = Offer::with(['crypto','fiat','gateway','user','duration'])->latest()->take(7)->get();
        return view('admin.dashboard',$data);
    }

    // PROFILE
    public function profile()
    {
        $data = admin();
        return view('admin.profile',compact('data'));
    }


    // PROFILE
    public function profileupdate(AdminProfileRequest $request)
    {
        $request->validate(['name'=>'required','email'=>'required|email','phone'=>'required']);
        $data = admin();
        $input = $request->only('name','photo','phone','email');
        
        if($request->hasFile('photo')){
            $status = MediaHelper::ExtensionValidation($request->file('photo'));
            if(!$status){
                return back()->with('error','Image format is invalid');
            }
            $input['photo'] = MediaHelper::handleUpdateImage($request->file('photo'),$data->photo,[200,200]);
        }

        $data->update($input);
        return back()->with('success','Profile Updated Successfully');
    }

    // CHANGE PASSWORD
    public function passwordreset()
    {
        return view('admin.change_password');
    }

    public function changepass(AdminProfileRequest $request)
    {
        $request->validate(['old_password'=>'required','password'=>'required|confirmed|min:6']);
        $user = admin();
        if ($request->old_password){
            if (Hash::check($request->old_password, $user->password)){
                $user->password = bcrypt($request->password);
                $user->update();
            }else{
                return back()->with('error','Old Password Mismatch');  
            }
        }
    
        return back()->with('success','Password Changed Successfully');

    }

    public function profitReports()
    {
        $remark = request('remark');
        $search = request('search');
        $range = request('range');
        $startDate = null;
        $endDate   = null;
      
        if(request('range') != null){
            $date     = explode('-',$range);
            $startDate = @trim($date[0]);
            $endDate   = @trim($date[1]);

            if ($startDate && !preg_match("/\d{2}\/\d{2}\/\d{4}/",$startDate))  return back()->with('error','Invalid date format');
        
            if ($endDate && !preg_match("/\d{2}\/\d{2}\/\d{4}/",$endDate))  return back()->with('error','Invalid date format');
        }
        
        $logs = Transaction::when($remark,function($q) use($remark){
            return $q->where('remark',$remark);
        })
        ->when($search,function($q) use($search){
            return $q->where('trnx',$search);
        })
        ->when(request('range'),function($q) use($startDate,$endDate){
            return $q->whereDate('created_at','>=',dateFormat($startDate,'Y-m-d'))->whereDate('created_at','<=',dateFormat($endDate,'Y-m-d'));
        })
        ->where('charge','>',0)->with('currency')->latest()->paginate(15);
        return view('admin.profit_report',compact('logs','range'));
    }

    public function transactions()
    {
        $remark = request('remark');
        $search = request('search');

        $transactions = Transaction::when($remark,function($q) use($remark){
            return $q->where('remark',$remark);
        })
        ->when($search,function($q) use($search){
            return $q->where('trnx',$search);
        })
        ->with('currency')->latest()->paginate(15);
        return view('admin.transactions',compact('transactions','search'));
    }

    public function cookie()
    {
        return view('admin.cookie');
    }

    public function updateCookie(Request $request)
    {
        $data = $request->validate([
            'status' => 'required',
            'button_text' => 'required',
            'cookie_text' => 'required'
        ]);

        $gs = Generalsetting::first();
        $gs->cookie = $data;
        $gs->update();
        return back()->with('success','Cookie concent updated');
    }



    public function activation()
    {
        $activation_data = "";
        if (file_exists(base_path('..').'/project/vendor/markury/license.txt')){
            $license = file_get_contents(base_path('..').'/project/vendor/markury/license.txt');
            if ($license != ""){
                $activation_data = "<i style='color:#08bd08; font-size:45px!important' class='fas fa-check-circle mb-3'></i><br><h3 style='color:#08bd08;'>Your system is activated!</h3>";
            }
        }
        return view('admin.activation',compact('activation_data'));
    }


    public function activation_submit(Request $request)
    {
        $purchase_code =  $request->pcode;
        $my_script =  'Genius Exchange';
        $my_domain = url('/');

        $varUrl = str_replace (' ', '%20', config('services.genius.ocean').'purchase112662activate.php?code='.$purchase_code.'&domain='.$my_domain.'&script='.$my_script);

        if( ini_get('allow_url_fopen') ) {
            $contents = file_get_contents($varUrl);
        }else{
            $ch = curl_init();
            curl_setopt ($ch, CURLOPT_URL, $varUrl);
            curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
            $contents = curl_exec($ch);
            curl_close($ch);
        }

        $chk = json_decode($contents,true);

        if($chk['status'] != "success")
        {
            $msg = $chk['message'];
            return back()->with('error',$msg);

        } else{
            $this->setUp($chk['p2'],$chk['lData']);

            if (file_exists(base_path('..').'/rooted.txt')){
                unlink(base_path('..').'/rooted.txt');
            }

            $fpbt = fopen(base_path('..').'/project/vendor/markury/license.txt', 'w');
            fwrite($fpbt, $purchase_code);
            fclose($fpbt);

            $msg = 'Congratulation!! Your System is successfully Activated.';
            return back()->with('success',$msg);
          
        }
       
    }

    function setUp($mtFile,$goFileData){
        $fpa = fopen(base_path('..').$mtFile, 'w');
        fwrite($fpa, $goFileData);
        fclose($fpa);
    }



}
