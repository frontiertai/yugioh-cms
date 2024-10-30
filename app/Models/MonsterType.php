<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonsterType extends Model
{
    use HasFactory;


    protected $table="monster_types";

    public $guarded=["id",'value','created_at'];

    
}
