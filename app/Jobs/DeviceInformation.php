<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DeviceInformation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $display_url;
    protected $ip_address;
    protected $operating_system;
    protected $browsers;
    protected $browser_version;
    protected $internet_service_provider;
    protected $device;
    protected $did_mount_at;
    protected $did_unmount_at;
    protected $token;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($display_url, $ip_address, $browsers,$browser_version, $internet_service_provider,$operating_system,$device,$did_mount_at,$did_unmount_at,$token)
    {
        $this->display_url = $display_url;
        $this->ip_address = $ip_address;
        $this->operating_system = $operating_system;
        $this->browsers = $browsers;
        $this->browser_version = $browser_version;
        $this->internet_service_provider = $internet_service_provider;
        $this->device = $device;
        $this->did_mount_at = $did_mount_at;
        $this->did_unmount_at = $did_unmount_at;
        $this->token = $token;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        \App\Models\DeviceInformation::create([
            "display_url" => $this->display_url,
            "token" => $this->token,
            "ip_address" => $this->ip_address,
            "device" => $this->device,
            "browser" => $this->browsers,
            "browser_version" => $this->browser_version,
            "internet_service_provider" => $this->internet_service_provider,
            "operating_system" => $this->operating_system,
            "did_mount_at" => $this->did_mount_at,
            "did_unmount_at" => $this->did_unmount_at,
        ]);
    }
}
