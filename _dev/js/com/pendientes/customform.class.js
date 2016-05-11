var CustomForm = function(obj){
	this.views = [];
	this.current_view;	
	this.sucess_class = obj.sucess_class || "";
	this.error_class = obj.error_class || "";
	this.wrapper_validation = obj.wrapper_validation || null;
	this.wrapper_error_message = obj.wrapper_error_message || null;
	this.resize_error = (obj.resize_error==undefined)?true:obj.resize_error;
	this.dummy_data = (obj.dummy_data==undefined)?false:obj.dummy_data;
	this.validate_on_change = (obj.validate_on_change)?obj.validate_on_change:false;
	this.form = obj.form || null;
	this.hijos = "";
	this.hijos_count = 0;
	this.flagValidate = null;
	this.flagSubmit = null;
	$('body').bind(View.VALIDATE,$.proxy(this.updateView,this));

}
CustomForm.SERVICE = "util.php?cmd=";
CustomForm.CHECK_DOCUMENT = "validacc";
CustomForm.SUBMIT_URL = "add";
CustomForm.NEXT_VIEW = "next_view";
CustomForm.PREV_VIEW = "prev_view";
CustomForm.UPDATE_VIEW = "update_view";
CustomForm.MSG_LAST_VIEW = "you are in the last view";
CustomForm.MSG_FIRST_VIEW = "you are in the first view";
CustomForm.SUBMIT = "submit";
CustomForm.CUSTOM = "custom";
CustomForm.CHECK_EMAIL = "validamail";


//$('body').on('refreshTop10', $.proxy(this.requetTopTen,this));$('body').trigger('refreshTop10');
CustomForm.prototype.set = function(obj)
{
	if(obj.index)
	{
		if(this.current_view)
		{
			this.current_view.ref.fadeOut();
			this.current_view.removeListener(CustomForm.NEXT_VIEW);			
		}
		this.current_view = this.showView({index:obj.index});
		if(this.current_view)
		{
			this.current_view.ref.fadeIn();
			this.current_view.addListener(CustomForm.NEXT_VIEW);			
		}

		$("#btn_personales").removeClass("activo_personales");
		$("#btn_contacto").removeClass("activo_contacto");
		$("#btn_pequenin").removeClass("activo_pequenin");
		$("#btn_confirmacion").removeClass("activo_confirmacion");
		if((obj.index == 1) ) {
			$("#btn_personales").addClass("activo_personales");
		}
		else if((obj.index == 2) || (obj.index == 3)) {
			$("#btn_contacto").addClass("activo_contacto");
		}
		else if((obj.index == 4) || (obj.index == 5) || (obj.index == 6)) {
			$("#btn_pequenin").addClass("activo_pequenin");
		}
		else if((obj.index == 7) || (obj.index == 8) || (obj.index == 9)) {
			$("#btn_confirmacion").addClass("activo_confirmacion");
		}
	} 
}
CustomForm.prototype.checkEmail = function(obj){
	$.ajax({
	type: "POST",
	url: CustomForm.SERVICE + CustomForm.CHECK_EMAIL,
	data: {correo_usr:$(obj.ref).val()},
	dataType: "json"
	}).success($.proxy(function(data){
		Debug.toString(data);
		if(data.ERROR)
		{
			$("#lb_email_enviado").val($(obj.ref).val());
			$("#lightboxRegistro").fadeIn();
			$("#lightboxRegistro .btnCerrarLightboxRegistro").click(function(){
				SectionHandler.load("login");
				$("#lightboxYaTienes").fadeOut();
			});
			
		}
		else
		{
			this.updateView({
				obj:{
					error:false,
					next:true,
					backend:undefined
				}
			});
		}
	},this));
}
CustomForm.prototype.submit = function(obj){
	if(this.flagSubmit) {
		return;
	}
	
	var $data = this.form.serialize()+this.hijos;
	
	try
	{
		_gaq.push(['_trackEvent','actividad mundial','clic','finalizar registro']);
	}
	catch(e)
	{
		console.log(e);
	}
	
	this.flagSubmit = $.ajax({
	type: "POST",
	url: CustomForm.SERVICE + CustomForm.SUBMIT_URL,
	data: $data,
	dataType: "json"
	}).success($.proxy(function(data){
		this.flagSubmit = null;
		Debug.toString(data);
		if(!data.error)
		{
			this.set({index:9});
		}
		else
		{
			Debug.log("Error en los datos");
		}
	},this));
}
CustomForm.prototype.validateDocument = function(obj){
	if(this.flagValidate) {
		return;
	}
	
	this.flagValidate = $.ajax({
		type: "POST",
		url: CustomForm.SERVICE + CustomForm.CHECK_DOCUMENT,
		data: {identificacion_usr:$(obj.ref).val()},
		dataType: "json"
		}).success($.proxy(function(data){
			this.flagValidate = null;
			Debug.toString(data);
			if(data.ERROR)
			{
				$("#lb_email_enviado").val(data.Email);
				$("#lightboxRegistro").fadeIn().css("height", "96%");
				$("#lightboxRegistro .btnCerrarLightboxRegistro").click(function(){
					SectionHandler.load("login");
					$("#lightboxYaTienes").fadeOut();
				});
				
			}
			else
			{
				this.updateView({
					obj:{
						error:false,
						next:true,
						backend:undefined
					}
				});
			}
		},this));
}
CustomForm.prototype.init = function()
{

}
CustomForm.prototype.updateView = function(e)
{
	if(e)
	{	
		Debug.toString(e.obj);
		if(!e.obj.error)
		{
			if(!e.obj.backend)
			{
				if(e.obj.next == true)
				{
					if(this.current_view.index+1 <= this.views.length)//los indices empiezan en 1
					{			
						//console.log("index "+this.current_view.index+" -- tienePequenin "+tienePequenin);
						if(this.current_view.index==5 && !tienePequenin)//Si es embarazada, se suma dos en caso de no seleccionar tengo peque
						{
							this.set({index:this.current_view.index+2});		
						}	
						else
						{
							this.set({index:this.current_view.index+1});		
						}
					}
					else
					{
						Debug.log(CustomForm.MSG_LAST_VIEW);
					}
				}
				else if(e.obj.next == false)//hacia atras
				{
					if(this.current_view.index-1 >=0)
					{			
						this.set({index:this.current_view.index-1});		
					}
					else
					{
						Debug.log(CustomForm.MSG_FIRST_VIEW);
					}
				}else if(e.obj.next == CustomForm.CUSTOM)
				{
					this.set({index:e.obj.indexTo});		
				}
			}
			else{
				if(e.obj.backend.type == CustomForm.CHECK_DOCUMENT)
				{
					this.validateDocument(e.obj.backend);
				}
				if(e.obj.backend.type == CustomForm.CHECK_EMAIL)
				{
					this.checkEmail(e.obj.backend);
				}
				if(e.obj.backend.type == CustomForm.SUBMIT)
				{
					this.submit(e.obj.backend);
				}
			}
		}
		else
		{
			Debug.log("vista con errores");
		}
	}
}
CustomForm.prototype.addView = function(obj)
{	
	this.views.push(obj);
}
CustomForm.prototype.showView = function(obj){
	var view;
	for(var i in this.views)
	{
		view = this.views[i];
		if(view){
			if(view.index == obj.index)
			{
				return view;
			}
		}
	}
	return null;
}
CustomForm.prototype.nextView = function(id){
	$('body').trigger(CustomForm.NEXT_VIEW);
}
CustomForm.prototype.prevView = function(id){
	$('body').trigger(CustomForm.PREV_VIEW);
}