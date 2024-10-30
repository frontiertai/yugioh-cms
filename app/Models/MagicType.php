<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MagicType extends Model
{
    use HasFactory;

    protected $table='magic_types';

    protected $guaranded=['id','value','created_at'];
}
