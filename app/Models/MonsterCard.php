<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonsterCard extends Model
{
    use HasFactory;

    protected $table = "monster_cards";

    public $guarded = ['id', 'created_at','card_type_id'];

    protected $fillable = [
        
        'name',
        'attack',
        'defense',
        'monster_attribute_id',
        'level',
        'monster_type_id',
        'img_path',
        'effectText',
        'updated_at',
        'deleted_at',
    ];
}
