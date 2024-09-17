<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SampleController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'greeting' => 'Hello World!',
    ]);
});

Route::get('/sample', [SampleController::class, 'index']);
Route::get('/sample/detail/{id}', [SampleController::class, 'detail']);
Route::get('/sample/create', [SampleController::class, 'create']);
Route::post('/sample/store', [SampleController::class, 'store']);
Route::get('/sample/edit/{id}', [SampleController::class, 'edit']);
Route::post('/sample/update/{id}', [SampleController::class, 'update']);