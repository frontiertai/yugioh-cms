<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class initMaster extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('card_types')->insert([
            [
                'value'=>'monster'
            ],
            [
                'value'=>'magic'
            ],
            [
                'value'=>'trap'
            ],


        ]
    );
        DB::table('monster_attributes')->insert([
            ['value' => '獣戦士族'],
            ['value' => '海竜族'],
            ['value' => '岩石族'],
            ['value' => '植物族'],
            ['value' => 'サイバース族'],
            ['value' => '幻竜族'],
            ['value' => '幻神獣族'],
            ['value' => '創造神族'],
            ['value' => 'アンデット族'],
            ['value' => '恐竜族'],
            ['value' => '爬虫類族'],
            ['value' => '魚族'],
            ['value' => '天使族'],
            ['value' => '悪魔族'],
            ['value' => 'サイキック族'],
            ['value' => 'ドラゴン族'],
            ['value' => '魔法使い族'],
            ['value' => '戦士族'],
            ['value' => '鳥獣族'],
            ['value' => '炎族'],
            ['value' => '獣族'],
            ['value' => '機械族'],
            ['value' => '昆虫族'],
            ['value' => '雷族'],
            ['value' => '水族'],
            ['value' => '幻想魔族']
        ]
    );
        DB::table('monster_types')->insert([
            ['value' => '闇'],
            ['value' => '光'],
            ['value' => '地'],
            ['value' => '水'],
            ['value' => '炎'],
            ['value' => '風'],
            ['value' => '神']
        ]
    );
        DB::table('magic_types')->insert([
            ['value' => '通常魔法'],
            ['value' => '儀式魔法'],
            ['value' => '永続魔法'],
            ['value' => '装備魔法'],
            ['value' => 'フィールド魔法'],
            ['value' => '速攻魔法']
            
        ]
    );
        DB::table('trap_types')->insert([
            ['value' => '通常罠カード'],
            ['value' => '永続罠カード'],
            ['value' => 'カウンター罠カード']
            
        ]
    );
        
        
    }
}
