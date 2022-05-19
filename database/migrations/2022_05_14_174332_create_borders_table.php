<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBordersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('borders', function (Blueprint $table) {
            $table->integer('genre');
            $table->boolean('tensei_or_tenni');
            $table->integer('global_point');
            $table->integer('favorite_count');
            $table->integer('reviewer_count');
            $table->float('average_rate', 4, 2);
            $table->integer('comment_count');
            //$table->float('length_per_point', 7, 3);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('borders');
    }
}
