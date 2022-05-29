<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Border;

class SearchController extends Controller
{
    public function call(Request $request)
    {
        //var_dump($request["genre"]);
        $genre = $request["genre"];
        $not_isekai = $request["notIsekai"] ;
        header("Access-Control-Allow-Origin: *");  //CORS
        
        $url= 'https://api.syosetu.com/novelapi/api/?lim=5&genre=' . $genre . '&nottensei=' . $not_isekai . '&nottenni=' . $not_isekai . '&order=weekly&out=json';
        // ストリームコンテキストのオプションを作成
        $options = array(
            // HTTPコンテキストオプションをセット
            'http' => array(
                'method' => 'GET',
                'header' => 'User-Agent: *',
                            //'Content-type: application/json; charset=UTF-8' //JSON形式で表示
            )
        );
            
        // ストリームコンテキストの作成
        $context = stream_context_create($options);
        $raw_data = file_get_contents($url, false,$context);
        $raw_decode_data = json_decode($raw_data, true);
        //先頭のallcountを削除してforeachを使えるようにする
        $allcount = array_shift($raw_decode_data);
        //var_dump($raw_decode_data);
        return $raw_decode_data ;
        /*return  response() -> json([
            "title" => $raw_decode_data["title"],
            "point" => $raw_decode_data["global_point"],
            "fav" => $raw_decode_data["fav_novel_cnt"],
            "reviewer" => $raw_decode_data["review_cnt"],
            "rate" => $raw_decode_data[""],
            
            
        ]);
        */
        //return Border::all() -> toJson();    
    }
}
