<?php

use App\Http\Controllers\JsonController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Events\BattleEvent;
use App\Http\Controllers\SampleController;
use App\Http\Controllers\CardsController;


Route::get('/getCards', function () {
    BattleEvent::dispatch();
    return view('welcome');
});

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'greeting' => 'Hello World!',
    ]);
});


//Route::get('/home/fillter', [CardsController::class,'fillterIndex'])->name('');
Route::get('/home',[CardsController::class,'index'])->name('home');
Route::post('/home',[CardsController::class,'index'])->name('home');
Route::get('/home/create',[CardsController::class,'monsterCreate'])->name('monster.create');
Route::post('/home/store',[CardsController::class,'store'])->name('monster.store');
Route::post('/home/store/magic',[CardsController::class,'magicStore'])->name('magic.store');
Route::post('/home/store/trap',[CardsController::class,'trapStore'])->name('trap.store');
Route::get('/home/detail/{id}/{type}',[CardsController::class,'detail']);
Route::get('/home/edit/{id}/1',[CardsController::class,'edit'])->name('monster.edit');
Route::get('/home/edit/{id}/2',[CardsController::class,'magicEdit'])->name('magic.edit');
Route::get('/home/edit/{id}/3',[CardsController::class,'trapEdit'])->name('trap.edit');
Route::post('/home/update/{id}',[CardsController::class,'update'])->name('monster.update');
Route::post('/home/update/magic/{id}',[CardsController::class,'magicUpdate'])->name('magic.update');
Route::post('/home/update/trap/{id}',[CardsController::class,'trapUpdate'])->name('trap.update');
Route::post('/home/delete',[CardsController::class,'Delete'])->name('Delete');
Route::get('/home/test',[JsonController::class,'toJson'])->name('test');

//Route::post('/home/search/1',[CardsController::class,'monsterSearch'])->name('monster.search');//
//Route::post('/home/serach/2',[CardsController::class,'magicSearch'])->name('magic.search');
//Route::post('/home/search/3',[CardsController::class,'trapSearch'])->name('trap.search');
//Route::post('/home/search/4',[CardsController::class,'trapSearch']);




Route::get('/sample', [SampleController::class, 'index'])->name('sample');
Route::get('/sample/detail/{id}', [SampleController::class, 'detail'])->name('sample.detail');
Route::get('/sample/create', [SampleController::class, 'create'])->name('sample.create');
Route::post('/sample/store', [SampleController::class, 'store'])->name('sample.store');
Route::get('/sample/edit/{id}', [SampleController::class, 'edit'])->name('sample.edit');
Route::post('/sample/update/{id}', [SampleController::class, 'update'])->name('sample.update');