function setUpScrolls(param_wrapper,param_theme,callback,buttons){
      var pixels="100";
      var inertia=500;

      // if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      //     // some code..
      //     pixels="-10000";
      //     inertia=5;
      // }
        $(param_wrapper).mCustomScrollbar({
            theme:param_theme,
            mouseWheelPixels: pixels,
            scrollInertia: inertia,
              scrollButtons:{
                  enable: buttons
            },
            callbacks:{
              whileScrolling:function(){
                    callback(mcs);
              }
            },
            advanced:{
                autoScrollOnFocus: false,
            }
       });
}


function refreshScroll(param_wrapper){
    $(param_wrapper).mCustomScrollbar("update");
}

function destroyScroll(param_wrapper){
    $(param_wrapper).mCustomScrollbar("destroy");
}

function changeCSS(id,cssFile) {
  document.getElementById(id).setAttribute("href", cssFile);
}

function changeJS(id,jsFile) {
  document.getElementById(id).setAttribute("src", jsFile);
}

// Changes XML to JSON
  function xmlToJson(xml) {
    
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  };