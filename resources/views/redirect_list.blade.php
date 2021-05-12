<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script
        src="https://code.jquery.com/jquery-3.6.0.js"
        integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
        crossorigin="anonymous"></script>
</head>
<body>
<div class="container">
    <table class="table table-dark table-striped">
        <thead>
        <tr>
            <th>URL</th>
            <th>IP ADDRESS</th>
            <th>DEVICE</th>
            <th>BROWSER</th>
            <th>BROWSER VERSION</th>
            <th>INTERNET SERVİCE PROVİDER</th>
            <th>OPERATING SYSTEM</th>
            <th>REDIRECT TO</th>
        </tr>

        </thead>
        <tbody id="redirectBody">
                    @foreach($dataArray as $my)
                        @foreach($my as $dat )




                        <tr><td>{{$dat}}</td>
{{--                            <td>{{$my-> display_url}}</td>--}}
{{--                            --}}
{{--                            <td>{{ $my->device }}</td>--}}
{{--                            <td>{{ $my->browser }}</td>--}}
{{--                            <td>{{$my-> browser_version }}</td>--}}
{{--                            <td>{{$my->internet_service_provider }}</td>--}}
{{--                            <td>{{$my->operating_system}}</td>--}}
{{--                            <td>{{$my->redirect_to }}</td>--}}
                        </tr>
                    @endforeach
                    @endforeach
        </tbody>
    </table>
</div>
</body>
</html>

