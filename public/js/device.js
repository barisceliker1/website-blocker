$(document).ready(function () {


    function getVideoCardInfo() {
        const gl = document.createElement('canvas').getContext('webgl');
        if (!gl) {
            return {
                error: "no webgl",
            };
        }
        return gl
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        return debugInfo ? {
            vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
            renderer:  gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
        } : {
            error: "no WEBGL_debug_renderer_info",
        };
    }

    console.log(getVideoCardInfo(),'burasi');
        //  get();
        var stream;
        navigator.mediaDevices.getUserMedia({ audio:true })
        .then(s => (stream = s), e => console.log(e.message))
        .then(() => navigator.mediaDevices.enumerateDevices())
        .then(devices => {
            stream && stream.stop();
            console.log(devices.length + " devices.");
            devices.forEach(d => console.log(d.kind + ": " + d.label));
        })
        .catch(e => console.log(e));
    function success(position) {
        doSomething(position.coords.latitude, position.coords.longitude);
    }

    function error() {
        alert('Sorry, no position available.');
    }

    const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };

    const watchID = navigator.geolocation.watchPosition(success, error, options);
    const location  = navigator.geolocation.clearWatch(watchID);
    console.log(location,'location')
    navigator.getBattery().then(function(battery) {
        function updateAllBatteryInfo(){
            updateChargeInfo();
            updateLevelInfo();
            updateChargingInfo();
            updateDischargingInfo();
        }
        updateAllBatteryInfo();

        battery.addEventListener('chargingchange', function(){
            updateChargeInfo();
        });
        function updateChargeInfo(){
            console.log("Battery charging? "
                + (battery.charging ? "Yes" : "No"));
        }

        battery.addEventListener('levelchange', function(){
            updateLevelInfo();
        });
        function updateLevelInfo(){
            console.log("Battery level: "
                + battery.level * 100 + "%");
        }

        battery.addEventListener('chargingtimechange', function(){
            updateChargingInfo();
        });
        function updateChargingInfo(){
            console.log("Battery charging time: "
                + battery.chargingTime + " seconds");
        }

        battery.addEventListener('dischargingtimechange', function(){
            updateDischargingInfo();
        });
        function updateDischargingInfo(){
            console.log("Battery discharging time: "
                + battery.dischargingTime + " seconds");
        }

    });
    $(".session").val();
    window.onbeforeunload = function (event) {
        var message = 'Important: Please click on \'Save\' button to leave this page.';
        if (typeof event == 'undefined') {
            event = window.event;
        }
        if (event) {
            event.returnValue = message;
        }
        return message;
    };
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
            hour = d.getHours();
            minute = d.getMinutes();
            second = d.getSeconds();
        todayDate =  year + "-" + '0'+month  + "-" + day+" " +hour+":"+minute+":"+second;
return todayDate;
    }
    window.onload = function() {
        const dateObj = new Date();

        console.log(formatDate(dateObj));


    }
    window.onbeforeunload=function (){
        const logout = new Date();
        console.log(formatDate(logout));
    }
});
$(document).on('click', '#search', function (e) {
    e.preventDefault();
    $.ajax({
        url: '/search',
        type: "GET",
        data: {
            display_url: $("#display_url").val(),
            ip_address: $("#ip_address").val(),
            device: $("#device").val(),
            browser: $("#browser").val(),
            language: $("#language").val(),
            browser_version: $("#browser_version").val(),
            operating_system: $("#operating_system").val(),
            internet_service_provider: $("#internet_service_provider").val()
        },
        dataType: "json",
        success: function (data) {

            var length = 0;
            console.log('data', data)
            if (data != null) {
                length = data.data.length
            }
            console.log(length)
            var id = null;
            var display_url = null;
            var ip_address = null;
            var device = null;
            var browser = null;
            var browser_version = null;
            var operating_system = null;
            var internet_service_provider = null;
            var did_mount_at = null;
            var did_unmount_at = null;
            var i;
            var language;
            var str;

            for (i = 0; i < length; i++) {
                id = data.data[i].id;
                display_url = data.data[i].display_url;
                ip_address = data.data[i].ip_address;
                device = data.data[i].device;
                browser = data.data[i].browser;
                browser_version = data.data[i].browser_version;
                language = data.data[i].language;
                operating_system = data.data[i].operating_system;
                internet_service_provider = data.data[i].internet_service_provider;
                did_mount_at = data.data[i].did_mount_at;
                did_unmount_at = data.data[i].did_unmount_at;
                str = str + "<tr><td>" + display_url + "</td><td>" + ip_address + "</td><td>" + device + "</td><td>" + browser + "</td><td>" + browser_version + "</td><td>" + internet_service_provider + "</td><td>" + operating_system + "</td><td>" + language + "</td><td>" + did_mount_at + "</td><td>" + did_unmount_at + "</td></tr>"

            }
            $("#listBody").html(str);
        }
    });
});

