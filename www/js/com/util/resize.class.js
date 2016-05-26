	/**
	* Esta clase permite agregar un <i>"callback"</i> 
	* para que se ejecute cuando la ventana del navegador cambia de dimensiones,
	* incluso permite obtener sus valores o detectar si un dispositivo móvil cambió de orientación.
	* @class Resize
	* @constructor
	*/

	var Resize = function()
	{	
		/**
		* Esta propiedad contiene el valor actual del ancho de la pantalla del navegador.
		* @property {Int} _windowidth
		*/
		this._windowidth = 0;
		/**
		* Esta propiedad contiene el valor actual del alto de la pantalla del navegador.
		* @property {Int} _windowHeight
		*/
		this._windowHeight = 0;
		/**
		* Esta bandera habilita o deshabilita el <i>"callback"</i> configurado.
		* @property {Boolean} _resizeEventEnabled
		*/
		this._resizeEventEnabled = false;
		this.setValues();
	}


	/**
	* Este método obtiene el valor actual del ancho y alto de la ventana del navegador
	* @method setValues
	*
	*/
	Resize.prototype.setValues=function(){
		this._windowWidth=window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

		this._windowHeight=window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;
	}

	/**
	* Este método agrega un <i>"callback"</i> 
	* para que se ejecute cuando la ventana del navegador cambia de dimensiones.
	* @method onChange
	* @param {function} param_callback Evento que se ejecutará cuando la ventana del navegador cambia de dimensiones.
	*
	*/
	Resize.prototype.onChange = function (param_callback){
		var me=this;
		this._resizeEventEnabled=true;
		window.addEventListener("resize", function(){
			me.setValues();
			if(me._resizeEventEnabled)
			{
				param_callback();
			}	
		});
		param_callback();//Para asignar las dimensiones iniciales previas al resize	
	}
	/**
	* Este método obtiene el valor actual del ancho de la ventana del navegador.
	* @method getWidth
	* @return {Int} Retorna el valor actual del ancho de la ventana del navegador.
	*
	*/
	Resize.prototype.getWidth = function (){
		return this._windowWidth;
	}

	/**
	* Este método obtiene el valor actual del alto de la ventana del navegador.
	* @method getHeight
	* @return {Int} Retorna el valor actual del alto de la ventana del navegador.
	*
	*/
	Resize.prototype.getHeight = function (){
		return this._windowHeight;
	}
	/**
	* Este método obtiene el valor actual del ancho y del alto de la ventana del navegador.
	* @method getDimensions
	* @return {Object} obj Retorna un objeto que contiene el valor actual 
	* del ancho (obj.width) y del alto (obj.height) de la ventana del navegador.
	*
	*/
	Resize.prototype.getDimensions = function(){
		return {width:this._windowWidth, height:this._windowHeight};
	}

	/**
	* Este método deshabilita el <i>"callback"</i> que se ejecute cuando la ventana del navegador cambia de dimensiones.
	* @method disableOnChange
	*
	*/
	Resize.prototype.disableOnChange = function(){
		// console.log("disable on change");
		this._resizeEventEnabled=false;
	}

	/**
	* Este método agrega un <i>"callback"</i> 
	* para que se ejecute cuando cambia la orientación en un dispositivo móvil.
	* @method orientationChangeEvent
	* @param {function} callback Evento que se ejecutará cuando cambie la orientación de un dispositivo móvil.
	*
	*/
	Resize.prototype.orientationChangeEvent = function(callback){
		var me = this;
		window.addEventListener("orientationchange", function() {
			me.setValues();
			callback();;
		}, false);
	}