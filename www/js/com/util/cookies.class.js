	//////////////////  Cookies Class /////////////////////7
	Cookies={
		cookieName:null,
		cookieValue:null,
		cookieDays:null

	}
	Cookies.setCookie = function (param_obj){
		this.cookieName=param_obj.name;
		this.cookieName=param_obj.value;
		this.cookieDays=param_obj.days;
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + param_obj.days);
		var c_value=escape(param_obj.value) + ((param_obj.days==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=param_obj.name + "=" + c_value;
	}

	Cookies.getCookie = function(param_name)
	{
		var c_value = document.cookie;
		var c_start = c_value.indexOf(" " + param_name + "=");
		if (c_start == -1)
		  {
		  c_start = c_value.indexOf(param_name + "=");
		  }
		if (c_start == -1)
		  {
		  c_value = null;
		  }
		else
		  {
		  c_start = c_value.indexOf("=", c_start) + 1;
		  var c_end = c_value.indexOf(";", c_start);
		  if (c_end == -1)
		  {
		c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
		}
	return c_value;
	}
	//////////////////  Cookies Class /////////////////////7



// Cookies.setCookie({
//     name: "www.nosotrasonline.com_alias_pais",
//     value: "CO",
//     days: 2000000000, path: "/"
// });


// function checkCookie()
// {
// var username=Cookies.getCookie(cookieName);
// if (username!=null && username!="" && username == cookieValue)
//   {
//   // console.log("usuario ya habia actualizado" );
//   cookiesFlag=true;
//   }
//   else{
//   // console.log("usuario no habia actualizado" );
//    cookiesFlag=false;
//   }

// }
