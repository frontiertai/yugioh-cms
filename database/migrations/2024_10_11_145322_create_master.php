<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('card_types',function(Blueprint $table){
            $table->id()->primary();
            $table->string("value")->comment('カードタイプ値');
            $table->timestamps();
            $table->softDeletes();

        });

        Schema::create('monster_attributes',function(Blueprint $table){
            $table->id()->primary();
            $table->string("value")->comment('属性値');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('monster_types',function(Blueprint $table){
            $table->id()->primary();
            $table->string("value")->comment('種族値');
            $table->timestamps();
            $table->softDeletes();

        });
        Schema::create('magic_types',function(Blueprint $table){
            $table->id()->primary();
            $table->string("value")->comment('魔法種類別値');
            $table->timestamps();
            $table->softDeletes();

        });
        Schema::create('trap_types',function(Blueprint $table){
            $table->id()->primary();
            $table->string("value")->comment('罠種別値');
            $table->timestamps();
            $table->softDeletes();

        });
        


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('card_types');
        Schema::dropIfExists('monster_attributes');
        Schema::dropIfExists('monster_types');
        Schema::dropIfExists('magic_types');
        Schema::dropIfExists('trap_types');

    }
};
