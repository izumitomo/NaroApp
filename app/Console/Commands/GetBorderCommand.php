<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class GetBorderCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'get:border';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'なろう小説APIを叩いて、その日の平均スコア（border）を算出してbordersテーブルに保存する';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $url= 'https://api.syosetu.com/novelapi/api/?lim=100&genre=307&order=weekly&out=json';
        
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
        
        $global_point = 0;
        $favorite_count = 0;
        $reviewer_count = 0;
        $average_rate = 0.000;
        $comment_count = 0;
        
        foreach($raw_decode_data as $data) {
            $global_point += $data["global_point"];
            $favorite_count += $data["fav_novel_cnt"];
            $reviewer_count += $data["all_hyoka_cnt"];
            //小数第三位まで取得
            $average_rate += round($data["all_point"] / $data["all_hyoka_cnt"], 3);
            $comment_count += $data["impression_cnt"];
        }
        //int型にキャスト
        $global_point = intdiv($global_point, 100);
        $favorite_count = intdiv($favorite_count, 100);
        $reviewer_count = intdiv($reviewer_count, 100);
        $average_rate = round($average_rate / 100, 2); 
        $comment_count = intdiv($comment_count, 100);
        // debug
        //var_dump($raw_decode_data);
        //var_dump($raw_decode_data[1]["global_point"]);
        var_dump($global_point);
        var_dump($favorite_count);
        var_dump($reviewer_count);
        var_dump($average_rate);
        var_dump($comment_count);
        
        //得られた値をDBに格納
        $dbh = new PDO("mysql:charset=UTF8;dbname=naro;host=localhost", "dbuser", "Areyouready7");
        if ($dbh == null){
            print('接続に失敗しました。<br>');
        }else{
            print('接続に成功しました。<br>');
        }
    }
}
