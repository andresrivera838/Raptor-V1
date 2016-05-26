var Soap = (function(window, undefined){
	'use strict';
	var _,
		TEMPLATEHEAD,
		TEMPLATEFOOTER;

	TEMPLATEHEAD = 
				'<?xml version="1.0" encoding="utf-8"?>'+
					'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
  						'<soap:Body>';

  	TEMPLATEFOOTER = 
  					'</soap:Body>'+
				'</soap:Envelope>';


	function SOAPclass() {
		this._services = {};
	}

	_ = SOAPclass.prototype;

	_.register = function(p_obj) {
		this[p_obj.alias] = {};
		this[p_obj.alias].name = p_obj.name;
		this[p_obj.alias].body = this._buildBody(p_obj);
		this[p_obj.alias].url = p_obj.url;

		this[p_obj.alias] = (function(ctx, _flag){
			var args = arguments[1];
			var tmp = this.body;
			var rp;
			for(var i in args) {
				tmp = tmp.replace('#' + i.toUpperCase(), args[i]);
			}
			rp = ctx.request(tmp, this.url)['soap:Envelope']['soap:Body'][this.name + 'Response'][this.name + 'Result']['#text'];
			rp = String(rp).replace('"NombreApellidoUsuario",', '"NombreApellidoUsuario"');
			return JSON.parse(rp);
		}).bind(this[p_obj.alias], this);

	};
	_._buildBody = function(p_obj) {
		var temp = '';
		temp = '<' + p_obj.name + ' xmlns="http://tempuri.org/">';
		p_obj.params.forEach(function(el, i, a){
			temp += '<' + el + '>#'+el.toUpperCase()+'</' + el + '>';
		});
		temp += '</' + p_obj.name + '>';


		temp = TEMPLATEHEAD + temp + TEMPLATEFOOTER;
		
		return temp;
	};
	_.request = function(p_request, p_url) {
        var xmlhttp = null;
        if (window.XMLHttpRequest)
            xmlhttp = new XMLHttpRequest();
        else if (window.ActiveXObject) {
            if (new ActiveXObject("Microsoft.XMLHTTP"))
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            else
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        }

        xmlhttp.open('POST', p_url, false);

        // Send the POST request
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send(p_request);
        var responseText = xmlhttp.responseXML;
        return xmlToJson(responseText);

    };

	return new SOAPclass();
})(window, undefined);

