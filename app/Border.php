<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Border extends Model
{
    protected $fillable = [
        "genre",
        "tensei_or_tenni",
        "global_point",
        "favorite_count",
        "reviewer_count",
        "comment_count",
    ];
    //タイムスタンプ無効化
    public $timestamps = false;
    
}
