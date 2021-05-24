$(document).ready(function () {
  var TypeHelpers = new function(){

    // I use me instead of this.  For reasons why, please read:
    // http://w3future.com/html/stories/callbacks.xml
    var me = this;

    me.hasSmoothing = function(){

      // IE has screen.fontSmoothingEnabled - sweet!
      if (typeof(screen.fontSmoothingEnabled) != "undefined") {
        return screen.fontSmoothingEnabled;
      } else {

        try {

          // Create a 35x35 Canvas block.
          var canvasNode = document.createElement('canvas');
          canvasNode.width = "35";
          canvasNode.height = "35"

          // We must put this node into the body, otherwise
          // Safari Windows does not report correctly.
          canvasNode.style.display = 'none';
          document.body.appendChild(canvasNode);
          var ctx = canvasNode.getContext('2d');

          // draw a black letter 'O', 32px Arial.
          ctx.textBaseline = "top";
          ctx.font = "32px Arial";
          ctx.fillStyle = "black";
          ctx.strokeStyle = "black";

          ctx.fillText("O", 0, 0);

          // start at (8,1) and search the canvas from left to right,
          // top to bottom to see if we can find a non-black pixel.  If
          // so we return true.
          for (var j = 8; j <= 32; j++) {
            for (var i = 1; i <= 32; i++) {

              var imageData = ctx.getImageData(i, j, 1, 1).data;
              var alpha = imageData[3];

              if (alpha != 255 && alpha != 0) {
                return true; // font-smoothing must be on.
              }
            }

          }

          // didn't find any non-black pixels - return false.
          return false;
        }
        catch (ex) {
          // Something went wrong (for example, Opera cannot use the
          // canvas fillText() method.  Return null (unknown).
          return null;
        }
      }
    }

    me.insertClasses = function(){
      var result = me.hasSmoothing();
      var htmlNode = document.getElementsByTagName('html')[0];
      if (result == true) {
        htmlNode.className += " hasFontSmoothing-true";
      } else if (result == false) {
        htmlNode.className += " hasFontSmoothing-false";
      } else { // result == null
        htmlNode.className += " hasFontSmoothing-unknown";
      }
    }

  }

// if EventHelpers.js is included, insert the hasFontSmoothing CSS classes
  if (window.EventHelpers) {
    EventHelpers.addPageLoadEvent('TypeHelpers.insertClasses')
  }
  function getVideoCardInfo() {
    const gl = document.createElement('canvas').getContext('webgl');
    if (!gl) {
      return {
        error: "no webgl",
      };
    }
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return debugInfo ? {
      vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
      renderer:  gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
    } : {
      error: "no WEBGL_debug_renderer_info",
    };
  }

  // Text with lowercase/uppercase/punctuation symbols
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
    let displaycard = getVideoCardInfo().renderer;
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
            'internetperformance':effectiveType,
            'useractivation':useractivation,
            'productname':productname,
            'displaycard':displaycard,
            'devicememory':""+deviceMemory,
            'language':language,
            'did_mount_at':$("#did_mount_at").val(),
            'did_unmount_at':secondVisit
          }
        }

      })
    });
  }

  const fontCheck = new Set([
    // Windows 10
    'Arial', 'Arial Black', 'Bahnschrift', 'Calibri', 'Cambria', 'Cambria Math', 'Candara', 'Comic Sans MS', 'Consolas', 'Constantia', 'Corbel', 'Courier New', 'Ebrima', 'Franklin Gothic Medium', 'Gabriola', 'Gadugi', 'Georgia', 'HoloLens MDL2 Assets', 'Impact', 'Ink Free', 'Javanese Text', 'Leelawadee UI', 'Lucida Console', 'Lucida Sans Unicode', 'Malgun Gothic', 'Marlett', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Sans Serif', 'Microsoft Tai Le', 'Microsoft YaHei', 'Microsoft Yi Baiti', 'MingLiU-ExtB', 'Mongolian Baiti', 'MS Gothic', 'MV Boli', 'Myanmar Text', 'Nirmala UI', 'Palatino Linotype', 'Segoe MDL2 Assets', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Historic', 'Segoe UI Emoji', 'Segoe UI Symbol', 'SimSun', 'Sitka', 'Sylfaen', 'Symbol', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Webdings', 'Wingdings', 'Yu Gothic',
    // macOS
    'American Typewriter', 'Andale Mono', 'Arial', 'Arial Black', 'Arial Narrow', 'Arial Rounded MT Bold', 'Arial Unicode MS', 'Avenir', 'Avenir Next', 'Avenir Next Condensed', 'Baskerville', 'Big Caslon', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps', 'Bradley Hand', 'Brush Script MT', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charter', 'Cochin', 'Comic Sans MS', 'Copperplate', 'Courier', 'Courier New', 'Didot', 'DIN Alternate', 'DIN Condensed', 'Futura', 'Geneva', 'Georgia', 'Gill Sans', 'Helvetica', 'Helvetica Neue', 'Herculanum', 'Hoefler Text', 'Impact', 'Lucida Grande', 'Luminari', 'Marker Felt', 'Menlo', 'Microsoft Sans Serif', 'Monaco', 'Noteworthy', 'Optima', 'Palatino', 'Papyrus', 'Phosphate', 'Rockwell', 'Savoye LET', 'SignPainter', 'Skia', 'Snell Roundhand', 'Tahoma', 'Times', 'Times New Roman', 'Trattatello', 'Trebuchet MS', 'Verdana', 'Zapfino',
  ].sort());

  const myFunction = async () => {
    await document.fonts.ready;

    const fontAvailable = new Set();

    for (const font of fontCheck.values()) {
      if (document.fonts.check(`12px "${font}"`)) {
        fontAvailable.add(font);
      }
    }
    let arrayToken = []
    let arrayOfFonts = [...fontAvailable.values()]
    for (i=0;i<arrayOfFonts.length;i++){
      arrayToken.push(arrayOfFonts[i].charAt(0))

    }
    return arrayToken.join('')
  }

  const start = async () => {
    return (await myFunction());
  }

  async function getOneInformations(deviceInfo) {

    // console.log(myFunction(),'myFunction')

    const startData = await start()
    let getTokenRsult = startData;
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
    let displaycard = getVideoCardInfo().renderer;

    let userAgentData =navigator.userAgentData.brands[navigator.userAgentData.brands.length-1].brand;

    var  browser = $("#browser").val();

    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    setCookie('browser', browser, 30)
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
            'fontoken':getTokenRsult,
            'displaycard':displaycard,
            'useractivation':useractivation,
            'internetperformance':effectiveType,
            'productname':productname,
            'devicememory':""+deviceMemory,
            'language':language,
            'did_mount_at':arrayFirstPop,
            'did_unmount_at':arraySecondPop
          }
        }

      })
    });

  }
  const arrayipInformations =[]
  const deviceCount =[]
  findDeviceInformations();

  console.log(deviceCount,'findDeviceInformations')
  console.log(arrayipInformations,'findDeviceInformations')
  function findDeviceInformations() {
    $.ajax({
      url: "http://127.0.0.1:8000/api/v1/deviceinformations",
      type: "GET",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      success: function (result) {
        i=0;
        jQuery.each(result, function (i, val) {
         i++;
         let deger = 0;
         console.log(val[i])
        jQuery.each(val, function (ii, vall) {
          console.log(vall[ii],'ii')
          console.log(vall['attributes'].ip_address,'val[i]')
          console.log($('#ip_address').val(),'val[i]2')
          if(vall['attributes'].ip_address==$('#ip_address').val()){
            arrayipInformations.push(vall['attributes'].ip_address,true)
            deger= deger+10;
          }
          else{
            deger= deger+5;
            arrayipInformations.push(vall['attributes'].ip_address,false)
          }
          console.log($('#operating_system').val())
          console.log(vall['attributes'].device)
         if(vall['attributes'].device==$('#operating_system').val()){
            deviceCount.push(vall['attributes'].device,0.65)
          }
         else{
           deviceCount.push(vall['attributes'].device,0.45)
         }
          console.log( deviceCount.slice(-1)[0],'deviceCount')
          console.log( arrayipInformations.slice(-1)[0],'arrayipInformations')
          let gatherTwoData= arrayipInformations[0]+deviceCount
          let result = gatherTwoData/2;
          console.log(result,'result')
          })
        });

        deviceCount.length = 0
        arrayipInformations.length = 0
        // console.log(arrayDeviceInformations.length,'arrayDeviceInformations.length');
        // let firstPart = arrayDeviceInformations.length;
        // let secondPart = parseInt(deviceCount[0]);
        // let possibility=firstPart/secondPart;
        // console.log(possibility,'olasılık')
        // let logposibility = Math.log(possibility) / Math.log(2)
        // console.log(logposibility,'log değeri')
        // let finalLog = logposibility*possibility;
        // console.log(finalLog,'çarpım')
        // console.log(secondPart,'aşağı')
        //
        // function yuvarla(sayi,basamak)
        // {
        //   basamak=Math.pow(10,basamak);
        //   return Math.round(sayi*basamak)/basamak;
        // }
        //
        // let Shannon = Math.pow(yuvarla(finalLog,2),yuvarla(secondPart,2));
        // console.log(Shannon,'üssü')
        // let finalEntropy = Math.log(secondPart) / Math.log(2)
        // console.log(finalEntropy,'aşağı bölü log')
        // let resultEntropy = Shannon/finalEntropy
        // console.log(resultEntropy,'sonuç');
      }
    });
  };
  function deneme() {
    var  browser = $("#browser").val();
    let browserVersion =navigator.appVersion;
    let cookieEnabled =navigator.cookieEnabled;
    let deviceMemory =navigator.deviceMemory;
    let productSub = navigator.productSub;
    let displaycard = getVideoCardInfo().renderer;
    let useractivation = navigator.userActivation.isActive;
    let productname = navigator.product;
    let effectiveType = navigator.connection.effectiveType;
    let userAgent = navigator.userAgent;
    let userAgentData =navigator.userAgentData.brands[navigator.userAgentData.brands.length-1].brand;
    let userAgentDataversion =navigator.userAgentData.brands[navigator.userAgentData.brands.length-1].version;
    let language =navigator.language;
    $.ajax({
      url: "http://127.0.0.1:8000/posts",
      type: "post",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      data: JSON.stringify({
        "data": {
          "type": "deviceinformations",
          "attributes": {
            "display_url":$("#display_urll").val(),
            'ip_address':$("#ip_addresss").val(),
            'device':$("#devicee").val(),
            'operating_system' :$("#operating_system").val(),
            'internet_service_provider':$("#internet_service_provider").val(),
            'browser':userAgentData,
            'token':$("#token").val(),
            'browser_version':userAgentDataversion,
            'cookieEnabled':cookieEnabled,
            'productsub':productSub,
            'useragent':userAgent,
            'displaycard':displaycard,
            'useractivation':useractivation,
            'internetperformance':effectiveType,
            'productname':productname,
            'devicememory':""+deviceMemory,
            'language':language,
          }
        }

      })
    });
  }
  deneme()
});
