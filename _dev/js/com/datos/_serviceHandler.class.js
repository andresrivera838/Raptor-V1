var ServicesHandler = (function() {
	function ServicesHandler() {
		this.pathURL = "";
		this.ctx = "";
		this.POST = "POST";
		this.GET = "GET";
		this.JSON = 'json'; 
		this.persistenceCallback = null;
		
	}

	var p = ServicesHandler.prototype;

	p.setup = function(p_obj) {
		this.pathURL = p_obj.pathURL;
		this.ctx = p_obj.ctx;
	}
	p.consumirServicio = function(p_obj) {
		$.ajax(p_obj.request).fail(p_obj.failCallback).success(
			(function(response) {
				this.persistenceCallback && this.persistenceCallback(response)
				p_obj.successCallback && p_obj.successCallback(response)
			}).bind(this));
	}

	p.post = function(p_obj) {
		this.consumirServicio({
			request: {
				type: this.POST,
		        url: this.pathURL + this.ctx + p_obj.servicio,
				dataType: this.JSON,
				data: p_obj.parametros,
			},
			/**/
			failCallback:p_obj.failCallback,
			successCallback: p_obj.successCallback		
		});
	}
	p.get = function(p_obj) {
		this.consumirServicio({
			request: {
				type: this.GET,
		        url: this.pathURL + this.ctx + p_obj.servicio,
				dataType: this.JSON,
				data: p_obj.parametros,
			},
			/**/
			failCallback: p_obj.failCallback,
			successCallback: p_obj.successCallback		
		});
	}



	return ServicesHandler;
})();
