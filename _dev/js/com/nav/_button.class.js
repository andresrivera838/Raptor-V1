var ButtonClass = (function(window, undefined){
	"use strict";
	function ButtonClass(p_obj) {
		this.name = p_obj.name || p_obj.selector.substr(1, p_obj.selector.length);
		this.selector = p_obj.selector;
		this.type = p_obj.type || "default";
		this.ref = $(this.selector);
		this.action = p_obj.action || null;
		this.activeClass = p_obj.activeClass || "";
		this.disable = p_obj.disable || false;;

		this.init();
	}

	var p = ButtonClass.prototype;
	p.init = function() {
		this.addEvent("click", (this._action.bind(this)));
	}

	p._action = function(evt) {
		if(!this.disable) {
			this.action(evt);
			this.active();
		}
	}
	p.active = function(){
		this.activeClass && this.ref.addClass(this.activeClass);
	}
	p.addEvent = function(p_type, p_callback) {
		if(!this.hayRef()) {
			this.updateRef();
		}
		this.rmEvent(p_type, p_callback);
		this.ref.bind(p_type, p_callback);
	}
	p.rmEvent = function(p_type, p_callback) {
		if(!this.hayRef()) {
			this.updateRef();
		}
		this.ref.unbind(p_type, p_callback)
	}
	p.updateRef = function(){
		this.ref = $(this.selector);
		if(!this.hayRef()) {
			throw "no existe referencia al selector en el boton: '" + this.name + "'";
		}
	}
	p.hayRef = function() {
		if(this.ref.length == 0) {
			return false;
		}
		return true;
	}

	p.deactivate = function() {
		this.activeClass && this.ref.removeClass(this.activeClass);
	}
	return ButtonClass;
})(window, undefined);