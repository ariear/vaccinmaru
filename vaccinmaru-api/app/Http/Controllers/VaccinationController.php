<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Models\Society;
use App\Models\Spot;
use App\Models\SpotVaccine;
use App\Models\Vaccination;
use App\Models\Vaccine;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VaccinationController extends Controller
{
    public function get_all (Request $request) {
        if ($request->token) {
            $society = Society::firstWhere('login_tokens', $request->token);

            if ($society !== null) {
                $spots = Spot::where('regional_id', $society->regional_id)->get();

                $vaccines = Vaccine::all();
                $spotResult = array();

                foreach ($spots as $key => $spot) {
                    $vaccineResult = array();
                    $vaccineAll = array();

                    foreach ($vaccines as $key => $result) {
                        $spot_vaccines = SpotVaccine::where('spot_id', $spot->id)->where('vaccine_id', $result->id)->get();

                        foreach ($spot_vaccines as $key => $spot_vaccine) {
                            $vaccineResult[$result->name] = true;
                        }

                        $vaccineAll[$result->name] = false;
                    }

                    $replaceArray = array_replace($vaccineAll, $vaccineResult);

                    $spotResult[] = [
                        'id' => $spot->id,
                        'name' => $spot->name,
                        'address' => $spot->address,
                        'serve' => $spot->serve,
                        'capacity' => $spot->capacity,
                        'available_vaccines' => $replaceArray
                    ];
                }

                return response()->json([
                    'spots' => $spotResult
                ], 200);
            }
        }

        return response([
            'message' => 'Unauthorized user'
        ], 401);
    }

    public function get_spot_detail (Request $request, $spot_id) {
        if ($request->token) {
            $society = Society::firstWhere('login_tokens', $request->token);

            if ($society !== null) {
                $date = Carbon::today();

                if ($request->date) {
                    $date = $request->date;
                }

                $spot = Spot::firstWhere('id', $spot_id);

                $vaccination = Vaccination::whereDate('date', $date)->where('spot_id', $spot_id)->get()->count();

                if ($spot == null) {
                    return response()->json(['message' => 'Spot not found'], 404);
                }

                return response()->json([
                    'date' => Carbon::parse($date)->format('F d, Y'),
                    'spot' => [
                        'id' => $spot->id,
                        'name' => $spot->name,
                        'address' => $spot->address,
                        'serve' => $spot->serve,
                        'capacity' => $spot->capacity
                    ],
                    'vaccinations_count' => $vaccination
                ], 200);
            }
        }

        return response()->json([
            'message' => 'Unauthorized user'
        ], 401);
    }

    public function get_all_society_vaccinations (Request $request) {
        if ($request->token) {
            $society = Society::firstWhere('login_tokens', $request->token);

            if ($society !== null) {
                $vaccination = Vaccination::where('society_id', $society->id)->get();

                if ($vaccination->count() == 0) {
                    return response()->json([
                        'message' => 'you havent been vaccinated at all'
                    ], 422);
                }

                if ($vaccination->count() == 1) {
                    return response()->json([
                        'vaccinations' => [
                            'first' => [
                                'queue' => 1,
                                'dose' => $vaccination[0]->dose,
                                'vaccination_date' => $vaccination[0]->date,
                                'spot' => [
                                    'id' => $vaccination[0]->spot->id,
                                    'name' => $vaccination[0]->spot->name,
                                    'address' => $vaccination[0]->spot->address,
                                    'serve' => $vaccination[0]->spot->serve,
                                    'capacity' => $vaccination[0]->spot->capacity,
                                    'regional' => $vaccination[0]->spot->regional
                                ],
                                'status' => 'done',
                                'vaccine' => $vaccination[0]->vaccine,
                                'vaccinator' => [
                                    'id' => $vaccination[0]->medical->id ?? null,
                                    'role' => $vaccination[0]->medical->role ?? null,
                                    'name' => $vaccination[0]->medical->name ?? null
                                ]
                            ],
                            'second' => null,
                        ]
                    ], 200);
                }

                return response()->json([
                    'vaccinations' => [
                        'first' => [
                            'queue' => 1,
                            'dose' => $vaccination[0]->dose,
                            'vaccination_date' => $vaccination[0]->date,
                            'spot' => [
                                'id' => $vaccination[0]->spot->id,
                                'name' => $vaccination[0]->spot->name,
                                'address' => $vaccination[0]->spot->address,
                                'serve' => $vaccination[0]->spot->serve,
                                'capacity' => $vaccination[0]->spot->capacity,
                                'regional' => $vaccination[0]->spot->regional
                            ],
                            'status' => 'done',
                            'vaccine' => $vaccination[0]->vaccine,
                            'vaccinator' => [
                                'id' => $vaccination[0]->medical->id ?? null,
                                'role' => $vaccination[0]->medical->role ?? null,
                                'name' => $vaccination[0]->medical->name ?? null
                            ]
                        ],
                        'second' => [
                            'queue' => 2,
                            'dose' => $vaccination[1]->dose,
                            'vaccination_date' => $vaccination[1]->date,
                            'spot' => [
                                'id' => $vaccination[1]->spot->id,
                                'name' => $vaccination[1]->spot->name,
                                'address' => $vaccination[1]->spot->address,
                                'serve' => $vaccination[1]->spot->serve,
                                'capacity' => $vaccination[1]->spot->capacity,
                                'regional' => $vaccination[1]->spot->regional
                            ],
                            'status' => 'done',
                            'vaccine' => $vaccination[1]->vaccine,
                            'vaccinator' => [
                                'id' => $vaccination[1]->medical->id ?? null,
                                'role' => $vaccination[1]->medical->role ?? null,
                                'name' => $vaccination[1]->medical->name ?? null
                            ]
                        ],
                    ]
                ], 200);
            }

        }

        return response()->json([
            'message' => 'Unauthorized user'
        ], 401);
    }

    public function register_vaccination (Request $request) {
        if ($request->token) {
            $society = Society::firstWhere('login_tokens', $request->token);

            if ($society !== null) {
                $validasi = Validator::make($request->all(),[
                    'spot_id' => 'required',
                    'date' => 'required|date_format:Y-m-d'
                ]);

                if ($validasi->fails()) {
                    return response()->json([
                        'message' => 'Invalid field',
                        'errors' => $validasi->errors()
                    ], 401);
                }

                $vaccination = Vaccination::where('society_id', $society->id)->get();

                $consultation = Consultation::firstWhere('society_id', $society->id);
                if ($consultation == null || $consultation->status == 'pending') {
                    return response()->json([
                        'message' => 'Your consultation must be accepted by doctor before'
                    ], 401);
                }

                if ($vaccination->count() == 1) {
                    $daysDiff = Carbon::parse($vaccination[0]->date)->diffInDays(Carbon::now());

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

                if ($vaccination->count() == 2) {
                    return response()->json([
                        'message' => 'Society has been 2x vaccinated'
                    ], 401);
                }

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

        }

        return response()->json([
            'message' => 'Unauthorized user'
        ], 401);
    }

}
