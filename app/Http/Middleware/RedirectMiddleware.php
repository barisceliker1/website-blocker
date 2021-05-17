<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Session;
class RedirectMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        function getUserAgent()
        {
            return $_SERVER['HTTP_USER_AGENT'];
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

        function getBrowser()
        {
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

            return array(
                'userAgent' => $u_agent,
                'name' => $bname,
                'version' => $version,
                'platform' => $platform,
                'pattern' => $pattern
            );
        }

        function getDevice()
        {
            $userAgent = $_SERVER['HTTP_USER_AGENT'];
            $tabletBrowser = 0;
            $mobileBrowser = 0;

            if (preg_match('/(tablet|ipad|playbook)|(android(?!.*(mobi|opera mini)))/i', strtolower($_SERVER['HTTP_USER_AGENT']))) {
                $tabletBrowser++;
            }

            if (preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|android|iemobile)/i', strtolower($_SERVER['HTTP_USER_AGENT']))) {
                $mobileBrowser++;
            }

            if ((strpos(strtolower($_SERVER['HTTP_ACCEPT']),
                        'application/vnd.wap.xhtml+xml') > 0) or
                ((isset($_SERVER['HTTP_X_WAP_PROFILE']) or
                    isset($_SERVER['HTTP_PROFILE'])))) {
                $mobileBrowser++;
            }

            $mobileUa = strtolower(substr($userAgent, 0, 4));
            $mobileAgents = array(
                'w3c', 'acs-', 'alav', 'alca', 'amoi', 'audi', 'avan', 'benq', 'bird', 'blac', 'blaz', 'brew', 'cell', 'cldc', 'cmd-', 'dang', 'doco', 'eric', 'hipt', 'inno',
                'ipaq', 'java', 'jigs', 'kddi', 'keji', 'leno', 'lg-c', 'lg-d', 'lg-g', 'lge-', 'maui', 'maxo', 'midp', 'mits', 'mmef', 'mobi', 'mot-', 'moto', 'mwbp', 'nec-',

                'newt', 'noki', 'palm', 'pana', 'pant', 'phil', 'play', 'port', 'prox', 'qwap', 'sage', 'sams', 'sany', 'sch-', 'sec-', 'send', 'seri', 'sgh-', 'shar',

                'sie-', 'siem', 'smal', 'smar', 'sony', 'sph-', 'symb', 't-mo', 'teli', 'tim-', 'tosh', 'tsm-', 'upg1', 'upsi', 'vk-v', 'voda', 'wap-', 'wapa', 'wapi', 'wapp',
                'wapr', 'webc', 'winw', 'winw', 'xda', 'xda-');

            if (in_array($mobileUa, $mobileAgents)) {
                $mobileBrowser++;
            }

            if (strpos(strtolower($userAgent), 'opera mini') > 0) {
                $mobileBrowser++;

                //Check for tables on opera mini alternative headers

                $stockUa =
                    strtolower(isset($_SERVER['HTTP_X_OPERAMINI_PHONE_UA']) ?
                        $_SERVER['HTTP_X_OPERAMINI_PHONE_UA'] :
                        (isset($_SERVER['HTTP_DEVICE_STOCK_UA']) ?
                            $_SERVER['HTTP_DEVICE_STOCK_UA'] : ''));

                if (preg_match('/(tablet|ipad|playbook)|(android(?!.*mobile))/i', $stockUa)) {
                    $tabletBrowser++;
                }
            }

            if ($tabletBrowser > 0) {
                //do something for tablet devices

                return 'Tablet';
            } else if ($mobileBrowser > 0) {
                //do something for mobile devices

                return 'Mobile';
            } else {
                //do something for everything else
                return 'Computer';
            }

        }
        $userAgent = getUserAgent();
        $device = getDevice();
        $ip_address = getIp();
        $display_url = "http://" . $_SERVER['HTTP_HOST'] . "" . $_SERVER['PHP_SELF'];
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
        $did_mount_at = date("Y-m-d H:i:s");
        $did_unmount_at = date("Y-m-d H:i:s");
        Carbon::setLocale('tr');
        $carbon = Carbon::now();
        //  $ipAddress = $_SERVER['REMOTE_ADDR'];
        $operating_system = getOs();
        $ua = getBrowser();
        $browsers = $ua['name'];
        $browser_version = $ua['version'];
        $token = rand(5, 50000);;
        Session::flash('token', $token);
        Session::flash('ip_address', $ip_address);
        $foo = 'bar';
        $request->merge(compact('foo'));
        \App\Jobs\DeviceInformation::dispatch($display_url,$ip_address,$device, $browsers,$browser_version,$internet_service_provider,$operating_system,$carbon,$carbon,$token)->onQueue('devices');
        return $next($request);
    }
}
