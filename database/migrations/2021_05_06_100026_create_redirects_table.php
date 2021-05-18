<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRedirectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('redirects', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('device_information_id');
            $table->string('redirect_to');
            $table->string('display_url');
            $table->string('ip_address');
            $table->string('device');
            $table->string('productSub');
            $table->string('browser');
            $table->string('internetconnection');
            $table->string('browser_version');
            $table->string('internet_service_provider');
            $table->string('operating_system');
            $table->string('did_mount_at');
            $table->string('did_unmount_at');
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
        Schema::dropIfExists('redirects');
    }
}
