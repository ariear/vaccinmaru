<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Medical;

class Consultation extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $guarded = [];

    public function doctor () {
        return $this->belongsTo(Medical::class);
    }
}
