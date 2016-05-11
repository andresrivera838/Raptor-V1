var Formulario = function()
{
	ConstantesAPP.usuario = new Cliente(); 
	this.init();
	this.variables();
	this.eventos();	
}
Formulario.prototype.init = function(){
	Formulario.setPlaceholders();
}
Formulario.prototype.variables = function(){
	this.tiempo = 6000;
	this.boton_enviar_login = $(".ingresabox-btniniciar");
	this.boton_enviar_clave = $(".ingresabox-btningresar");
	this.boton_recordar = $(".ingresabox-recordar");
	this.boton_nuevo_registro = $(".ingresabox-btnnuevo");
	this.usuario = $(".cliente_usuario");
	this.clave = $(".cliente_clave");
	this.clave_empaque = $(".cliente_clave_empaque");
	this.clave_global = $("#cliente_clave_global");
}
Formulario.prototype.eventos = function(){
	this.boton_enviar_login.click($.proxy(this.validarLogeo,this));
	this.boton_enviar_clave.click($.proxy(this.validarClave,this));	
	this.boton_recordar.click(function(){
		Navegacion.getURL({
			url:ConstantesAPP.url_olvide_clave,
			target:Navegacion._BLANK,
			callback:function()
			{
				Estadisticas.clic({trigger:ConstantesEstadisticas.SECCION_INGRESO_CLAVES,
                        event:ConstantesEstadisticas.EVENTO_CLIC,
                        seccion:ConstantesEstadisticas.TRIGGER_INGRESAR_CLAVES,
                        sufijo:ConstantesAPP.SUFIJO});
			}
		});
	});
	this.boton_nuevo_registro.click(function(){
		Navegacion.getURL({
			url:ConstantesAPP.url_nuevo_registro,
			target:Navegacion._BLANK,
			callback:function()
			{
				Estadisticas.clic({trigger:ConstantesEstadisticas.SECCION_NUEVO_REGISTRO,
                        event:ConstantesEstadisticas.EVENTO_CLIC,
                        seccion:ConstantesEstadisticas.TRIGGER_INGRESAR_CLAVES,
                        sufijo:ConstantesAPP.SUFIJO});
			}
		});
	});
	if(Constantes_DISPOSITIVOS.ANCHO_ACTUAL <= Constantes_DISPOSITIVOS.ANCHO_TABLET)
	{
		this.boton_recordar.hide();
		this.boton_nuevo_registro.hide();
	}
	/*this.boton_enviar_clave.hide();*/
}
Formulario.prototype.cambiar = function(ref)
{
	/*
	this.cambiar(this.usuario);	
	this.cambiar(this.clave);	
	this.cambiar(this.clave_empaque);
	var change_temp = "";
	ref.bind('keydown keyup',{obj:ref},function(e){
	    if(e.type == "keydown"){
	        change_temp = $(this).val();
	        return;
	    }
	    if($(this).val() != change_temp){
	        // add the code to on change here 
	        ref.val($(this).val());
	    }

	});*/
}
Formulario.prototype.validarClave = function(e){	
	var valClave = "";

	for(var i = 0; i< this.clave_empaque.length; i ++) {
		if(this.clave_empaque[i].value != "") {
			valClave = this.clave_empaque[i].value;
			break;
		}
	}
	
	if(valClave!="")
	{
		$('body').on(ConstantesAPP.EVENTO_RESETEAR_CLAVE,{ref:this.clave_empaque}, function(e){			
			e.data.ref.val("");
		});		
		ConstantesAPP.usuario.clave({
			clave:this.clave_empaque.val()		
		});
		Estadisticas.clic({trigger:ConstantesEstadisticas.SECCION_INGRESO_CLAVES,
                event:ConstantesEstadisticas.EVENTO_CLIC,
                seccion:ConstantesEstadisticas.TRIGGER_INGRESAR_CLAVES,
                sufijo:ConstantesAPP.SUFIJO});			
	}
	else
	{
		
		if(Constantes_DISPOSITIVOS.ANCHO_ACTUAL>Constantes_DISPOSITIVOS.ANCHO_TABLET)
		{
			ConstantesAPP.lightbox.abrir({
                seccion:ConstantesAPP.MENSAJE_ERROR,
                callback:function()
                {                	
                	$(ConstantesAPP.MENSAJE_ERROR).find(".Texto").html(ConstantesMensajes.CLAVE_ERRONEA);
                }
            });
		}
		else if(Constantes_DISPOSITIVOS.ANCHO_ACTUAL <= Constantes_DISPOSITIVOS.ANCHO_TABLET)
		{
			this.clave_empaque.addClass("borde_error");
			setTimeout(function(){
				this.clave_empaque.removeClass("borde_error");
				$(ConstantesAPP.MENSAJE_ERROR_CLAVE).slideUp();
			},this.tiempo);	
			$(ConstantesAPP.MENSAJE_ERROR_CLAVE).slideDown();
			$(ConstantesAPP.MENSAJE_ERROR_CLAVE).html(ConstantesMensajes.CLAVE_ERRONEA);
		}
	}
}
Formulario.prototype.validarLogeo = function(e){
	var valUsr = "";
	var valPws = "";

	for(var i = 0; i< this.usuario.length; i ++) {
		if(this.usuario[i].value != "") {
			valUsr = this.usuario[i].value;
			break;
		}
	}
	for(var i = 0; i< this.clave.length; i ++) {
		if(this.clave[i].value != "") {
			valPws = this.clave[i].value;
			break;
		}
	}
	if(valUsr != "" && valPws != "")
	{	
		ConstantesAPP.usuario.auth({
			u:valUsr,
			p:valPws,
			callback:$.proxy(function()
			{	
				$(ConstantesAPP.FORMULARIOS).hide();						
            	$(ConstantesAPP.FORMULARIO_CLAVES).fadeIn();            	
				Estadisticas.clic({trigger:ConstantesEstadisticas.SECCION_INICIAR_SESION,
                        event:ConstantesEstadisticas.EVENTO_CLIC,
                        seccion:ConstantesEstadisticas.TRIGGER_FORMULARIO_LOGIN,
                        sufijo:ConstantesAPP.SUFIJO});			
			},this)/*,
			error:function()
			{

			}*/
		});
		//this.usuario.val("");
		//this.clave.val("");
	}
	else
	{
		if(Constantes_DISPOSITIVOS.ANCHO_ACTUAL>Constantes_DISPOSITIVOS.ANCHO_TABLET)
		{
			ConstantesAPP.lightbox.abrir({
                seccion:ConstantesAPP.MENSAJE_ERROR,
                callback:function()
                {                	
                	$(ConstantesAPP.MENSAJE_ERROR).find(".Texto").html(ConstantesMensajes.CONTRASENA_ERRONEA);
                }
            });
		}else if(Constantes_DISPOSITIVOS.ANCHO_ACTUAL <= Constantes_DISPOSITIVOS.ANCHO_TABLET)
		{
			this.usuario.addClass("borde_error");
			this.clave.addClass("borde_error");
			setTimeout($.proxy(function(){
				this.usuario.removeClass("borde_error");
				this.clave.removeClass("borde_error");
				$(ConstantesAPP.MENSAJE_ERROR_LOGIN).slideUp();
			}, this),this.tiempo);
			$(ConstantesAPP.MENSAJE_ERROR_LOGIN).slideDown();
			$(ConstantesAPP.MENSAJE_ERROR_LOGIN).html(ConstantesMensajes.CONTRASENA_ERRONEA);
		}
	}
}
Formulario.setPlaceholders = function(){
   // $('input, textarea').placeholder();
	// console.log("Se ponen los placeholders con clase");
}