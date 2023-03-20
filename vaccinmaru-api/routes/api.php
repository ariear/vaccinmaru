<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\VaccinationController;
use App\Models\Society;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('/v1/society', function (Request $request) {
    if ($request->token) {
        $society = Society::firstWhere('login_tokens', $request->token);

        if ($society !== null) {
            return response()->json([
                'data' => $society
            ], 200);
        }
    }

    return response()->json([
        'message' => 'Unauthorized user'
    ], 401);
});

Route::post('/v1/auth/login', [AuthController::class,'login']);
Route::post('/v1/auth/logout', [AuthController::class,'logout']);

Route::post('/v1/consultations', [ConsultationController::class,'store']);
Route::get('/v1/consultations', [ConsultationController::class,'index']);

Route::get('/v1/spots', [VaccinationController::class,'get_all']);
Route::get('/v1/spots/{spot_id}', [VaccinationController::class,'get_spot_detail']);

Route::post('/v1/vaccinations', [VaccinationController::class,'register_vaccination']);
Route::get('/v1/vaccinations', [VaccinationController::class,'get_all_society_vaccinations']);
