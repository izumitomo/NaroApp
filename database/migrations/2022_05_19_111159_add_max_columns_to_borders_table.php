<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMaxColumnsToBordersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('borders', function (Blueprint $table) {
            $table -> integer("max_global_point");
            $table -> integer("max_favorite_count");
            $table -> integer("max_reviewer_count");
            $table -> float("max_average_rate", 4, 2);
            $table -> integer("max_comment_count");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('borders', function (Blueprint $table) {
            //
        });
    }
}
