$(document).ready(function () {
  getInformations();

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
              console.log(value.attributes);
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

  function getOneInformations(deviceInfo) {
    let browserVersion =navigator.appVersion;
    let cookieEnabled =navigator.cookieEnabled;
    let deviceMemory =navigator.deviceMemory;
    let productSub = navigator.productSub;
    let userAgentData =navigator.userAgentData.brands[navigator.userAgentData.brands.length-1].brand;
    let userAgentDataversion =navigator.userAgentData.brands[navigator.userAgentData.brands.length-1].version;
    let language =navigator.language;
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
            'productSub':""+productSub,
            'deviceMemory':parseInt(deviceMemory),
            'language':language,


          }
        }

      })
    });

  }
});
