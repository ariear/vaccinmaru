<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SpotVaccine;
use App\Models\Vaccination;
use App\Models\Regional;

class Spot extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $guarded = [];

    public function spot_vaccine () {
        return $this->hasMany(SpotVaccine::class);
    }

    public function vaccinations () {
        return $this->hasMany(Vaccination::class);
    }

    public function regional () {
        return $this->belongsTo(Regional::class);
    }
}
