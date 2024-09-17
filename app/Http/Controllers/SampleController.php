<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Sample;

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
        return Inertia::render('sample/SampleDetail', [
            'id' => $id,
        ]);
    }

    public function create()
    {
        return Inertia::render('sample/SampleCreate');
    }

    public function store(Request $request)
    {
        $data = $request->all();
        Sample::create($data);
        return redirect('/sample');
    }

    public function edit($id)
    {
        return Inertia::render('sample/SampleEdit', [
            'id' => $id,
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        return redirect('/sample');
    }
}
