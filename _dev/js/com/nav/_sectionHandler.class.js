var SectionHandler = (function(window, undefined) { 
	"use strict";
	function SectionHandlerClass(p_obj) {
		this.sections = {};
		this.currentSection = "";
		this.target = "";
		this.mode = p_obj.mode || "ajax";

	}

	var p = SectionHandlerClass.prototype;

	p.addSections = function(p_sections) {
        this.currentSection = p_sections[0].name;
		p_sections.forEach(function(el, i, array){
			SectionHandler.sections[el.name] = new SectionClass(el);
		});
	}

	p.load = function(p_name, p_callback) {
		if(this.currentSection == p_name) {
			return;
		}
		this.currentSection = p_name
		this.sections[p_name] && this.sections[p_name].load({target:this.target, callback: p_callback});

	}
	p.sectionLoaded = function(p_name, p_callback) {
		// if(this.sections[p_name]) {
			
			this.sections[p_name].onLoadedCallback = p_callback;
		// } 
	}

	p.sectionLoad = function(p_name, p_callback) {
		// if(this.sections[p_name]) {
			
			this.sections[p_name].onLoadCallback = p_callback;
		// } 
	}
	return new SectionHandlerClass({
		mode: "local"
	});
})(window, undefined);