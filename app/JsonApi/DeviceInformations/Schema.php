<?php

namespace App\JsonApi\DeviceInformations;

use App\JsonApi\Base\SchemaProvider;
use App\Models\DeviceInformation;
class Schema extends SchemaProvider
{

    /**
     * @var string
     */
    protected $resourceType = 'deviceinformations';

    /**
     * @param \App\Models\DeviceInformation $resource
     *      the domain record being serialized.
     * @return string
     */
    public function getId($resource)
    {
        return (string) $resource->getRouteKey();
    }

    /**
     * @param \App\Models\DeviceInformation $resource
     *      the domain record being serialized.
     * @return array
     */
    public function getAttributes($resource)
    {
        return [
            'createdAt' => $resource->created_at,
            'updatedAt' => $resource->updated_at,
            'display_url'=>$resource->display_url,
            'ip_address'=>$resource->ip_address,
            'device'=>$resource->device,
            'operating_system'=>$resource->operating_system,
            'productsub'=>$resource->productsub,
            'useractivation'=>$resource->useractivation,
            'useragent'=>$resource->useragent,
            'productname'=>$resource->productname,
            'internet_service_provider'=>$resource->internet_service_provider,
            'did_mount_at'=>$resource->did_mount_at,
            'did_unmount_at'=>$resource->did_unmount_at,
            'internetconnection'=>$resource->internetconnection,
            'fontoken'=>$resource->fontoken,
            'internetperformance'=>$resource->internetperformance,
            'browser'=>$resource->browser,
            'token'=>$resource->token,
            'displaycard'=>$resource->displaycard,
            'cookieEnabled'=>$resource->cookieEnabled,
            'devicememory'=>$resource->devicememory,
            'browser_version'=>$resource->browser_version
        ];
    }
}
