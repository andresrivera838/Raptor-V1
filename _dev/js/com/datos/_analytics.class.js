
var Analytics = (function(window, undefined){
	function AnalyticsEvents() {
		/**
		* Esta propiedad determina si se envía o no el evento (false significa en produccion).
		* @property {Boolean} sandBox
		*/
		this.sandBox = false; 
		/**
		* Esta propiedad determina si se envía o no el evento (true significa Universal Analytics).
		* @property {Boolean} universal
		*/
		this.universal = true; 
	}
	var _ = AnalyticsEvents.prototype;
	/**
	* Este método envia un evento de Google Analytics.
	* Ejemplo de uso para Universal Analytics
	* Analytics.push({'method' : 'send', 'type': 'event' ,'category' : 'PrehomeMobile', 'action' : 'click', 'label' : 'Mobile'});
	*
	* @method push
	*
	* @param {Object} p_obj Objeto con información para la enviar el evento.
	* @param {String} p_obj.method String con el metodo a usar de Analytics, por ejemplo '_trackPageview' para el clasico o 'send' para el Universal, entre otros. Obligatorio: Sí
	* @param {String} p_obj.type String con el tipo de visita a usar de Analytics, por ejemplo 'event', 'social', 'timing' para el Universal. Obligatorio: Sí
	* @param {String} p_obj.category String Normalmente, es el objeto con el que se ha interactuado (por ejemplo, un botón). Obligatorio: Sí
	* @param {String} p_obj.action String Representa el tipo de interacción (por ejemplo, un clic). Obligatorio: Sí
	* @param {String} p_obj.label String Resulta útil para la clasificación de eventos (por ejemplo, botones de navegación). Obligatorio: NO
	* @param {String} p_obj.value String Los valores no deben ser negativos. Resulta útil para pasar recuentos (por ejemplo, cuatro veces). Obligatorio: No
	*/
	_.push = function(p_obj) {
	 	if(!this.sandBox) {
        	if(this.universal){
        		ga && ga(p_obj['method'], p_obj['type'], p_obj['category'], p_obj['action'] , p_obj['label'] || '', p_obj['value'] || 0); //analytics.js (Universal Analytics)
        	}
        	else{
        		var a = [p_obj['method'], p_obj['category'], p_obj['action'], p_obj['label'] || '', p_obj['value'] || 0];
        		_gaq && _gaq.push( a ); // classic ga.js no se ha probado
        	}
	 	}
	 	else {
	 		console.log(p_obj);
	 	}
	}
	/**
	* Este método cambia el valor de la propiedad "sandBox", determinando
	* si se envía o no el evento 
	* @method setSandbox
	*
	* @param {Boolean} p_bool Bandera para cambiar el modo a producción o desarrollo  
	* determinando si se envía o no el evento (false significa en produccion)
	*
	*/
	_.setSandbox = function(p_bool) {
		this.sandBox = p_bool;
	}

	/**
	* Este método cambia el valor de la propiedad "universal", determinando
	* si se usa Universal Analytics o se usa el clasico
	* @method setUniversal
	*
	* @param {Boolean} p_bool Bandera para cambiar el tipo de Analytics (true significa Universal Analytics)
	*
	*/
	_.setUniversal = function(p_bool) {
		this.universal = p_bool;
	}

	return new AnalyticsEvents();
})(window, undefined);