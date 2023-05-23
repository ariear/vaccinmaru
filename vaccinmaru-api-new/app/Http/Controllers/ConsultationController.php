<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Consultation;
use App\Models\Society;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConsultationController extends Controller
{
    public function store(Request $request) {
        if (!$request->token) {
            return response()->json([
                'message' => 'Token Not Found'
            ], 404);
        }

        $validation = Validator::make($request->all(), [
            'disease_history' => 'required',
            'current_symptoms' => 'required'
        ]);

        if ($validation->fails()) {
            return response()->json($validation->errors(), 422);
        }

        $society = Society::firstWhere('login_tokens', $request->token);
        if (!$society) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $consultation = Consultation::firstWhere('society_id', $society->id);
        if (!$consultation) {
            Consultation::create([
                'society_id' => $society->id,
                'status' => 'pending',
                'disease_history' => $request->disease_history,
                'current_symptoms' => $request->current_symptoms
            ]);

            return response()->json([
                'message' => 'Request consultation sent successful'
            ], 200);
        }else {
            return response()->json([
                'message' => 'The Request consultation only can one sent'
            ], 422);
        }
    }

    public function index(Request $request) {
        $token = Society::firstWhere('login_tokens', $request->token);

        if ($token) {
            $consultation = Consultation::where('society_id', $token->id)->first();
            
            if ($consultation == null) {
                return response()->json([
                    'message' => 'You havent consultation request'
                ], 422);
            }

            return response()->json([
                'consultation' => [
                    'id' =>  $consultation->id,
                    'status' => $consultation->status,
                    'disease_history' => $consultation->disease_history,
                    'current_symptoms' => $consultation->current_symptoms,
                    'doctor_notes' => $consultation->doctor_notes,
                    'doctor' => $consultation->medical
                ]
            ], 200);
        }

        return response()->json([
            'message' => 'Unauthorizated user'
        ], 401);
    }
}
