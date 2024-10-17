<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrapCard extends Model
{
    use HasFactory;

    protected $table="trap_cards";

    public $guarded = ['id', 'created_at','card_type_id'];

    protected $fillable=[
        'name',
        'trap_type_id',
        'img_path',
        'effectText',
        'updated_at',
        'deleted_at',
    ];

}
