var ObtenerValorCampos = (function(window, undefined){
	"use strict";
	function ObtenerValorCampos(p_obj) {

	}
	var p = ObtenerValorCampos.prototype;

	p.input = function(obj){
		if(obj.element){
			// console.log("input element:");	
			var value = obj.element.val();
			// console.log(value);
			return value;
		}
		else if(obj.name){
			// console.log("input name:")
			var value = $('input[name="'+obj.name+'"]').val();
			// console.log(value);
			return value;
		}
	}

	p.dropDown = function(obj){
		if(obj.element){
			// console.log("dropdown element:");	
			var value = obj.element.val();
			// console.log(value);
			return value;
		}
		else if(obj.name){
			// console.log("dropdown name:")
			var value = $('select[name="'+obj.name+'"]').val();
			// console.log(value);
			return value;
		}
	}

	p.radio = function(obj){
		// console.log("radio button:");	
		var value = $('input[name="'+obj.name+'"]:checked').val();
		// console.log(value);
		return value;
	}

	p.checkbox = function(obj){
		// console.log("radio button:");	
		var value = $('input[name="'+obj.name+'"]:checked').val();
		// console.log(value);
		return value;
	}

	return new ObtenerValorCampos({});
})(window, undefined);