<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MagicCard extends Model
{
    use HasFactory;

    protected $table="magic_cards";

    public $guarded = ['id', 'created_at','card_type_id'];

    protected $fillable=[
        'card_type_id',
        'name',
        'magic_type_id',
        'img_path',
        'effectText',
        'updated_at',
        'deleted_at',
    ];


}
