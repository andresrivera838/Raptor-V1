/**
* Esta clase permite obtener las URLs y sus parámetros, hacer redirecciones, recargar la página.
*
* @class URL_Class
* @constructor
*/

var URL_Class={
	/**
	* Esta propiedad contiene la url del iframe hijo.
	* @property {String} iframeURL
	*/
		iframeURL: null,
	/**
	* Esta propiedad contiene la url del padre del iframe.
	* @property {String} parentURL
	*/
		parentURL: null,
	}

	/**
	* Este método obtiene la url del iframe actual.
	* @method getIframeUrl
	* @return {String} Retorna la url del iframe actual.
	*
	*/
	URL_Class.getIframeUrl = function(){
		this.iframeURL = window.location.href ;
		return this.iframeURL;
	}
	/**
	* Este método obtiene la url del padre del iframe actual.
	* @method getParentUrl
	* @return {String} Retorna la url del padre del iframe actual.
	*
	*/
	URL_Class.getParentUrl = function(){
		this.parentURL = window.parent.location.href;
		return this.parentURL;
	}

	/**
	* Este método obtiene un parámetro de la url del iframe actual.
	* @method getIframeUrlParameter
	* @param {String} name Nombre del parámetro a obtener de la url del iframe actual
	* @return {String} Retorna "" si no se encontró el parámetro, 
	* de lo contrario retorna el valor de dicho parámetro.
	*
	*/
	URL_Class.getIframeUrlParameter = function(name){
		var url=this.getIframeUrl();
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  	var regexS = "[\\?&]"+name+"=([^&#]*)";
	  	var regex = new RegExp( regexS );
	  	var results = regex.exec(url);
	  	if( results == null )
	  	{
	    	return "";
	  	}
	  	else{
	    	return results[1];
	  	}
	}

	/**
	* Este método obtiene un parámetro de la url del padre del iframe actual.
	* @method getParentUrlParameter
	* @param {String} name Nombre del parámetro a obtener de la url del padre del iframe actual
	* @return {String} Retorna "" si no se encontró el parámetro, 
	* de lo contrario retorna el valor de dicho parámetro.
	*
	*/
	URL_Class.getParentUrlParameter = function(name){
		var url=this.getParentUrl();
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  	var regexS = "[\\?&]"+name+"=([^&#]*)";
	  	var regex = new RegExp( regexS );
	  	var results = regex.exec(url);
	  	if( results == null )
	  	{
	    	return "";
	  	}
	  	else{
	    	return results[1];
	  	}
	}

	/**
	* Este método redirecciona el iframe actual a una ruta determinada.
	* @method redirectIframeTo
	* @param {String} param_url Ruta absoluta a donde debe redireccionarse el iframe actual.
	*
	*/
	URL_Class.redirectIframeTo=function(param_url){
		window.location.href=param_url;
	}

	/**
	* Este método redirecciona el padre del iframe actual a una ruta determinada.
	* @method redirectParentTo
	* @param {String} param_url Ruta absoluta a donde debe redireccionarse el padre del iframe actual.
	*
	*/
	URL_Class.redirectParentTo=function(param_url){
		window.parent.location.href=param_url;
	}

	/**
	* Este método redirecciona la página actual a una ruta determinada.
	* @method redirectPageTo
	* @param {String} param_url Ruta absoluta a donde debe redireccionarse la página actual.
	*
	*/
	URL_Class.redirectPageTo=function(param_url){
		window.location.href=param_url;
	}

	URL_Class.newPage=function(param_url){
		window.open(param_url, '_blank');
	}

	/**
	* Este método redirecciona el padre del iframe actual a una ruta relativa.
	* @method relativeRedirectParent
	* @param {String} param_url Ruta relativa a donde debe redireccionarse el padre del iframe actual.
	*
	*/
	URL_Class.relativeRedirectParent=function(param_path){
		window.parent.location.href=param_path;
	}

	/**
	* Este método obtiene la raíz de la ruta de la página actual.
	* @method getRootWebSitePath
	* @return {String} Retorna el nombre de la raíz de la ruta de la página actual.
	*
	*/
	URL_Class.getRootWebSitePath=function()
	{
	    var _location = document.location.toString();
	    var applicationNameIndex = _location.indexOf('/', _location.indexOf('://') + 3);
	    var applicationName = _location.substring(0, applicationNameIndex) + '/';
	    var webFolderIndex = _location.indexOf('/', _location.indexOf(applicationName) + applicationName.length);
	    var webFolderFullPath = _location.substring(0, webFolderIndex);

	    return webFolderFullPath;
	}

	/**
	* Este método redirecciona la página actual a la raíz de la página actual.
	* @method goToRoot
	*
	*/
	URL_Class.goToRoot=function(){
		window.location.href= location.protocol+ '//' +window.location.host;
	}

	/**
	* Este método recarga la página actual.
	* @method reloadPage
	*
	*/
	URL_Class.reloadPage=function(){
		var currentURL = location.protocol + '//' + location.host + location.pathname;
		this.redirectPageTo(currentURL);
	}