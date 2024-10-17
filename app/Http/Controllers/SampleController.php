<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Sample;
use Storage;

class SampleController extends Controller
{
    //
    public function index()
    {
        $sampleData = Sample::all();
        return Inertia::render('sample/SampleIndex', [
            'list' => $sampleData,
        ]);
    }

    public function detail($id)
    {
        $data = Sample::find($id);
        return Inertia::render('sample/SampleDetail', [
            'id' => $id,
            'name' => $data->name,
            'img_path' => $data->img_path,
        ]);
    }

    public function create()
    {
        return Inertia::render('sample/SampleCreate');
    }

    public function store(Request $request)
    {

        //上で条件、下でエラーメッセージの表示
        $request->validate([
            'name' => 'required',
            'img_path' => 'required|image',
        ],
        [
            'name.required' => '名前は必須です。',
            'img_path.required' => '画像は必須です。',
            'img_path.image' => '画像ファイルを指定してください。',
        ]);

        $data = $request->all();

        $path = $request->file('img_path')->store('images', 'public');
        $data['img_path'] = $path;

        Sample::create($data);
        return redirect('/sample');
    }

    public function edit($id)
    {
        $data = Sample::find($id);
        return Inertia::render('sample/SampleEdit', [
            'id' => $id,
            'name' => $data->name,
        ]);
    }
    
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'img_path' => 'nullable|image',
        ],
        [
            'name.required' => '名前は必須です。',
            'img_path.image' => '画像ファイルを指定してください。',
        ]);
        $updateEntiry = Sample::find($id);

        // 画像更新がある場合は削除して新しい画像を保存
        $image = $request->file('img_path');
        if (isset($image)) {
            Storage::disk('public')->delete($updateEntiry->img_path);
            $path = $request->file('img_path')->store('images', 'public');
            $updateEntiry->img_path = $path;
        }

        $updateEntiry->update([
            'name' => $request->name,
            'img_path' => $updateEntiry->img_path,
        ]);
        return redirect('/sample');
    }
}
