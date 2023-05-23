<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Spot;
use App\Models\Society;
use App\Models\Vaccine;
use App\Models\Vaccination;
use App\Models\SpotVaccine;
use Carbon\Carbon;

class SpotController extends Controller
{
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

        $spots = Spot::where('regional_id', $society->regional_id)->get();
        $vaccines = Vaccine::all();
        $spotResults = [];

        foreach ($spots as $key => $spot) {
            $vaccineResults = [];

            foreach ($vaccines as $key => $vaccine) {
                $vaccineCondition = SpotVaccine::where('spot_id', $spot->id)->where('vaccine_id', $vaccine->id)->exists();

                $vaccineResults[] = $vaccineCondition;
            }

            $spotResults[] = [
                'id' => $spot->id,
                'name' => $spot->name,
                'address' => $spot->address,
                'serve' => $spot->serve,
                'capacity' => $spot->capacity,
                'available_vaccines' => $vaccineResults
            ];
        }

        return response()->json([
            'spots' => $spotResults
        ], 200);
    }

    public function detail (Request $request, $spot_id) {
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

        $date = Carbon::now();
        if ($request->date) $date = Carbon::parse($request->date);

        $spot = Spot::find($spot_id);
        $vaccination = Vaccination::where('date', $date)->where('spot_id', $spot->id)->get();

        return response()->json([
            'date' => $date->format('M D, Y'),
            'spot' => [
                'id' => $spot->id,
                'name' => $spot->name,
                'address' => $spot->address,
                'serve' => $spot->serve,
                'capacity' => $spot->capacity,
            ],
            'vaccination_count' => count($vaccination)
        ], 200);
    }
}
