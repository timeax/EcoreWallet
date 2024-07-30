<?php

namespace App\Providers;

use App\Helpers\Display;
use App\Models\Generalsetting;
use App\Models\SupportTicket;
use App\Models\Trade;
use App\Models\User;
use App\Models\Withdrawals;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        app()->usePublicPath(realpath(base_path() . '/public_html'));
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Paginator::useBootstrap();

        view()->composer('*', function ($settings) {
            $settings->with('gs', cache()->remember('generalsettings', now()->addDay(), function () {
                return Generalsetting::first();
            }));
        });

        view()->composer('admin.partials.sidebar', function ($view) {
            $view->with([
                'pending_withdraw'        =>  Withdrawals::whereStatus(0)->count(),
                'pending_user_ticket'     =>  SupportTicket::whereStatus(0)->whereHas('messages')->count(),
                'pending_deposits'        =>  0,
                'dispute_trades'          =>  Trade::whereStatus(4)->count(),
                'pending_user_kyc'        =>  User::whereStatus(1)->where('kyc_status', 2)->count(),
            ]);
        });

        $display = new Display();

        $display->share('*', function (Request $request) {
            return [
                'user' => $request->user()
            ];
        });


        Validator::extend('email_domain', function ($attribute, $value, $parameters, $validator) {
            $gs = Generalsetting::first();
            $allowedEmailDomains = explode(',', $gs->allowed_email);
            return in_array(explode('@', $parameters[0])[1], $allowedEmailDomains);
        });

        Blade::directive('langg', function ($expression) {
            return "<?php echo translate($expression); ?>";
        });

        Cache::clear();
    }
}
