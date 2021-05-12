<?php

namespace App\Http\Controllers;

use App\Models\DeviceInformation;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Session;
class RedirectController extends Controller
{
    function index()
    {
        $pagination = DB::table('device_information')->paginate(10);
        $hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
// create curl resource
//        $ch = curl_init();
//
//        // set url
//        curl_setopt($ch, CURLOPT_URL, "https://ipinfo.io/what-is-my-ip");
//
//        //return the transfer as a string
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//
//        // $output contains the output string
//        $output = curl_exec($ch);
//        preg_match('/"org": "(.*?)"/', $output, $m);
//        $externalIp = $m[1];
//        print_r(($externalIp));
//
//        // close curl resource to free up system resources
//        curl_close($ch);

        return view('device_information', compact('pagination'));
    }

    function welcome()
    {
        return view('welcome');
    }

    function redirectList()
    {
        $mypubPath = public_path();
        $save = $mypubPath . "/results.json";
        $info = file_get_contents($save);
        $dataArray = json_decode($info, true);


        return view('redirect_list', compact('dataArray'));
    }

    function post(Request $request)
    {
        if($request->block_browser && $request->block_browser_version >0){
            $mypublicPath = public_path();
            $savePath = $mypublicPath . "/results.json";
            $inp = file_get_contents($savePath);
            $tempArray = json_decode($inp, true);
            $data = array("blockRedirect"=>$request->block_redirect,"block_internet_service_provider"=>$request->block_internet_service_provider,"url"=>$request->block_display_url,"start" => $request->start_ipaddress,"end" => $request->end_ipaddress,"block_browser"=>$request->block_browser,"block_browser_version"=>$request->block_browser_version);
            $tempArray[] = $data;
            $jsonData = json_encode($tempArray);
            file_put_contents('results.json', $jsonData);
            return view('device_information')->with("success",'Bu bilgilere sahip kullanıcılar başarıyla blok listesine eklendi');
        }
    else{
        return redirect('device_information')->with("unsuccess","Eksik bilgi girdiniz");
        }



//      if($_SERVER['HTTP_CLIENT_IP'] ==$device){
//          echo "ip eşit";
//      }
//      else{
//          echo "ip farklı";
//      }
    }

