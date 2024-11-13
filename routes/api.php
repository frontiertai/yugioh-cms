<?php

use App\Http\Controllers\JsonController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/getCards', [JsonController::class, 'toJson']);
Route::post('/getCards', [JsonController::class, 'toJson'])->name(('toJson'));
