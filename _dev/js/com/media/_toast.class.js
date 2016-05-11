/**
* La clase 'Toast' por Juan Camilo Yepes, feat. andres medina
* permite mostrar mensajes emergentes de exito, error e informativos
* @class Toast
*
* @param {Object} p_obj Objeto con información para inicializar el popup (Obligatorio)
* @param {String} p_obj.toastWrapId Esta propiedad almacena el id del contenedor principal de los toast
* @param {String} p_obj.messageWrap Esta propiedad almacena el id del contenedor donde se mostrara el mensaje
* @param {String} p_obj.closeBtn Esta propiedad almacena el id del contenedor que ejecuta el evento de cerrar al seleccionarlo
* @param {String} p_obj.onClose Esta funcion de callback se llama despues que el toast se cierre (Opcional)
*
* @constructor
*/
var Toast = (function(window, $){
	"use strict";

	var SLIDE_TIME;

	SLIDE_TIME = 500;

	function ToastClass(p_obj) {
		this.init(p_obj);
		return this;
	}
	var _ = ToastClass.prototype;
	_.init =  function (p_obj) {
		this.p_obj = p_obj;
		this.toastWrapId = $("#" + p_obj.toastWrapId);
		this.messageWrap = $("#" + p_obj.messageWrap);
		this.closeBtn = $("#" + p_obj.closeBtn);
		this.autoClose = p_obj.autoClose;
		this.onClose = p_obj.onClose;
		this.timeClose = p_obj.timeClose || 4500;
		this._addEvents();
		return this;
	};

	_._addEvents = function(){
		this.closeBtn.on('click', function(){
			this._hide();
			this.onClose && this.onClose();
		}.bind(this));
	};

	/**
	* Este método despliega un mensaje de exito
	* @param {String} p_message mensaje de exito
	* @method success
	*/
	_.success = function (p_message){
		this._show(p_message, 'success');
		return this;
	};

	/**
	* Este método despliega un mensaje de error
	* @param {String} p_message mensaje de error
	* @method error
	*/
	_.error = function (p_message){
		this._show(p_message, 'error');
		return this;
	};
	/**
	* Este método despliega un mensaje de info
	* @param {String} p_message mensaje de info
	* @method info
	*/
	_.info = function (p_message){
		this._show(p_message, 'info');
		return this;
	};


	_.confirm = function(p_message) {

	};

	/**
	* Este método despliega un mensaje de info
	* @param {String} p_message mensaje de info
	* @method info
	*/
	_.log = function ( p_message , p_method){
		var method = p_method || 'info';
		this._show(p_message, method);
		if(this.autoClose) {
			setTimeout(this._hide.bind(this), this.timeClose);
		}
		return this;
	};
	_._show = function(p_message, p_msgType) {
		this._hide();
		this.messageWrap.html(p_message);
		this.toastWrapId.addClass(p_msgType).fadeIn(SLIDE_TIME)
		// .css('top', window.scrollY);
	};

	_._hide = function () {
		this.messageWrap.html("");
		this.toastWrapId.removeClass("success");
		this.toastWrapId.removeClass("error");
		this.toastWrapId.removeClass("info").fadeOut(SLIDE_TIME);
		return this;
	};
	
	return  ToastClass;	
})(window, window.jQuery);