    function index1()
    {
        $mypublicPath = public_path();
        $savePath = $mypublicPath . "/results.json";
        $inp = file_get_contents($savePath);
        $data = json_decode($inp, true);
        $array = [];

        foreach ($data as $dat) {

                $u_agent = $_SERVER['HTTP_USER_AGENT'];
                $bname = 'Unknown';
                $platform = 'Unknown';
                $version = "";

                //First get the platform?
                if (preg_match('/linux/i', $u_agent)) {
                    $platform = 'linux';
                } elseif (preg_match('/macintosh|mac os x/i', $u_agent)) {
                    $platform = 'mac';
                } elseif (preg_match('/windows|win32/i', $u_agent)) {
                    $platform = 'windows';
                }

                // Next get the name of the useragent yes seperately and for good reason
                if (preg_match('/MSIE/i', $u_agent) && !preg_match('/Opera/i', $u_agent)) {
                    $bname = 'Internet Explorer';
                    $ub = "MSIE";
                } elseif (preg_match('/Firefox/i', $u_agent)) {
                    $bname = 'Mozilla Firefox';
                    $ub = "Firefox";
                } elseif (preg_match('/Chrome/i', $u_agent)) {
                    $bname = 'Google Chrome';
                    $ub = "Chrome";
                } elseif (preg_match('/Safari/i', $u_agent)) {
                    $bname = 'Apple Safari';
                    $ub = "Safari";
                } elseif (preg_match('/Opera/i', $u_agent)) {
                    $bname = 'Opera';
                    $ub = "Opera";
                } elseif (preg_match('/Netscape/i', $u_agent)) {
                    $bname = 'Netscape';
                    $ub = "Netscape";
                }

                // finally get the correct version number
                $known = array('Version', $ub, 'other');
                $pattern = '#(?<browser>' . join('|', $known) .
                    ')[/ ]+(?<version>[0-9.|a-zA-Z.]*)#';
                if (!preg_match_all($pattern, $u_agent, $matches)) {
                    // we have no matching number just continue
                }

                // see how many we have
                $i = count($matches['browser']);
                if ($i != 1) {
                    //we will have two since we are not using 'other' argument yet
                    //see if version is before or after the name
                    if (strripos($u_agent, "Version") < strripos($u_agent, $ub)) {
                        $version = $matches['version'][0];
                    } else {
                        $version = $matches['version'][1];
                    }
                } else {
                    $version = $matches['version'][0];
                }

                // check if we have a number
                if ($version == null || $version == "") {
                    $version = "?";
                }

                $browserInfo = array(
                    'userAgent' => $u_agent,
                    'name' => $bname,
                    'version' => $version,
                    'platform' => $platform,
                    'pattern' => $pattern
                );
                $browsers = $browserInfo['name'];
                $browser_version = $browserInfo['version'];
             $str = $browsers;
             $str2 = $browser_version;
             $operationSystem = self::getOs();
             $new = $dat["block_browser_version"];
             $operationSystemname = $dat["block_browser"];
             $url = $dat["url"];
             $pattern = "/$new/i";
             $pattern2 = "/$operationSystemname/i";
             $pattern3 = "/$url/i";
            $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
            $selfIp = self::getIp();
            list($ip1, $ip2, $ip3, $ip4) = explode(".", $selfIp);
            //Source string
           $blockınternet = $dat['block_internet_service_provider'];
          $startOfIp =  $dat["start"];
          $endOfIp =  $dat["end"];
            list($startOfIplast1, $startOfIplast2, $startOfIplast3, $startOfIplast4) = explode(".", $startOfIp);
            list($endofIPP1, $endofIPP2, $endofIPP3, $endofIPP4) = explode(".", $endOfIp);

             preg_match_all($pattern, $str, $matches);
             preg_match_all($pattern2, $operationSystem, $matches2);
echo $pattern."<br>";
echo $operationSystem."<br>";
echo $pattern2."<br>";;
echo $str."<br>";;
             $falseOrTrue = [];
            $ch = curl_init();

            // set url
            curl_setopt($ch, CURLOPT_URL, "https://ipinfo.io/what-is-my-ip");

            //return the transfer as a string
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

            // $output contains the output string
            $output = curl_exec($ch);
            preg_match('/"org": "(.*?)"/', $output, $m);
            $externalIp = $m[1];


            // close curl resource to free up system resources
            $internet_service_provider = $externalIp; // internet service provider
            curl_close($ch);

            if((count($matches[0])>0) && (count($matches2[0])&& $url==$actual_link && $ip1==$startOfIplast1 &&$ip2==$startOfIplast2 &&$ip3==$startOfIplast3 &&$ip4>$startOfIplast4 && $endofIPP4 >$ip4&& $externalIp==$blockınternet)){
                array_push($falseOrTrue, "1");

            }else{

                array_push($falseOrTrue, "0");
            }

//        if (in_array("girer", $array)) {
//
//            $mypubPath = public_path();
//            $save = $mypubPath . "/ip.json";
//            $info = file_get_contents($save);
//            $dataArray = json_decode($info, true);
//            $dataT = array("ip" => $da);
//            $dataArray[] = $dataT;
//            $jsonData = json_encode($dataArray);
//            file_put_contents('ip.json', $jsonData);
//
//            return redirect()->route('welcome');
//        } else {
//
//            return view('index');
//        }
    }
        $key = array_search('1', $falseOrTrue);

        if (in_array("1", $falseOrTrue)) {
            return redirect('welcome');
        }
        else{
            $session = Session::get('token');
            return view('index',compact('session'));
        }
//        return view('index');
//        return redirect()->action('welcome');
        }

