/*(function() {
        var ua = navigator.userAgent
        , platform = navigator.platform
        // Rendering engine is Webkit, and capture major version
        , wkmatch = ua.match(/AppleWebKit\/([0-9]+)/)
        , wkversion = !!wkmatch && wkmatch[1]
        , ffmatch = ua.match(/Fennec\/([0-9]+)/)
        , ffversion = !!ffmatch && ffmatch[1]
        , operammobilematch = ua.match(/Opera Mobi\/([0-9]+)/)
        , omversion = !!operammobilematch && operammobilematch[1]
        , iematch = ua.match(/MSIE ([0-9]+)/)
        , ieversion = !!iematch && iematch[1];
                
        if (platform.indexOf("iPhone") > -1 || platform.indexOf("iPad") > -1 || platform.indexOf("iPod") > -1) 
        {
            ConstantesAPP.dispositivo = Constantes_DISPOSITIVOS.APPLE_MOBILE;
        }
        
        if (ua.indexOf("Android") > -1) 
        {
            ConstantesAPP.dispositivo = Constantes_DISPOSITIVOS.ANDROID_MOBILE;
        }
        //return !(
        // iOS 4.3 and older : Platform is iPhone/Pad/Touch and Webkit version is less than 534 (ios5)
        if(((platform.indexOf("iPhone") > -1 || platform.indexOf("iPad") > -1 || platform.indexOf("iPod") > -1) && wkversion && wkversion < 534) || 

        // Opera Mini
        (window.operamini && ({}).toString.call(window.operamini) === "[object OperaMini]") || 
        (operammobilematch && omversion < 7458) || 

        //Android lte 2.1: Platform is Android and Webkit version is less than 533 (Android 2.2)
        (ua.indexOf("Android") > -1 && wkversion && wkversion < 533) || 

        // Firefox Mobile before 6.0 -
        (ffversion && ffversion < 6) || 

        // WebOS less than 3
        ("palmGetResource" in window && wkversion && wkversion < 534) || 

        // MeeGo
        (ua.indexOf("MeeGo") > -1 && ua.indexOf("NokiaBrowser/8.5.0") > -1) || 

        // IE6
        (ieversion && ieversion <= 6))
        {
            ConstantesAPP.dispositivo = Constantes_DISPOSITIVOS.PLATAFORMA_VIEJA;
        }
        //);
    }());*/