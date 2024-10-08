<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\MediaHelper;
use App\Http\Controllers\Controller;
use App\Models\SiteContent;
use App\Traits\ContentRules;
use Illuminate\Http\Request;

class SiteContentController extends Controller
{
    use ContentRules;

    public function index()
    {
        $sections = SiteContent::get();
        return view('admin.site_contents.index',compact('sections'));
    }
    public function edit($id)
    {
        $section = SiteContent::findOrFail($id);
        return view('admin.site_contents.'.$section->slug,compact('section'));
    }

   
    public function contentUpdate(Request $request,$id)
    { 
        $content = SiteContent::findOrFail($id);
        $rules   = trim($content->slug);
        $data    = $request->validate($this->$rules());
        $old     = $content->content;
     
        if(@$old->image) $data['image'] = @$old->image;
        if($request->image){
            $size = explode('x',$request->image_size);
            $data['image'] = MediaHelper::handleUpdateImage($request->image,@$old->image,[$size[0],$size[1]]);
        }

        $content->content = $data;
        $content->update();

        return back()->with('success','Data updated successfully');
    }
    
    public function subContentUpdate(Request $request,$id)
    {
        $content = SiteContent::findOrFail($id);
        $rules   = trim($content->slug).'_subcontent';
        $data    = $request->validate($this->$rules());
        if(isset($data['description'])) $data['description'] = clean($data['description']);
        $subContent = $content->sub_content;

        if($request->image){
            $size = explode('x',$request->image_size);
            $data['image'] = MediaHelper::handleUpdateImage($request->image,@$subContent->image,[$size[0],$size[1]]);
        }

        $subContent = (array) $subContent;
        array_push($subContent,$data);
        $content->sub_content = $subContent;
        $content->update();

        return back()->with('success','Subcontent added successfully');
    }
    

    public function subContentUpdateSingle(Request $request)
    {
        $content = SiteContent::findOrFail($request->section);
     
        $rules   = trim($content->slug).'_subcontent';
        $data    = $request->validate($this->$rules());
        if(isset($data['description'])) $data['description'] = clean($data['description']);
        $subContent = (array) $content->sub_content;
        $old     = $subContent[$request->sub_key];
      
        if(@$old->image) $data['image'] = $old->image;
        if($request->image){
            $size = explode('x',$request->image_size);
            $data['image'] = MediaHelper::handleUpdateImage($request->image,@$old->image,[$size[0],$size[1]]);
        }

        $replacements         = array($request->sub_key => $data);
        $newData              = json_decode(json_encode(array_replace($subContent, $replacements)));
        $content->sub_content = $newData;
        $content->update();
        return back()->with('success','Data updated successfully');
    }

    public function subContentRemove(Request $request)
    {
        $content = SiteContent::findOrFail($request->section);
        $subContent = (array) $content->sub_content;
        unset($subContent[$request->key]);
        $content->sub_content = $subContent;
        $content->update();
        return back()->with('success','Subcontent removed successfully');
    }

    public function statusUpdate(Request $request)
    {
        $content = SiteContent::find($request->id);
        if ($content->status == 9) return response()->json(['error' => __('This section status can not be changed')]);
        if(!$content) return response()->json(['error' => __('Section not found')]);
        
        if($content->status == 1) {
            $content->status = 0;
            $msg = ucfirst($content->name).' section is turned off';
        } else {
            $content->status = 1;
            $msg = ucfirst($content->name).' section is turned on';
        }

        $content->update();
        return response()->json(['success'=> __($msg)]);
    }
}
