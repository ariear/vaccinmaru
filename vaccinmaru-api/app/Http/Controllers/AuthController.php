<?php

namespace App\Http\Controllers;

use App\Models\Society;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login (Request $request) {
        $validasi = Validator::make($request->all(),[
            'id_card_number' => 'required',
            'password' => 'required'
        ]);

        if ($validasi->fails()) return response()->json($validasi->errors(), 422);

        $society = Society::firstWhere([
            'id_card_number' => $request->id_card_number,
            'password' => $request->password
        ]);

        if ($society !== null) {
            $token = md5($request->id_card_number);

            $society->update([
                'login_tokens' => $token
            ]);

            return response()->json([
                'name' => $society->name,
                'born_date' => $society->born_date,
                'gender' => $society->gender,
                'address' => $society->address,
                'token' => $token,
                'regional' => $society->regional
            ], 200);
        }

        return response()->json([
            "message" => "ID Card Number or Password incorrect"
        ], 401);
    }

    public function logout (Request $request) {
        $society = Society::firstWhere('login_tokens', $request->token);

        if ($society !== null) {
            $society->update([ 'login_tokens' => null ]);
            return response()->json([
                'message' => 'Logout success'
            ], 200);
        }

        return response()->json([
            'message' => 'Invalid token'
        ], 401);
    }
}
