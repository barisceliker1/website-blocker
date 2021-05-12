console.log("token", token)
$(document).ready(function () {
    // get();
    $(".session").val();
});

// function get() {
//     $.ajax({
//         url: "/device_information",
//         headers: {
//             "Content-Type": "application/vnd.api+json",
//             Accept: "application/vnd.api+json",
//         },
//         type: "GET",
//         success: function (data) {
//
//             var length = 0;
//             if (data != null) {
//                 console.log(data.length)
//                 length = data.length
//             }
//             console.log(length)
//             var id = null;
//             var display_url = null;
//             var ip_address = null;
//             var device = null;
//             var browser = null;
//             var browser_version = null;
//             var operating_system = null;
//             var internet_service_provider = null;
//             var did_mount_at = null;
//             var did_unmount_at = null;
//             var i;
//             var str;
//
//             for (i = 0; i < length; i++) {
//                 id = data.data[i].id;
//                 display_url = data.data[i].display_url;
//                 ip_address = data.data[i].ip_address;
//                 internet_service_provider = data.data[i].device;
//                 browser = data.data[i].browser;
//                 browser_version = data.data[i].browser_version;
//                 operating_system = data.data[i].operating_system;
//                 device = data.data[i].internet_service_provider;
//                 did_mount_at = data.data[i].did_mount_at;
//                 did_unmount_at = data.data[i].did_unmount_at;
//                 str = str + "<tr><td>" + display_url + "</td><td>" + ip_address + "</td><td>" + internet_service_provider + "</td><td>" + browser + "</td><td>" + browser_version + "</td><td>" + device + "</td><td>" + operating_system + "</td><td>" + did_mount_at + "</td><td>" + did_unmount_at + "</td></tr>"
//
//             }
//             $("#listBody").html(str);
//         }
//     });
//
// }

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
            var str;
            var language;

            for (i = 0; i < length; i++) {
                id = data.data[i].id;
                display_url = data.data[i].display_url;
                ip_address = data.data[i].ip_address;
                device = data.data[i].device;
                browser = data.data[i].browser;
                browser_version = data.data[i].browser_version;
                operating_system = data.data[i].operating_system;
                internet_service_provider = data.data[i].internet_service_provider;
                language = data.data[i].language;
                did_mount_at = data.data[i].did_mount_at;
                did_unmount_at = data.data[i].did_unmount_at;
                str = str + "<tr><td>" + display_url + "</td><td>" + ip_address + "</td><td>" + internet_service_provider + "</td><td>" + browser + "</td><td>" + browser_version + "</td><td>" + device + "</td><td>" + operating_system + "</td><td>" + language + "</td><td>" + did_mount_at + "</td><td>" + did_unmount_at + "</td></tr>"

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
                    str = str + "<tr><td>" + display_url + "</td><td>" + ip_address + "</td><td>" + operating_system + "</td><td>" + browser + "</td><td>" + browser_version + "</td><td>" + device + "</td><td>" + internet_service_provider + "</td><td>" + language + "</td><td>" + did_mount_at + "</td><td>" + did_unmount_at + "</td></tr>"
                }
                $("#listBody").html(str);
            }
        });
    }
    changePage(1);
});
