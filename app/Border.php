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
    ];
    //タイムスタンプ無効化
    public $timestamps = false;
    
    public function setBorder (int $genre, int $not_isekai)
    //$not_isekaiをbool型にするとURLに文字列として入れる時に弊害あり。
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
        $global_point = 0;
        $favorite_count = 0;
        $reviewer_count = 0;
        $average_rate = 0.000;
        $comment_count = 0;
        $length = 0;
        //average_rate計算用
        $all_point = 0;
        
        
        foreach($raw_decode_data as $data) {
            $global_point += $data["global_point"];
            $favorite_count += $data["fav_novel_cnt"];
            $reviewer_count += $data["all_hyoka_cnt"];
            //小数第三位まで取得
            /*この方法だと評価者が一人もいない作品が上位に一つでもあれば、分母が0でエラーが起こる。
            $average_rate += round($data["all_point"] / $data["all_hyoka_cnt"], 3);
            */
            //評価ポイントのみを加算して後で全体の評価者数で割る。
            $all_point += $data["all_point"];
            $comment_count += $data["impression_cnt"];
            $length += $data["length"];
        }
        //平均評価点の計算。reviewer_countの計算より前に置く。
        $average_rate = round($all_point / $reviewer_count, 2);
        // global_pointの計算より前に置く。
        $length_per_point = round($length / $global_point, 3);
        //int型にキャスト
        $global_point = intdiv($global_point, $count);
        $favorite_count = intdiv($favorite_count, $count);
        $reviewer_count = intdiv($reviewer_count, $count);
        $comment_count = intdiv($comment_count, $count);
        
        // debug
        //var_dump($raw_decode_data);
        //var_dump($raw_decode_data[1]["global_point"]);
        var_dump($global_point);
        var_dump($favorite_count);
        var_dump($reviewer_count);
        var_dump($average_rate);
        var_dump($comment_count);
        
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
        
        $border -> save();
    }
    
    public function dropBorder()
    {
        //bordersテーブルの全レコードを削除
        Border::query() ->  delete();
    }
}
