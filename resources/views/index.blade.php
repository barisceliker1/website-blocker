<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script rel="stylesheet" src="{{asset('js')}}/index.js"></script>
</head>
<body>
<input hidden value="{{$session}}" id="session">{{$session}}>
@if(Session::has('ip_address'))
    <input hidden id="ip_addresss" name="ip_address" value="{{ Session::get('ip_address') }}">{{ Session::get('ip_address') }}
@endif
@if(Session::has('device'))
    <input hidden id="devicee" name="device" value="{{ Session::get('device') }}">{{ Session::get('device') }}
@endif
@if(Session::has('display_url'))
    <input hidden id="display_urll" name="display_url" value="{{ Session::get('display_url') }}">{{ Session::get('display_url') }}
@endif
@if(Session::has('operating_system'))
    <input hidden id="operating_system" name="operating_system" value="{{ Session::get('operating_system') }}">{{ Session::get('operating_system') }}
@endif
@if(Session::has('internet_service_provider'))
    <input hidden id="internet_service_provider" name="internet_service_provider" value="{{ Session::get('internet_service_provider') }}">{{ Session::get('internet_service_provider') }}
@endif
<input hidden id="deviceInformationId">
<input hidden id="display_url">
<input hidden id="ip_address">
<input hidden id="device">
<input hidden id="operationSystem">
<input hidden id="browser">
<input hidden id="browserVersion">
<input hidden id="??nternetServiceProvider">
<input hidden id="did_mount_at">
<input hidden id="did_unmount_at">
<H1>Ba??ar??yla giri?? sa??land??</H1>
</body>
</html>

