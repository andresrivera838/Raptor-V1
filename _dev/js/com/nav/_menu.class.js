var MenuClass = (function(window, undefined){
	"use strict";
	function MenuClass() {
		this.btn = [];
		this.currentBtn = '';
	}

	var p = MenuClass.prototype;

	p.addBtn = function(p_obj) {
		var fnc = p_obj.action;;
		p_obj.action = (function(){
			this.btnDeactivate();
			fnc();
		}).bind(this)
		this.btn.push(new ButtonClass(p_obj));
	};

	p.disableBtn = function(p_str) {
		var btn =this.getBtn(p_str)
		if(btn) {
			btn.disable = true;
		}
	}

	p.getBtn = function(p_name) {
		for(var i = 0; i < this.btn.length; i++){
	 		if(this.btn[i].name == p_name) {
	 			return this.btn[i];
	 		}
		}
		return null;
	}

	p.btnDeactivate = function() {
		this.btn.forEach(function(el, i, array) {
			el.deactivate();
		});
	};

	return MenuClass;
})(window, undefined);