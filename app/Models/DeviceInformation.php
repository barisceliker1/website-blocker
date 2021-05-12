<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class DeviceInformation extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable=[
        'display_url',
        'ip_address',
        'device',
        'operating_system',
        'internet_service_provider',
        'did_mount_at',
        'did_unmount_at',
        'browser',
        'browser_version'];
    public function redirects(): HasOne
    {
        return $this->hasOne('App\Models\Redirect', 'device_information_id', 'id');
    }
}
