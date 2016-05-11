var SectionClass  = (function(window, undefined) {
	"use strict";
	function SectionClass(p_obj) {
		this.url = p_obj.url;
		this.name = p_obj.name;
		this.id = p_obj.id || "";
		this.common = p_obj.common || "";
		this.persistenceCallback = null;
		this.mode = p_obj.mode || "ajax";
	}

	var p = SectionClass.prototype;

	p.load = function(p_obj) {
		if(this.mode === "ajax") {
			$(p_obj.target).load(this.url, this.onLoadedCallback.bind(this)).hide().fadeIn();
		}
		else {
			$(this.common).hide();
			$(this.id).fadeIn(this.onLoadedCallback.bind(this));	
		}
	
	};
	p.onLoadedCallback = function(p_obj) {
		p_obj && p_obj.callback && p_obj.callback();
		this.persistenceCallback && this.persistenceCallback();
	};

	p.setShowed = function(p_state) {
		this.showed = p_state;
	};
	return SectionClass;
})(window, undefined);