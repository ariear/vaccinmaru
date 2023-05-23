<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Society;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function store (Request $request) {
        $validation = Validator::make($request->all(), [
            'id_card_number' => 'required',
            'password' => 'required'
        ]);

        if ($validation->fails()) {
            return response()->json($validation->errors(), 422);
        }

        $society = Society::where('id_card_number', $request->id_card_number)->where('password', $request->password)->first();

        if ($society) {
            $token = md5($society->id_card_number);

            $society->update([
                'login_tokens' => $token
            ]);

            return response()->json([
                'id' => $society->id,
                'name' => $society->name,
                'born_date' => $society->born_date,
                'gender' => $society->gender,
                'address' => $society->address,
                'token' => $token,
                'regional' => $society->regional
            ], 200);
        }

        return response()->json([
            'message' => 'ID Card Number or Password incorrect'
        ], 401);
    }

    public function logout (Request $request) {
        if ($request->token) {
            $society = Society::firstWhere('login_tokens', $request->token);

            if ($society) {
                return response()->json([
                    'message' => 'Logout Success'
                ], 200);
            }
        }

        return response()->json([
            'message' => 'Invalid token'
        ], 401);
    }
}
