<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonsterAttribute extends Model
{
    use HasFactory;


    protected $table="monster_attributes";

    public $guaraded=['id','value','created_at'];
}
