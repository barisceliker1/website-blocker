<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Redirect extends Model
{
    use HasFactory;
    protected $fillable=[
        'redirect_to',
        'display_url',
        'device_information_id',
        'ip_address','device',
        'operating_system',
        'internet_service_provider',
        'did_mount_at',
        'did_unmount_at',
        'browser',
        'browser_version'];

}
