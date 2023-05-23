<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\SpotController;
use App\Http\Controllers\VaccinationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/v1/auth/login', [AuthController::class,'store']);
Route::post('/v1/auth/logout', [AuthController::class,'logout']);

Route::post('/v1/consultations', [ConsultationController::class,'store']);
Route::get('/v1/consultations', [ConsultationController::class, 'index']);

Route::get('/v1/spots', [SpotController::class, 'index']);
Route::get('/v1/spots/{spot_id}', [SpotController::class, 'detail']);

Route::post('/v1/vaccinations', [VaccinationController::class, 'store']);
Route::get('/v1/vaccinations', [VaccinationController::class, 'index']);