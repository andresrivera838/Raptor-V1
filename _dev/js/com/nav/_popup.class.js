/**
* La clase 'Popup' por Juan Camilo Yepes,
* permite usar ventanas emergentes
* @class Popup
*
* @param {Object} p_obj Objeto con información para inicializar el popup (Obligatorio)
* @param {Object} p_obj.openBtn Esta propiedad almacena el elemento que ejecutara el evento de abrir el popup al seleccionarlo (Opcional)
* @param {Object} p_obj.closeBtn Esta propiedad almacena el elemento que ejecutara el evento de cerrar el popup al seleccionarlo (Opcional)
* @param {String} p_obj.popupWrapId Esta propiedad almacena el id del contenedor principal del popup (Obligatorio)
* @param {Object} p_obj.mainWrap Esta propiedad almacena el contenedor principal de la web app (Obligatorio)
* @param {Function} p_obj.onOpen Esta funcion de callback se llama cuando el popup se termine de abrir (Opcional)
* @param {Function} p_obj.onClose Esta funcion de callback se llama cuando el popup se termine de cerrar (Opcional)
* @param {Function} p_obj.beforeOpen Esta funcion de callback se llama antes que el popup se abra (Opcional)
* @param {Function} p_obj.beforeClose Esta funcion de callback se llama antes que el popup se cierre (Opcional)
*
*
* @constructor
*/
var Popup = (function(window, $, undefined){
	"use strict";

	function PopupClass(p_obj) {
		this.init(p_obj);
		return this;
	}
	var _ = PopupClass.prototype;
	_.init =  function (p_obj) {
		/**
		* Esta propiedad almacena el elemento que ejecutara el evento de abrir el popup al seleccionarlo (Opcional)
		* @property {Object} openBtn
		*/
		this.openBtn = '';
		/**
		* Esta propiedad almacena el elemento que ejecutara el evento de cerrar el popup al seleccionarlo (Opcional)
		* @property {Object} closeBtn
		*/
		this.closeBtn = '';
		this.p_obj = p_obj;
		/**
		* Esta propiedad almacena el id del contenedor principal del popup (Obligatorio)
		* @property {String} popupWrapId
		*/
		this.popupWrapId = $("#" + p_obj.popupWrapId);
		/**
		* Esta propiedad almacena el contenedor principal de la web app (Obligatorio)
		* @property {Object} mainWrap
		*/
		this.mainWrap = p_obj.mainWrap;
		/**
		* Esta funcion de callback se llama cuando el popup se termine de abrir (Opcional)
		* @property {Function} onOpen
		*/
        this.onOpen = p_obj.onOpen;
        /**
		* Esta funcion de callback se llama cuando el popup se termine de cerrar (Opcional)
		* @property {Function} onClose
		*/
		this.onClose = p_obj.onClose;
		/**
		* Esta funcion de callback se llama antes que el popup se abra (Opcional)
		* @property {Function} beforeOpen
		*/
        this.beforeOpen = p_obj.beforeOpen;
        /**
		* Esta funcion de callback se llama antes que el popup se cierre (Opcional)
		* @property {Function} beforeClose
		*/
        this.beforeClose = p_obj.beforeClose;

       




        this.isOpen = false;

		this._addResizeEvents();
		this._addEvents();
		return this;
	};
	_._addResizeEvents = function(){
			// console.log("_addResizeEvents");
		$(window).on("orientationchange",function(){
			this._calcResize({
				_w : $( document ).width(),
				_h : $( document ).height()
			});
		}.bind(this));

		$( window ).resize(function() {
			// console.log("resize");
			this._calcResize({
				_w : $( document ).width(),
				_h : $( document ).height()
			});
		}.bind(this));
	};

	_._addEvents = function(){
		if(this.p_obj.openBtn !== undefined && this.p_obj.openBtn !== '') {

			this.p_obj.openBtn.on('click',function(){
				this.open();
			}.bind(this));
		}

		if(this.p_obj.closeBtn !== undefined && this.p_obj.closeBtn !== '') {
			this.p_obj.closeBtn.on('click',function(){
				this.close();
			}.bind(this));
		}
	};

	_._calcResize = function(p_obj){
		if(this.isOpen){
			this.mainWrap.css('height', "auto");
			this.popupWrapId.css('height', "auto");
			var _h = parseInt(this.popupWrapId.css('height'),10);
			if(_h <= p_obj._h){
				_h = p_obj._h;
			}
			this.mainWrap.css('height', parseInt(_h, 10));
			this.popupWrapId.css('height', parseInt(_h, 10));
		}
	};

	/**
	* Este método aunque se llama automáticamente con el botón de abrir, 
	* también puede ser llamado para abrir el popup. Automáticamente calcula el 
	* cambio de dimensiones del navegador.
	* @method open
	*
	*/
	_.open = function(_open){
		this.isOpen = true;

		this.popupWrapId.fadeIn((function(){
            this.onOpen && this.onOpen();
            _open && _open();
        }).bind(this));
		this.beforeOpen && this.beforeOpen();
		
		this._calcResize({
			_w : $( document ).width(),
			_h : $( document ).height()
		});


	};

	/**
	* Este método aunque se llama automáticamente con el botón de cerrar, 
	* también puede ser llamado para cerrar el popup. Automáticamente calcula el 
	* cambio de dimensiones del navegador.
	* @method close
	*
	*/
	_.close = function(){
		this.isOpen = false;
		this.mainWrap.css('height','auto');
		this.beforeClose && this.beforeClose();
		this.popupWrapId.fadeOut((function(){
            this.onClose && this.onClose();
        }).bind(this));
	};

	

	return  PopupClass;	
})(window, window.jQuery);