    function getOs()
    {
        //  $userAgent = self::getUserAgent();
        $userAgent = $_SERVER['HTTP_USER_AGENT'];
        $osName = "Unknown OS Platform";
        $osArray = array(
            '/windows nt 10/i' => 'Windows 10',
            '/windows nt 6.3/i' => 'Windows 8.1',
            '/windows nt 6.2/i' => 'Windows 8',
            '/windows nt 6.1/i' => 'Windows 7',
            '/windows nt 6.0/i' => 'Windows Vista',
            '/windows nt 5.2/i' => 'Windows Server 2003/XP x64',
            '/windows nt 5.1/i' => 'Windows XP',
            '/windows xp/i' => 'Windows XP',
            '/windows nt 5.0/i' => 'Windows 2000',
            '/windows me/i' => 'Windows ME',
            '/win98/i' => 'Windows 98',
            '/win95/i' => 'Windows 95',
            '/win16/i' => 'Windows 3.11',
            '/macintosh|mac os x/i' => 'Mac OS X',
            '/mac_powerpc/i' => 'Mac OS 9',
            '/linux/i' => 'Linux',
            '/ubuntu/i' => 'Ubuntu',
            '/iphone/i' => 'iPhone',
            '/ipod/i' => 'iPod',
            '/ipad/i' => 'iPad',
            '/android/i' => 'Android',
            '/blackberry/i' => 'BlackBerry',
            '/webos/i' => 'Mobile',
        );

        foreach ($osArray as $regex => $value) {
            if (preg_match($regex, $userAgent)) {
                $osName = $value;
            }
        }
        return $osName;
    }
    public function search(Request $request)
    {
        $searchUrl = $request->input('display_url');
        $searchIP = $request->input('ip_address');
        $searchDevice = $request->input('device');
        $searchBrowser = $request->input('browser');
        $searchBrowserVers = $request->input('browser_version');
        $searchIsp = $request->input('internet_service_provider');
        $searchOs = $request->input('operating_system');
        $searchLogin = $request->input('did_mount_at');
        $searchLogout = $request->input('did_unmount_at');
        $posts = DeviceInformation::query()
            ->where('display_url', 'LIKE', "%{$searchUrl}%")
            ->where('ip_address', 'LIKE', "%{$searchIP}%")
            ->where('device', 'LIKE', "%{$searchDevice}%")
            ->where('browser', 'LIKE', "%{$searchBrowser}%")
            ->where('browser_version', 'LIKE', "%{$searchBrowserVers}%")
            ->where('internet_service_provider', 'LIKE', "%{$searchIsp}%")
            ->where('operating_system', 'LIKE', "%{$searchOs}%")
            ->where('did_mount_at', 'LIKE', "%{$searchLogin}%")
            ->where('did_unmount_at', 'LIKE', "%{$searchLogout}%")
            //   ->get()
            ->paginate(10);
        return response()->json($posts);
    }
    function getIp()
    {
        $ipAddress = '';
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            // to get shared ISP IP address
            $ipAddress = $_SERVER['HTTP_CLIENT_IP'];
        } else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            // check for IPs passing through proxy servers
            // check if multiple IP addresses are set and take the first one
            $ipAddressList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            foreach ($ipAddressList as $ip) {
                if (!empty($ip)) {
                    // if you prefer, you can check for valid IP address here
                    $ipAddress = $ip;
                    break;
                }
            }
        } else if (!empty($_SERVER['HTTP_X_FORWARDED'])) {
            $ipAddress = $_SERVER['HTTP_X_FORWARDED'];
        } else if (!empty($_SERVER['HTTP_X_CLUSTER_CLIENT_IP'])) {
            $ipAddress = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
        } else if (!empty($_SERVER['HTTP_FORWARDED_FOR'])) {
            $ipAddress = $_SERVER['HTTP_FORWARDED_FOR'];
        } else if (!empty($_SERVER['HTTP_FORWARDED'])) {
            $ipAddress = $_SERVER['HTTP_FORWARDED'];
        } else if (!empty($_SERVER['REMOTE_ADDR'])) {
            $ipAddress = $_SERVER['REMOTE_ADDR'];
        }
        return $ipAddress;

    }
    public function update(Request $request, int $id)
    {
        $info = DeviceInformation::find($id);
        $info->display_url = $request->input('display_url');
        $info->ip_address = $request->input('ip_address');
        $info->device = $request->input('device');
        $info->browser = $request->input('browser');
        $info->browser_version = $request->input('browser_version');
        $info->internet_service_provider = $request->input('internet_service_provider');
        $info->operating_system = $request->input('operating_system');
        $info->did_mount_at = $request->input('did_mount_at');
        $info->did_unmount_at = $request->input('did_unmount_at');
        $info->save();
        return response()->json($info);
    }
}
