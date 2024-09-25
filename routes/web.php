<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'greeting' => 'Hello World!',
    ]);
});