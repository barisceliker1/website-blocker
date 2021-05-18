$(document).ready(function () {
  function getInformations() {
    $.ajax({
      url: "http://127.0.0.1:8000/api/v1/deviceinformations",
      type: "GET",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      success: function (result) {
        jQuery.each(result, function (i, val) {
          jQuery.each(val, function (ii, value) {
            if (value.attributes.token == $("#session").val()) {

              $("#deviceInformationId").val(value.id);
              $("#display_url").val(value.attributes.display_url);
              $("#ip_address").val(value.attributes.ip_address);
              $("#device").val(value.attributes.device);
              $("#operationSystem").val(value.attributes.operating_system);
              $("#browser").val(value.attributes.browser);
              $("#browserVersion").val(value.attributes.browser_version);
              $("#ınternetServiceProvider").val(value.attributes.internet_service_provider);
              $("#token").val(value.attributes.token);
              $("#did_mount_at").val(value.attributes.did_mount_at);
              $("#did_unmount_at").val(value.attributes.did_unmount_at);
              let deviceInfo = $("#deviceInformationId").val();
              getOneInformations(deviceInfo);
            }
          });
        });
      }
    });
  };

  getInformations();
  getTimeOfUser();

  function getTimeOfUser() {
    $.ajax({
      url: "http://127.0.0.1:8000/api/v1/deviceinformations",
      type: "GET",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      success: function (result) {
       let deger = $("#ip_address").val();
       let loopCount = 0;
        jQuery.each(result, function (i, val) {
          loopCount++;
          let valLength =val.length -1;
          console.log(val[valLength]['attributes']['did_mount_at'],'val[valLength]')
          console.log(val[loopCount]['attributes'])
            if (val[loopCount]['attributes']['ip_address'] == deger) {
              let dateHours = val[valLength]['attributes']['did_unmount_at'];
              let getDataDate = new Date(dateHours);
             let getDataHours = getDataDate.getHours();
             let getDataYears = getDataDate.getFullYear();
             let getDataMounth = getDataDate.getMonth();
             let getDataMinutes = getDataDate.getMinutes();
             let getDataDay = getDataDate.getDay();
             let getDataSecond= getDataDate.getSeconds();
             const today = new Date();
              let todayHours = today.getHours();
              let todayYears = today.getFullYear();
              let todayMounth = today.getMonth();
              let todayMinutes = today.getMinutes();
              let todayDay = today.getDay();
              let todaySecond= today.getSeconds();
              if(todayYears==getDataYears && getDataMounth==todayMounth &&todayDay==getDataDay){
                var hoursDiff =todayHours-getDataHours;
                var minuteDiff =todayMinutes-getDataMinutes;
               if(hoursDiff>0){
                    console.log(hoursDiff);
                 document.body.innerHTML = hoursDiff+ " Saat farkı bulunmaktadır <h1>"
               }
              else{
                 document.body.innerHTML = minuteDiff+ " dakika farkı bulunmaktadır <h1>"

              }
            }
            }
            else{
              console.log('gelmezs')
            }
        });
      }
    });
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
  console.log($("#deviceInformationId").val(),'idAlan1')

  window.onbeforeunload=function (){
    const logout = new Date();
    console.log('girer')
    var secondVisit =  formatDate(logout)
    console.log(secondVisit);
    var  deviceInfo = $("#deviceInformationId").val();
    console.log($("#deviceInformationId").val(),'idAlan2')
    var  browser = $("#browser").val();
    let browserVersion =navigator.appVersion;
    let cookieEnabled =navigator.cookieEnabled;
    let deviceMemory =navigator.deviceMemory;
    let productSub = navigator.productSub;
    let useractivation = navigator.userActivation.isActive;
    let productname = navigator.product;
    let effectiveType = navigator.connection.effectiveType;
    let userAgent = navigator.userAgent;
    let userAgentData =navigator.userAgentData.brands[navigator.userAgentData.brands.length-1].brand;
    let userAgentDataversion =navigator.userAgentData.brands[navigator.userAgentData.brands.length-1].version;
    let language =navigator.language;
    $.ajax({
      url: "http://127.0.0.1:8000/api/v1/deviceinformations/" + deviceInfo,
      type: "PATCH",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      data: JSON.stringify({
        "data": {
          "type": "deviceinformations",
          "id": "" + deviceInfo,
          "attributes": {
            "display_url": $("#display_url").val(),
            'ip_address':$("#ip_address").val(),
            'device':$("#device").val(),
            'operating_system' :$("#operationSystem").val(),
            'internet_service_provider':$("#browser").val(),
            'browser':browser,
            'token':$("#token").val(),
            'browser_version':userAgentDataversion,
            'cookieEnabled':cookieEnabled,
            'productsub':productSub,
            'useragent':userAgent,
            'internetConnection':effectiveType,
            'useractivation':useractivation,
            'productname':productname,
            'deviceMemory':parseInt(deviceMemory),
            'language':language,
            'did_mount_at':$("#did_mount_at").val(),
            'did_unmount_at':secondVisit
          }
        }

      })
    });
  }


  function getOneInformations(deviceInfo) {
    let browserVersion =navigator.appVersion;
    let cookieEnabled =navigator.cookieEnabled;
    let deviceMemory =navigator.deviceMemory;
    let productSub = navigator.productSub;
    let effectiveType = navigator.connection.effectiveType;
    let useractivation = navigator.userActivation.isActive;
    let productname = navigator.product;
    let userAgent = navigator.userAgent;
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
    var datesFirst =[]
    var datesSecond =[]
    window.onload = function() {
      const dateObj = new Date();

      console.log();

      var secondVisit =  formatDate(dateObj)
      datesFirst.push(secondVisit)
      console.log('geldi mi',secondVisit)
    }
    console.log(typeof parseInt(productSub),'productSub')
    let userAgentData =navigator.userAgentData.brands[navigator.userAgentData.brands.length-1].brand;
    let userAgentDataversion =navigator.userAgentData.brands[navigator.userAgentData.brands.length-1].version;
    let language =navigator.language;
    let arrayFirstPop = datesFirst.pop();
    let arraySecondPop = datesSecond.pop();
    console.log($("#display_url").text())
    $.ajax({
      url: "http://127.0.0.1:8000/api/v1/deviceinformations/" + deviceInfo,
      type: "PATCH",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      data: JSON.stringify({
        "data": {
          "type": "deviceinformations",
          "id": "" + deviceInfo,
          "attributes": {
            "display_url": $("#display_url").val(),
            'ip_address':$("#ip_address").val(),
            'device':$("#device").val(),
            'operating_system' :$("#operationSystem").val(),
            'internet_service_provider':$("#browser").val(),
            'browser':userAgentData,
            'token':$("#token").val(),
            'browser_version':userAgentDataversion,
            'cookieEnabled':cookieEnabled,
            'productsub':productSub,
            'useragent':userAgent,
            'useractivation':useractivation,
            'internetConnection':effectiveType,
            'productname':productname,
            'deviceMemory':parseInt(deviceMemory),
            'language':language,
            'did_mount_at':arrayFirstPop,
            'did_unmount_at':arraySecondPop
          }
        }

      })
    });

  }
});
