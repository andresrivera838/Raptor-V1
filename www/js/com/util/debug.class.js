var Debug = function(){
	
}
// Avoid `console` errors in browsers that lack a console.
Debug.hack = function(){
    var method;
    var noop = function () {};
    var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];
        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}
Debug.toString = function(obj)
{
    for(i in obj)
    {
        console.log(i+" "+obj[i]);
    }
}
Debug.log = function(obj)
{
    if(ConstantesAPP.DEBUG)
    {
        console.log(obj);
    }
}