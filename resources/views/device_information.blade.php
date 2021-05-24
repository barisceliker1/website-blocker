<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>

    <script src="https://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js"></script>
    <style>
        .w-5 {
            display: none;
        }
    </style>
    <link rel="stylesheet"type="text/css" href="{{asset('css')}}/device.css">
</head>
<body>
<input hidden id="nameOfdevice" name="nameOfdevice">
<nav class="navbar navbar-inverse">
    <div class="container-fluid">
        <h3 STYLE="margin:auto;text-align: center;font-weight: bold;">VISITER'S DEVICE INFORMATION</h3>
    </div>
</nav>
<center>
    @if (session()->has('success'))
        <div class="alert alert-danger col-md-6" role="alert">
            {{ session('success') }}
        </div>
    @endif
        @if (session()->has('unsuccess'))
            <div class="alert alert-danger col-md-6" role="alert">
                {{ session('unsuccess') }}
            </div>
    @endif
    <div class="container col-md-12" style="margin:auto;text-align: center">
        <table>
        <thead>
        <tr>
        <div class="pull-right">
                <form method="post" action="{{route('post')}}" accept-charset="UTF-8">
               @csrf
                <th><input type="text" class="form-control" name="block_display_url" id="block_display_url" placeholder="Url"></th>
                <th><input type="text" class="form-control" name="start_ipaddress" id="block_ip_address" placeholder="Başlangıç IP"></th>
                <th><input type="text" class="form-control" name="end_ipaddress" id="block_ip_address" placeholder="En son IP"></th>
                <th><input type="text" class="form-control" name="block_device" id="block_device" placeholder="Device"></th>
                <th><input type="text" class="form-control" name="block_browser" id="block_browser" placeholder="Browser"></th>
                <th><input type="text" class="form-control" name="block_browser_version" id="block_browser_version" placeholder="Browser Version"></th>
                <th><input type="text" class="form-control" name="block_internet_service_provider" id="block_internet_service_provider" placeholder="Internet Service Provider"></th>
                <th><input type="text" class="form-control" name="block_operating_system" id="block_operating_system" placeholder="Operating System"></th>
                <th><input type="text" class="form-control" name="block_redirect" id="block_redirect" placeholder="Redirect To"></th>
{{--                <th><input type="date" class="form-control" name="block_did_mount_at" id="block_did_mount_at"></th>--}}
{{--                <th><input type="date" class="form-control" name="block_did_unmount_at" id="block_did_unmount_at"></th>--}}

           <th> <button type="submit" id="block" class="btn btn-danger">BLOCK</button></th>
            </form>
        </div>
        </tr></thead></table>
        <table class="table table-dark table-striped">
            <thead>
            <tr>
                <div class="filter">
                    <form>
                        <th><input type="text" class="form-control" name="display_url" id="display_url" placeholder="Url"></th>
                        <th><input type="text" class="form-control" name="ip_address" id="ip_address" placeholder="IP Adress"></th>
                        <th><input type="text" class="form-control" name="device" id="device" placeholder="Device"></th>
                        <th><input type="text" class="form-control" name="browser" id="browser" placeholder="Browser"></th>
                        <th><input type="text" class="form-control" name="browser_version" id="browser_version" placeholder="Browser Version"></th>
                        <th><input type="text" class="form-control" name="internet_service_provider" id="internet_service_provider" placeholder="Internet Service Provider"></th>
                        <th><input type="text" class="form-control" name="operating_system" id="operating_system" placeholder="Operating System"></th>
                        <th><input type="text" class="form-control" name="language" id="language" placeholder="language"></th>
                        <th><input type="date" class="form-control" name="did_mount_at" id="did_mount_at"></th>
                        <th><input type="date" class="form-control" name="did_unmount_at" id="did_unmount_at"></th>
                        <th>
                            <button id="search" class="btn btn-primary" type="submit">Search</button>
                        </th>

                    </form>
                </div>
            </tr>
            <tr>
                <th>URL</th>
                <th>IP ADDRESS</th>
                <th>INTERNET SERVİCE PROVİDER</th>
                <th>BROWSER</th>
                <th>BROWSER VERSION</th>
                <th>OPERATING SYSTEM</th>
                <th>DEVICE</th>
                <th>Language</th>
                <th>Did Mount At</th>
                <th>Did Mount At</th>
            </tr>
            </thead>
            <tbody id="listBody">
            @foreach($pagination as $data)
                <tr>
                    <td>{{$data->display_url}}</td>
                    <td>{{$data->ip_address}}</td>
                    <td>{{$data->device}}</td>
                    <td>{{$data->browser}}</td>
                    <td> {{$data->browser_version}}</td>
                    <td>{{$data->internet_service_provider}}</td>
                    <td>{{$data->operating_system}}</td>
                    <td>{{$data->did_mount_at}}</td>
                    <td>{{$data->did_unmount_at}}</td>
                </tr>
            @endforeach

            <!-- Call to action buttons -->
            </tbody>
        </table>
        <center>
            <div id="pagination" class="pagination" style="padding: 40px 20px;clear: both;text-align: center;margin-top: -1px;border-top:1px solid #e5e5e5">
                <ul id="pagin" class="pagination pagination-lg" style="solid-color: #E5E5E5">
                </ul>
            </div>
        </center>
    </div>
</center>
<canvas id="W1_canvas">
    Please use a browser that supports "canvas"
</canvas>
<script>
    const token = "{{ request()->token }}";
</script>
<script src="{{asset('js')}}/device.js"></script>
<script>
    window.onload=function(){
        login_page=new Date();
    }
    window.onbeforeunload=function(){
        logout_page = new Date();
    }
</script>
</body>
</html>
