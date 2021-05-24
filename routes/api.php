<?php

use App\Models\DeviceInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use CloudCreativity\LaravelJsonApi\Facades\JsonApi;
use CloudCreativity\LaravelJsonApi\Routing\RouteRegistrar as Api;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
JsonApi::register('v1', [], function (Api $api) {
    $api->resource('deviceinformations');
});
Route::post('/posts',function (Request $request){
    $pointOfdevice = 0;
    ini_set('memory_limit', '9000M');
    $howMuchImportant=0.55;
   $userIp =  $request->data['attributes']['ip_address'];
   $device =  $request->data['attributes']['device'];
   $new = DeviceInformation::select(
          DB::raw("SUM(CASE WHEN ip_address = '$userIp' THEN 0.65 SELECT device ELSE 0.45 END)")
   );

   print_r($new->first());

});
