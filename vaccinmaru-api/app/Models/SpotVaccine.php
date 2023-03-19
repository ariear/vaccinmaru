<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Vaccine;
use App\Models\Spot;

class SpotVaccine extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $guarded = [];

    public function spot () {
        return $this->belongsTo(Spot::class);
    }
    public function vaccine () {
        return $this->belongsTo(Vaccine::class);
    }
}
