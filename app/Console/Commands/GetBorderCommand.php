<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Border;

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
        $border = new Border();
        $border -> dropBorder();
        $border -> setBorder(101, 1);
        $border -> setBorder(101, 0);
        $border -> setBorder(102, 1);
        $border -> setBorder(102, 0);
        $border -> setBorder(201, 1);
        $border -> setBorder(201, 0);
        $border -> setBorder(202, 1);
        $border -> setBorder(202, 0);
        $border -> setBorder(301, 1);
        $border -> setBorder(301, 0);
        $border -> setBorder(302, 1);
        $border -> setBorder(302, 0);
        $border -> setBorder(303, 1);
        $border -> setBorder(303, 0);
        $border -> setBorder(304, 1);
        $border -> setBorder(304, 0);
        $border -> setBorder(305, 1);
        $border -> setBorder(305, 0);
        $border -> setBorder(306, 1);
        $border -> setBorder(306, 0);
        $border -> setBorder(307, 1);
        $border -> setBorder(307, 0);
        $border -> setBorder(401, 1);
        $border -> setBorder(401, 0);
        $border -> setBorder(402, 1);
        $border -> setBorder(402, 0);
        $border -> setBorder(403, 1);
        $border -> setBorder(403, 0);
        $border -> setBorder(404, 1);
        $border -> setBorder(404, 0);
        $border -> setBorder(9901, 1);
        $border -> setBorder(9901, 0);
        $border -> setBorder(9902, 1);
        $border -> setBorder(9902, 0);
        $border -> setBorder(9903, 1);
        $border -> setBorder(9903, 0);
        $border -> setBorder(9904, 1);
        $border -> setBorder(9904, 0);
        $border -> setBorder(9999, 1);
        $border -> setBorder(9999, 0);
        $border -> setBorder(9801, 1);
        $border -> setBorder(9801, 0);
    }
}
