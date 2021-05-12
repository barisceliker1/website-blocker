<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/device_information', 'App\Http\Controllers\RedirectController@index')->name("device_information");
Route::get('/welcome', 'App\Http\Controllers\RedirectController@welcome')->name('welcome');
Route::post('/device_information', 'App\Http\Controllers\RedirectController@post')->name('post');

Route::middleware('redirect')->group(function () {
    Route::get('/index', 'App\Http\Controllers\RedirectController@index1');
});
Route::get('/search', 'App\Http\Controllers\RedirectController@search')->name('search');

Route::get('/redirect_list', 'App\Http\Controllers\RedirectController@redirectList');
