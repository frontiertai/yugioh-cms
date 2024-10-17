<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SampleController;
use App\Http\Controllers\CardsController;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'greeting' => 'Hello World!',
    ]);
});


Route::get('/home',[CardsController::class,'index']);
Route::get('/home/create',[CardsController::class,'monsterCreate'])->name('monster.create');
Route::post('/home/store',[CardsController::class,'store']);
Route::post('/home/store/magic',[CardsController::class,'magicStore']);
Route::post('/home/store/trap',[CardsController::class,'trapStore']);




Route::get('/sample', [SampleController::class, 'index'])->name('sample');
Route::get('/sample/detail/{id}', [SampleController::class, 'detail'])->name('sample.detail');
Route::get('/sample/create', [SampleController::class, 'create'])->name('sample.create');
Route::post('/sample/store', [SampleController::class, 'store'])->name('sample.store');
Route::get('/sample/edit/{id}', [SampleController::class, 'edit'])->name('sample.edit');
Route::post('/sample/update/{id}', [SampleController::class, 'update'])->name('sample.update');