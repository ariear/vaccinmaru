<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Regional;
use App\Models\Consultation;

class Society extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $timestamps = false;

    public function regional () {
        return $this->belongsTo(Regional::class);
    }

    public function consultations () {
        return $this->hasMany(Consultation::class);
    }
}
