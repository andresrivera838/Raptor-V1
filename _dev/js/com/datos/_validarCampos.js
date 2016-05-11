var ValidarCampos = (function(window, undefined){
	"use strict";
	var REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	function ValidarCampos(p_obj) {
		this.obtenerValorClass = p_obj.obtenerValorClass;
	}
	var p = ValidarCampos.prototype;

	p.email = function(p_obj){
		var email;
		if(p_obj.element_type == "input"){	
    		email = this.obtenerValorClass.input(p_obj);
		}
    	var isEmail = REGEX_EMAIL.test(email)
    	// console.log("email validado?: " + isEmail);
    	return isEmail;
	}

	p.isInteger = function(p_obj){
		var data;
    	if(p_obj.element_type == "dropDown"){
    		// console.log("si es un dropdown");
    		data = this.obtenerValorClass.dropDown(p_obj);
		}
		var isInt = data % 1 === 0;
		return isInt
	}

	p.isNaturalNumber = function(p_obj){
		var n="";
		if(p_obj.element_type == "input"){
    		n = this.obtenerValorClass.input(p_obj);
		}
		else if(p_obj.element_type == "dropDown"){
    		// console.log("si es un dropdown");
    		n = this.obtenerValorClass.dropDown(p_obj);
		}
		n = n.toString(); // force the value incase it is not
    	var n1 = Math.abs(n),
        n2 = parseInt(n, 10);
    	var isNatural = !isNaN(n1) && n2 === n1 && n1.toString() === n;
    	// console.log("es natural??: "+isNatural);
    	return isNatural;
	}

	p.isChecked = function(p_obj){
		var data;
		if(p_obj.element_type == "radio"){
			data = this.obtenerValorClass.radio(p_obj);
		}
		else if(p_obj.element_type == "checkbox"){
    		data = this.obtenerValorClass.checkbox(p_obj);
		}
		if(typeof data === 'undefined'){
			return false;
		}
		return true;
	}
	p.isWord = function(p_obj){
		var str;
		if(p_obj.element_type == "input"){
    		str = this.obtenerValorClass.input(p_obj);
		}
		str = str.replace(/\W/g,'');
		// console.log(str);
		var isW = /^[a-zA-Z]+$/.test(str);
		if(isW){
			// console.log("es solo palabras");
			return true;
		}
		// console.log("no es palabra");
		return false;
	}

	p.isNotEmpty = function(p_obj){
		var str = "";
		if(p_obj.element_type == "input"){
    		str = this.obtenerValorClass.input(p_obj);
		}
		str = str.replace(/\W/g,'');
		if(str!==undefined && str!==""){
			// console.log("si existe algo dentro del campo");
			return true;
		}
		// console.log("no existe nada dentro del campo")
		return false
	}


	return new ValidarCampos({
		obtenerValorClass : ObtenerValorCampos
	});
})(window, undefined);