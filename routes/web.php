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

Route::get('/sample', [SampleController::class, 'index'])->name('sample');
Route::get('/sample/detail/{id}', [SampleController::class, 'detail'])->name('sample.detail');
Route::get('/sample/create', [SampleController::class, 'create'])->name('sample.create');
Route::post('/sample/store', [SampleController::class, 'store'])->name('sample.store');
Route::get('/sample/edit/{id}', [SampleController::class, 'edit'])->name('sample.edit');
Route::post('/sample/update/{id}', [SampleController::class, 'update'])->name('sample.update');