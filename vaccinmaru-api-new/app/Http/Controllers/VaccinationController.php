<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Consultation;
use App\Models\Society;
use App\Models\Vaccination;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VaccinationController extends Controller
{
    public function store (Request $request) {
        if (!$request->token) {
            return response()->json([
                'message' => 'Token Not Found'
            ], 404);
        }

        $society = Society::firstWhere('login_tokens', $request->token);
        if (!$society) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $consultation = Consultation::firstWhere('society_id', $society->id);

        if ($consultation == null || $consultation->status == 'pending') {
            return response()->json([
                'message' => 'Your consultation must be accepted by doctor before'
            ], 401);
        }

        $validation = Validator::make($request->all(), [
            'spot_id' => 'required',
            'date' => 'required|date_format:Y-m-d'
        ]);

        if ($validation->fails()) return response()->json($validation->errors(), 401);

        $vaccinations = Vaccination::where('society_id', $society->id)->get();

        if (count($vaccinations) == 0) {
            Vaccination::create([
                'dose' => 1,
                'date' => $request->date,
                'society_id' => $society->id,
                'spot_id' => $request->spot_id
            ]);

            return response()->json([
                'message' => 'First vaccination registered successful'
            ], 200);
        }
        if (count($vaccinations) == 1) {
            $daysDiff = Carbon::parse($vaccinations[0]->date)->diffInDays(Carbon::now());

            if ($daysDiff < 30) {
                return response()->json([
                    'message' => 'Wait at least +30 days from 1st Vaccination'
                ], 401);
            }

            Vaccination::create([
                'dose' => 2,
                'date' => $request->date,
                'society_id' => $society->id,
                'spot_id' => $request->spot_id
            ]);

            return response()->json([
                'message' => 'Second vaccination registered successful'
            ], 200);
        }
        if (count($vaccinations) == 2) {
            return response()->json([
                'message' => 'Society has been 2x vaccinated'
            ], 401);
        }
    }

    public function index (Request $request) {
        if (!$request->token) {
            return response()->json([
                'message' => 'Token Not Found'
            ], 404);
        }

        $society = Society::firstWhere('login_tokens', $request->token);
        if (!$society) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $vaccinations = Vaccination::where('society_id', $society->id)->get();

        if (count($vaccinations) == 0) {
            return response()->json([
                'message' => 'You havent any vaccination'
            ], 404);
        }

        if (count($vaccinations) == 1) {
            return response()->json([
                'first' => [
                    'queue' => 1,
                    'dose' => $vaccinations[0]->dose,
                    'vaccination_date' => $vaccinations[0]->date,
                    'spot' => [
                        'id' => $vaccinations[0]->spot->id,
                        'name' => $vaccinations[0]->spot->name,
                        'address' => $vaccinations[0]->spot->address,
                        'serve' => $vaccinations[0]->spot->serve,
                        'capacity' => $vaccinations[0]->spot->capacity,
                        'regional' => [
                            'id' => $vaccinations[0]->spot->regional->id,
                            'province' => $vaccinations[0]->spot->regional->province,
                            'district' => $vaccinations[0]->spot->regional->district,
                        ],
                        'status' => 'done'
                    ],
                    'vaccine' => [
                        'id' => $vaccinations[0]->vaccine->id ?? null,
                        'name' => $vaccinations[0]->vaccine->name ?? null
                    ],
                    'vaccinator' => [
                        'id' => $vaccinations[0]->medical->id ?? null,
                        'role' => $vaccinations[0]->medical->role ?? null,
                        'name' => $vaccinations[0]->medical->name ?? null
                    ]
                ],
                'second' => null
            ], 200);
        }

        if (count($vaccinations) == 2) {
            return response()->json([
                'first' => [
                    'queue' => 1,
                    'dose' => $vaccinations[0]->dose,
                    'vaccination_date' => $vaccinations[0]->date,
                    'spot' => [
                        'id' => $vaccinations[0]->spot->id,
                        'name' => $vaccinations[0]->spot->name,
                        'address' => $vaccinations[0]->spot->address,
                        'serve' => $vaccinations[0]->spot->serve,
                        'capacity' => $vaccinations[0]->spot->capacity,
                        'regional' => [
                            'id' => $vaccinations[0]->spot->regional->id,
                            'province' => $vaccinations[0]->spot->regional->province,
                            'district' => $vaccinations[0]->spot->regional->district,
                        ],
                        'status' => 'done'
                    ],
                    'vaccine' => [
                        'id' => $vaccinations[0]->vaccine->id ?? null,
                        'name' => $vaccinations[0]->vaccine->name ?? null
                    ],
                    'vaccinator' => [
                        'id' => $vaccinations[0]->medical->id ?? null,
                        'role' => $vaccinations[0]->medical->role ?? null,
                        'name' => $vaccinations[0]->medical->name ?? null
                    ]
                ],
                'second' => [
                    'queue' => 2,
                    'dose' => $vaccinations[1]->dose,
                    'vaccination_date' => $vaccinations[1]->date,
                    'spot' => [
                        'id' => $vaccinations[1]->spot->id,
                        'name' => $vaccinations[1]->spot->name,
                        'address' => $vaccinations[1]->spot->address,
                        'serve' => $vaccinations[1]->spot->serve,
                        'capacity' => $vaccinations[1]->spot->capacity,
                        'regional' => [
                            'id' => $vaccinations[1]->spot->regional->id,
                            'province' => $vaccinations[1]->spot->regional->province,
                            'district' => $vaccinations[1]->spot->regional->district,
                        ],
                        'status' => 'done'
                    ],
                    'vaccine' => [
                        'id' => $vaccinations[1]->vaccine->id ?? null,
                        'name' => $vaccinations[1]->vaccine->name ?? null
                    ],
                    'vaccinator' => [
                        'id' => $vaccinations[1]->medical->id ?? null,
                        'role' => $vaccinations[1]->medical->role ?? null,
                        'name' => $vaccinations[1]->medical->name ?? null
                    ]
                ]
            ], 200);
        }
    }
}