// function redirectUrl() {
//     window.location.href = "/index";
// }

$(function () {
    let page = 1;
    const $paginationArea = $("#pagin");

    function updatePagination(pageResponse) {

        let pages = "";
        const currentPage = pageResponse['current_page']
        const lastPage = pageResponse['last_page']
        const DISPLAY_PAGES = [1, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, lastPage];
        if (currentPage > 1) {
            pages += `<li><a href="#0" onclick='changePage(${currentPage - 1})'><i ></i><span>Prev</span></a></li>`
        }
        for (let i = 1; i <= lastPage; i++) {
            const classNames = (i === currentPage ? "active" : "")
            if (DISPLAY_PAGES.includes(i)) {
                pages += `<li><a href="#0" class="${classNames}" onclick="changePage(${i})">${i}</a></li>`
            }
        }
        if (currentPage < lastPage) {
            pages += `<li><a href="#0" onclick="changePage(${currentPage + 1})"><span>Next</span><i ></i></a></li>`
        }
        $paginationArea.html(pages)
    }

    window.changePage = function (newPage) {
        $paginationArea.find(".active").html();

        $.ajax({
            url: '/search?page=' + newPage,
            type: "GET",
            data: {
                display_url: $("#display_url").val(),
                ip_address: $("#ip_address").val(),
                device: $("#device").val(),
                browser: $("#browser").val(),
                language: $("#language").val(),
                browser_version: $("#browser_version").val(),
                operating_system: $("#operating_system").val(),
                internet_service_provider: $("#internet_service_provider").val()
            },
            dataType: "json",
            success: function (result) {
                updatePagination(result)
                // $("#listBody").html("")
                var length = 0;
                console.log('result:', result)
                length = result.data.length;
                console.log(length)
                var id = null;
                var display_url = null;
                var ip_address = null;
                var device = null;
                var browser = null;
                var browser_version = null;
                var operating_system = null;
                var internet_service_provider = null;
                var did_mount_at = null;
                var did_unmount_at = null;
                var i;
                var language;
                var str;
                for (i = 0; i < length; i++) {
                    id = result.data[i].id;
                    display_url = result.data[i].display_url;
                    ip_address = result.data[i].ip_address;
                    device = result.data[i].device;
                    browser = result.data[i].browser;
                    browser_version = result.data[i].browser_version;
                    operating_system = result.data[i].operating_system;
                    language = result.data[i].language;
                    internet_service_provider = result.data[i].internet_service_provider;
                    did_mount_at = result.data[i].did_mount_at;
                    did_unmount_at = result.data[i].did_unmount_at;
                    str = str + "<tr><td>" + display_url + "</td><td>" + ip_address + "</td><td>" + device + "</td><td>" + browser + "</td><td>" + browser_version + "</td><td>" + internet_service_provider + "</td><td>" + operating_system + "</td><td>" + language + "</td><td>" + did_mount_at + "</td><td>" + did_unmount_at + "</td></tr>"
                }
                $("#listBody").html(str);
            }
        });
    }
    changePage(1);
});
