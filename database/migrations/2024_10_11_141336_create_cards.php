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
        Schema::create('monster_cards',function(Blueprint $table){
            $table->id()->primary();
            $table->integer('card_type_id')->default(1);
            $table->string('name');
            $table->integer('attack');
            $table->integer('defense');
            $table->integer('monster_attribute_id');
            $table->integer('level');
            $table->integer('monster_type_id');
            $table->string('img_path');
            $table->string('effectText')->nullable(true);
            $table->timestamps();
            $table->softDeletes();

        });

        SChema::create('magic_cards',function(Blueprint $table){
            $table->id()->primary();
            $table->integer('card_type_id')->default(2);
            $table->string('name');
            $table->integer('magic_type_id');
            $table->string('img_path');
            $table->string('effectText')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('trap_cards',function(Blueprint $table){
            $table->id()->primary();
            $table->integer('card_type_id')->default(3);
            $table->string('name');
            $table->integer('trap_type_id');
            $table->string('img_path');
            $table->string('effectText')->nullable(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monster_cards');
        Schema::dropIfExists('magic_cards');
        Schema::dropIfExists('trap_cards');
    }
};
