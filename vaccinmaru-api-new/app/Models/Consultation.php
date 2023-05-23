<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $timestamps = false;
    
    public function medical () {
        return $this->belongsTo(Medical::class, 'doctor_id');
    }
}
