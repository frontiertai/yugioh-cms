<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SampleController extends Controller
{
    //
    public function index()
    {
        $data = [
            ['id' => 1, 'name' => 'John Doe'],
            ['id' => 2, 'name' => 'Jane Doe'],
            ['id' => 3, 'name' => 'John Smith'],
            ['id' => 4, 'name' => 'Jane Smith'],
        ];
        return Inertia::render('sample/SampleIndex', [
            'list' => $data,
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
        dd($data);
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
