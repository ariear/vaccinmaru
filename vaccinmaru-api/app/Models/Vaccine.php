<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SpotVaccine;

class Vaccine extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $guarded = [];

    public function spot_vaccines () {
        return $this->hasMany(SpotVaccine::class);
    }
}
