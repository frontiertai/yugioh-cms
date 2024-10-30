<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrapType extends Model
{
    use HasFactory;

    protected $table='trap_types';

    protected $guaranded=['id','value','created_at'];
}
