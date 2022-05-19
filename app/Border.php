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
        "length_per_point",
        "max_global_point",
        "max_favorite_count",
        "max_reviewer_count",
        "max_average_rate",
        "max_comment_count",
    ];
    //タイムスタンプ無効化
    public $timestamps = false;
    
    public function setBorder (int $genre, int $not_isekai)
    //$not_isekaiをbool型にするとURLに文字列として入れる時に弊害あり。not系パラメータは1かどうかしか見ていないが便宜上0を入れておく。
    {
        $url= 'https://api.syosetu.com/novelapi/api/?lim=100&genre=' . $genre . '&nottensei=' . $not_isekai . '&nottenni=' . $not_isekai . '&order=weekly&out=json';
        var_dump($url);
        // ストリームコンテキストのオプションを作成
        $options = array(
            // HTTPコンテキストオプションをセット
            'http' => array(
                'method' => 'GET',
                'header' => 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
                            //'Content-type: application/json; charset=UTF-8' //JSON形式で表示
            )
        );
            
        // ストリームコンテキストの作成
        $context = stream_context_create($options);
        
        $raw_data = file_get_contents($url, false,$context);
        $raw_decode_data = json_decode($raw_data, true);
        //先頭のallcountを削除してforeachを使えるようにする
        $allcount = array_shift($raw_decode_data);
        //APIで返ってくるデータ数が100件未満の場合のために要素数をカウント。
        $count = count($raw_decode_data);
        $rate_count = $count;
        $global_point = 0;
        $max_global_point = 0;
        $favorite_count = 0;
        $max_favorite_count = 0;
        $reviewer_count = 0;
        $max_reviewer_count = 0;
        $average_rate = 0.000;
        $max_average_rate = 0.000;
        $comment_count = 0;
        $max_comment_count = 0;
        $length = 0;
        
        foreach($raw_decode_data as $data) {
            if ($max_global_point < $data["global_point"]) {
                $max_global_point = $data["global_point"];
            }
            if ($max_favorite_count < $data["fav_novel_cnt"]) {
                $max_favorite_count = $data["fav_novel_cnt"];
            }
            if ($max_reviewer_count < $data["all_hyoka_cnt"]) {
                $max_reviewer_count = $data["all_hyoka_cnt"];
            }
            //100人未満の評価人数の場合、平均計算に含めない。
            if ($data["all_hyoka_cnt"] > 99) {
                //小数第三位まで取得
                $temp = round($data["all_point"] / $data["all_hyoka_cnt"], 3);
                $average_rate += $temp;
                if ($max_average_rate < $temp) {
                    $max_average_rate = $temp;
                }
            }else{
                $rate_count--;
            }
            if ($max_comment_count < $data["impression_cnt"]) {
                $max_comment_count = $data["impression_cnt"];
            }
            $global_point += $data["global_point"];
            $favorite_count += $data["fav_novel_cnt"];
            $reviewer_count += $data["all_hyoka_cnt"];
            /*この方法だと評価者が一人もいない作品が上位に一つでもあれば、分母が0でエラーが起こる。
            average_rate += round($data["all_point"] / $data["all_hyoka_cnt"], 3);
            */
            $comment_count += $data["impression_cnt"];
            $length += $data["length"];
        }
        // global_pointの計算より前に置く。厳密な平均ではない。
        $length_per_point = round($length / $global_point, 3);
        //int型にキャスト
        $global_point = intdiv($global_point, $count);
        $favorite_count = intdiv($favorite_count, $count);
        $reviewer_count = intdiv($reviewer_count, $count);
        //評価者が100人未満のジャンルは平均点を0とする（本当はNULLにしたいけどDBへんこうがだるい）
        if($rate_count != 0) {
            $average_rate = round($average_rate / $rate_count, 2);
        }else{
            $average_rate = 0;
        }
        $comment_count = intdiv($comment_count, $count);
        
        // debug
        //var_dump($raw_decode_data);
        //var_dump($raw_decode_data[1]["global_point"]);
        var_dump($global_point);
        var_dump($favorite_count);
        var_dump($reviewer_count);
        var_dump($average_rate);
        var_dump($comment_count);
        var_dump($length_per_point);
        var_dump($max_global_point);
        var_dump($max_favorite_count);
        var_dump($max_reviewer_count);
        var_dump($max_average_rate);
        var_dump($max_comment_count);
        
        //得られた値をDBに格納
        $border = new Border();
        
        $border -> genre = $genre;
        $border -> tensei_or_tenni = !($not_isekai);
        $border ->global_point = $global_point;
        $border -> favorite_count = $favorite_count;
        $border -> reviewer_count = $reviewer_count;
        $border -> average_rate = $average_rate;
        $border -> comment_count = $comment_count;
        $border -> length_per_point = $length_per_point;
        $border -> max_global_point = $max_global_point;
        $border -> max_favorite_count = $max_favorite_count;
        $border -> max_reviewer_count = $max_reviewer_count;
        $border -> max_average_rate = $max_average_rate;
        $border -> max_comment_count = $max_comment_count;
        
        $border -> save();
    }
    
    public function dropBorder()
    {
        //bordersテーブルの全レコードを削除
        Border::query() ->  delete();
    }
}
