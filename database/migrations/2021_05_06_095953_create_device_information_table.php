<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeviceInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('device_information', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('display_url');
            $table->string('ip_address');
            $table->string('device');
            $table->string('operating_system');
            $table->string('browser');
            $table->string('browser_version');
            $table->string('productSub')->nullable();
            $table->string('internet_service_provider');
            $table->string('token');
            $table->integer('deviceMemory')->default(2);
            $table->string('language')->nullable();
            $table->enum('cookieEnabled', ['true', 'false'])->default('true');
            $table->date('did_mount_at');
            $table->date('did_unmount_at');
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
        Schema::dropIfExists('device_information');
    }
}
