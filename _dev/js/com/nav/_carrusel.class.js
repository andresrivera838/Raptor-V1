var CarruselClass = (function(window, undefined){
	"use strict";
	var ref = {};
	var prefixes =['MozTransition',
					'webkitTransition',
					'KhtmlTransition', 
					'OTransition', 
					'msTransition',
					'transition'];

	var resizeObserver = function() {
		window.addEventListener("resize", function(){
			for(var i in ref) {
				ref[i].settings.responsive && ref[i].update();
			}
		});
	}
	function Carrusel(p_obj) {

		this.index = 0;
		this.imgPath = p_obj.imgPath || "img/";
		this.parentCarrusel = p_obj.parentCarrusel;
		this.itemContainerName = p_obj.itemContainer.substr(1, p_obj.itemContainer.length)
		this.transitionTime = p_obj.transitionTime || 0.5;
		this.onTweenEnded = p_obj.onTweenEnded;
		this._tweening = false;
		this.loopTime = p_obj.loopTime || 5000;
		p_obj.imgs? this.build(p_obj.imgs): null;
		this.circular = p_obj.settings.circular;

		this.settings = {
			name: p_obj.name,
			responsive: p_obj.settings.responsive || false,
			swipe: p_obj.settings.swipe,
			loop: p_obj.settings.loop
		};

		this.init(p_obj);
		this.setup();
		ref[p_obj.settings.name] = this;
	}

	var _ = Carrusel.prototype;
		_.init =  function (p_obj) {
			this.itemContainer = document.querySelector(this.parentCarrusel + " " + p_obj.itemContainer);
			this.btnLeft = document.querySelector(p_obj.btnLeft);
			this.btnRight = document.querySelector(p_obj.btnRight);
			this.length = this.itemContainer.children.length;
			this.step = this.itemContainer.offsetWidth;
			
			if(this.settings.responsive) {
				resizeObserver();
			}
			if(this.settings.swipe) {
				this.swipeEvent();
			}
			this.settings.loop && this._setLoop();



		}
		_.setup =  function() {
			this._event();
			this.itemContainer.style.width = this.length * this.step + "px";
			// this.whichTween();
		}
		_.whichTween = function() {
			var tran = this.hasTransition();
			if(!this.hasTransition()){
				this._css(this.itemContainer, tran, "0.5s all ease");
				this.itemContainer.addEventListener( "transitionend", 
					this._circularEdgeCb.bind(this)
				   , false );
			}
		}

		_.hasTransition = function() {
 
			var tmp = document.body || document.documentElement;
			var result = "";
		 	
		 	prefixes.forEach(
		 		function(el, i, array){
		 			if (typeof tmp.style[el] == 'string'){
			      		result = el;
			   		}			
		 		});

		 	return result;
		}
		_.goTo =  function(p_index) {
			var index;
			index = p_index - 1;
			if((index < 0) || (index > (this.length - 1)) || (this.index === index)) {
				return;
			}
			this.index = index;
			this._tween();
		}

		_.goToLast = function(){
			this.goTo(this.length);
		}
		_.getCurrentSlide = function(){
			return this.index+1;
		}

		_.swipeEvent = function() {
			var hammertime = new Hammer(document.querySelector(this.parentCarrusel), {});
			hammertime.on('swipeleft', this._btnclickRight.bind(this));
			hammertime.on('swiperight', this._btnclickLeft.bind(this));
	
			// Hammer(document.querySelector(this.parentCarrusel)).on("swipe dragend", this.swipeHandle.bind(this));
		}
		_.swipeHandle = function(evt) {
			if(evt.gesture.direction == "left") {
				this._btnclickRight(evt);
			}
			else if(evt.gesture.direction == "right") {
				this._btnclickLeft(evt);
			}

		}
		_.updateTo =  function(p_str) {
			//*
			var target,
				length;

			target = document.querySelectorAll(p_str);
			this.firstChild = target[0];
			length = target.length;
			this.lastChild = target[length- 1]

			this._css(this.itemContainer.children, "display", "none")
			this._css(target, "display","block")
			this.length = length;
			this.index = 0;

			this.step = document.querySelector(this.parentCarrusel).offsetWidth;//this.itemContainer.offsetWidth;
			this.itemContainer.style.width = this.length * this.step + "px";
			setTimeout(this._tween.bind(this), 20)
			//*/
		}
		_.update =  function() {
			this.length = this.itemContainer.children.length;
			this.step = document.querySelector(this.parentCarrusel).offsetWidth;//this.itemContainer.offsetWidth;
			console.log(document.querySelector(this.parentCarrusel));
			this.itemContainer.style.width = this.length * this.step + "px";
			this._css(this.itemContainer, "marginLeft", (- this.step * this.index) + "px");
			// setTimeout(this._tween.bind(this), 20);
		}
		_.buildItemContainer = function() {
			var div,
				item,
				parent,
				itemTemplate;

			parent = document.querySelector(this.parentCarrusel);

			div = document.createElement("DIV");	
			div.id = this.itemContainerName;
			this._css(div, "width", parent.offsetWidth + "px")
 			itemTemplate = document.createElement("DIV");

 			this._css(itemTemplate, "position", "relative");
			this._css(itemTemplate, "float", "left");
			this._css(itemTemplate, "width", parent.offsetWidth + "px");
			this._css(itemTemplate, "height", parent.offsetHeight +"px");
			return itemTemplate;

		}
		_.build =  function(p_imgs) {
			var div,
				item,
				parent,
				itemTemplate;

			parent = document.querySelector(this.parentCarrusel);

			div = document.createElement("DIV");	
			div.id = this.itemContainerName;
			this._css(div, "width", parent.offsetWidth + "px")
			itemTemplate = this.buildItemContainer();
			for(var i in p_imgs) {
				item = itemTemplate.cloneNode(true);
				this._css(item, "backgroundImage", "url(" + this.	imgPath + p_imgs[i] + ")");
				div.appendChild(item);
			}
			parent.appendChild(div);
		}
		//privados
		
		_._event =  function() {
			this.btnLeft && this.btnLeft.addEventListener("click", this._btnclickLeft.bind(this));
			this.btnRight && this.btnRight.addEventListener("click", this._btnclickRight.bind(this));
		}
		_._btnclickRight =  function(evt) {
			if(this._tweening) {
				return;
			}
			// this.index = this.index == (this.length - 1)? 0: this.index +1;
			if(this.circular) {
				this.index = this.index == (this.length - 1)? this.length: this.index +1;
				
			}else {
				this.index = this.index == (this.length - 1)? (this.length-1): this.index +1;
			}
			this._tween();
		}
		_._btnclickLeft = function(evt) {
			if(this._tweening) {
				return;
			}
			// this.index = this.index == 0? (this.length -1): this.index - 1;

			if(this.cirucular) {
				this.index = this.index == 0? 0:this.index - 1;
			}else {
				this.index = this.index == 0? -1: this.index - 1;
			}
			this._tween();
		};
		_._tween = function() {
			this._tweening = true;
			this._circularEdge();
			// this._css(this.itemContainer, "marginLeft", (- this.step * this.index) + "px");
			if((this.index == 0) && !this.circular) {
				this._css(this.btnLeft, "display", "none");
			}else {
				this._css(this.btnLeft, "display", "block");
			}

			if((this.index == (this.length -1)) && !this.circular) {
				this._css(this.btnRight, "display", "none");
			}else {
				this._css(this.btnRight, "display", "block");
			}


			if((this.index >=0) && (this.index < this.length)|| this.circular) {
				TweenLite.to(this.itemContainer, this.transitionTime, {marginLeft: - this.step * this.index, 
					onComplete:	this._circularEdgeCb.bind(this)
				
				});
			}
		};
		_._circularEdgeCb = function() {
			var element;

			if(this.index === this.length){
				this.index = 0;
				// element = this.itemContainer.firstElementChild;


				element = this.firstChild;
				this._css(this.itemContainer, "marginLeft", "0px");
			}else if(this.index === -1){
				this.index = this.length - 1;
				element = this.lastChild;
				// element = this.itemContainer.lastElementChild;
				this._css(this.itemContainer, "marginLeft", -(this.itemContainer.offsetWidth - this.step) + "px");
			}
			this._css(element, "left", "0px");
			this._tweening = false;
			this.onTweenEnded && this.onTweenEnded();
		}
		_._circularEdge = function() {
			var element;
			if(this.index === -1) {
				// element = this.itemContainer.lastElementChild;
				// this._css(this.btnRight, "display", "none");
				element = this.lastChild;
				this._css(element, "left", -this.itemContainer.offsetWidth  + "px");
			}else if (this.index === this.length){
				element = this.firstChild;
				// this._css(this.btnLeft, "display", "none");
				// element = this.itemContainer.firstElementChild;
				this._css(element, "left", this.itemContainer.offsetWidth  + "px");
			}
		}
		//utils
		_._css = function(p_target, p_css, p_val) {
			var target, 
				array; 
			if(!p_target) {
				return;
			}

			if (this._isNode(p_target)) {
				p_target.style[p_css] = p_val;
				return;
			}
			else if((typeof p_target === "object") && (typeof p_target.item === "function")) {
				target = p_target;
			}
			else {
				target = document.querySelectorAll(p_target);	
			}

			if(!target) {
				return;
			}
			array = Array.prototype.slice.call(target);

			array.forEach(function(el, i, a) {
				el.style[p_css] = p_val;
			});
		}
	  	_._isNode = typeof Node === 'object'? 
		 	function (object) { return object instanceof Node; }:
		 	function (object) {
	            return object && typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string';
	    }
	     _._setLoop = function() {

	     	clearInterval(this.loopId);
	     	this.loopId = setInterval(this._btnclickRight.bind(this), this.loopTime);
	    }
	

	return  Carrusel;	
})(window, undefined);

