<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Models\Society;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConsultationController extends Controller
{
    public function index (Request $request) {
        if ($request->token) {
            $society = Society::firstWhere('login_tokens', $request->token);

            if ($society !== null) {
                $consultation = Consultation::firstWhere('society_id', $society->id);

                if ($consultation == null) {
                    return response()->json([
                        'message' => 'Consultation Not Found'
                    ], 404);
                }

                return response()->json([
                    'consultation' => [
                        'id' => $consultation->id,
                        'status' => $consultation->status,
                        'disease_history' => $consultation->disease_history,
                        'current_symptoms' => $consultation->current_symptoms,
                        'doctor_notes' => $consultation->doctor_notes,
                        'doctor' => $consultation->doctor
                    ]
                ], 200);
            }
        }

        return response()->json([
            'message' => 'Unauthorized user'
        ], 401);
    }

    public function store (Request $request) {
        if ($request->token) {
            $society = Society::firstWhere('login_tokens', $request->token);

            if ($society !== null) {
                $validasi = Validator::make($request->all(), [
                    'disease_history' => 'required',
                    'current_symptoms' => 'required'
                ]);

                if ($validasi->fails()) return response()->json($validasi->errors(), 422);

                if (count($society->consultations) > 0) {
                    return response()->json([
                        'message' => 'You can only make a consultation once'
                    ], 422);
                }

                Consultation::create([
                    'society_id' => $society->id,
                    'status' => 'pending',
                    'disease_history' => $request->disease_history,
                    'current_symptoms' => $request->current_symptoms
                ]);

                return response()->json([
                    'message' => 'Request consultation sent successful'
                ], 200);
            }
        }

        return response()->json([
            'message' => 'Unauthorized user'
        ], 401);
    }
}
