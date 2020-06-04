<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDataHoursTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_hours', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('time');
            $table->float('lev');
            $table->float('hs');
            $table->float('hx');
            $table->float('tp');
            $table->float('tm01');
            $table->float('tm02');
            $table->integer('dp');
            $table->integer('dpm');
            $table->float('hs_sw1');
            $table->float('hs_sw8');
            $table->float('tp_sw1');
            $table->float('tp_sw8');
            $table->integer('dpm_sw8');
            $table->integer('dpm_sw1');
            $table->float('hs_sea8');
            $table->float('hs_sea');
            $table->float('tp_sea8');
            $table->float('tp_sea');
            $table->float('tm_sea');
            $table->integer('dpm_sea8');
            $table->integer('dpm_sea');
            $table->float('hs_ig');
            $table->float('hs_fig');
            $table->integer('wsp');
            $table->integer('gst');
            $table->integer('wd');
            $table->integer('wsp100');
            $table->integer('wsp50');
            $table->integer('wsp80');
            $table->float('precip');
            $table->float('tmp');
            $table->float('rh');
            $table->float('vis');
            $table->integer('cld');
            $table->integer('cb');
            $table->float('csp0');
            $table->integer('cd0');
            $table->float('ss');
            $table->float('sst');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('data_hours');
    }
}
