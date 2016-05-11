function FieldTemplate(obj) {
	this.view = obj.view || null;//Se necesita para saber las clases validadoras
	this.id = obj.id || null;
	this.name = obj.name || null;
	this.ref = obj.ref || null;
	this.type = obj.type || FieldTemplate.DEFAULT;
	this.required = (obj.required)?obj.required:false;
	this.error_message = obj.error_message || "";
	this.default_value = obj.default_value || "";
	this.read_only = (obj.read_only)?obj.read_only:false;
	this.refs = obj.refs || [];
	this.check_error = (obj.check_error)?obj.check_error:true;//Pendiente validacion error si no es requerido
	this.callback = obj.callback || undefined;
	this.callbackRedirect = obj.callbackRedirect || undefined;
	this.template = obj.template || undefined;
	this.names = obj.names || undefined;
	this._parent = obj._parent || undefined;
	if(this.view.custom_form.dummy_data)
	{
		this.dummyData(obj);
	}
	else
	{
		this.readOnly();
	}
	if(this.view.custom_form.validate_on_change)
	{
		if(this.ref)
		{
			
			if(this.type == FieldTemplate.SELECT_DEPTO || this.type == FieldTemplate.SELECT_CITY)
			{
				this.ref.blur($.proxy(this.validate,this));
				this.updateSelect(obj);

				if(this.type == FieldTemplate.SELECT_DEPTO)
				{
					this.ref.bind("change",$.proxy(function(){
						this.updateSelect({type: FieldTemplate.SELECT_CITY,id_departamento: this.ref.val(), ref: "#ciudad_user"});
					},this));
				}

			}

			if(this.type == FieldTemplate.RADIO_BUTTON)
			{
				if(this.callback)
				{
					this.ref.change($.proxy(this.callback,this));
				}
				else
				{
					this.ref.blur($.proxy(this.validate,this));					
				}
			}
			if(this.type == FieldTemplate.DEFAULT)
			{
				this.ref.blur($.proxy(this.validate,this));
			}
			
			if(this.type == FieldTemplate.TELEPHONE)
			{
				this.ref.blur($.proxy(this.validate,this));
			}
		}
		else
		{
			if(this.type == FieldTemplate.SELECT_DATE)
			{
				this.refs[0].blur($.proxy(this.validate,this));
				this.refs[1].blur($.proxy(this.validate,this));
				this.refs[2].blur($.proxy(this.validate,this));				
			}
			
			if(this.type == FieldTemplate.PASSWORD || this.type == FieldTemplate.EMAIL)
			{
				this.refs[0].change($.proxy(this.validate,this));
				this.refs[1].change($.proxy(this.validate,this));
			}

			if(this.type == FieldTemplate.CHECK_BOX)//Pendiente ajustar la funcionalidad de validar un elemento.
			{
				for(var i in this.refs)
				{
					this.refs[i].blur($.proxy(this.validate,this));
				}
			}
			if(this.type == FieldTemplate.TEXTFIELD_GROUP)
			{
				this.refs[0].blur($.proxy(this.validate,this));
				this.refs[1].blur($.proxy(this.validate,this));
			}

			
		}
	}
}
FieldTemplate.EMAIL = "email";	
FieldTemplate.TELEPHONE = "telephone";	
FieldTemplate.DEFAULT = "default";	
FieldTemplate.RADIO_BUTTON = "radiobutton";
FieldTemplate.SELECT_DATE = "select_date_dropdown";
FieldTemplate.PASSWORD = "password";
FieldTemplate.SELECT_DEPTO = "select_depto";
FieldTemplate.SELECT_CITY = "select_city";
FieldTemplate.CHECK_BOX = "check_box";
FieldTemplate.CHECK_BOX_GROUP = "check_box_group";
FieldTemplate.TEXTFIELD_GROUP = "textfield_group";
//FieldTemplate.
FieldTemplate.prototype.updateSelect = function(obj)
{	
	/*var d1 = [{"NOMBRE":"Amazonas","ID":"85"},{"NOMBRE":"Antioquia","ID":"63"},{"NOMBRE":"Arauca","ID":"86"},{"NOMBRE":"Atlantico","ID":"67"},{"NOMBRE":"Bolivar","ID":"68"},{"NOMBRE":"Boyaca","ID":"74"},{"NOMBRE":"Caldas","ID":"75"},{"NOMBRE":"Caqueta","ID":"88"},{"NOMBRE":"Casanare","ID":"89"},{"NOMBRE":"Cauca","ID":"82"},{"NOMBRE":"Cesar","ID":"69"},{"NOMBRE":"Choco","ID":"79"},{"NOMBRE":"Cordoba","ID":"73"},{"NOMBRE":"Cundinamarca","ID":"65"},{"NOMBRE":"Guainia","ID":"84"},{"NOMBRE":"Guajira","ID":"66"},{"NOMBRE":"Guaviare","ID":"376"},{"NOMBRE":"Huila","ID":"83"},{"NOMBRE":"Magdalena","ID":"64"},{"NOMBRE":"Meta","ID":"81"},{"NOMBRE":"N\/a","ID":"91"},{"NOMBRE":"","ID":"87"},{"NOMBRE":"Norte De Santander","ID":"71"},{"NOMBRE":"Putumayo","ID":"93"},{"NOMBRE":"Quindio","ID":"76"},{"NOMBRE":"Risaralda","ID":"77"},{"NOMBRE":"San Andres Islas","ID":"92"},{"NOMBRE":"Santander","ID":"70"},{"NOMBRE":"Sucre","ID":"72"},{"NOMBRE":"Tolima","ID":"80"},{"NOMBRE":"Valle Del Cauca","ID":"78"},{"NOMBRE":"Vaupes","ID":"276"},{"NOMBRE":"Vichada","ID":"256"}];
	var d2 = {"data":[{"NOMBRE":"Abejorral","ID":"239"},{"NOMBRE":"Abriaqui-antioquia","ID":"229"},{"NOMBRE":"Alejandria","ID":"5709"},{"NOMBRE":"Alto De Minas","ID":"336"},{"NOMBRE":"Amaga","ID":"228"},{"NOMBRE":"Amalfi","ID":"5360"},{"NOMBRE":"Andes","ID":"10"},{"NOMBRE":"Angelopolis","ID":"217"},{"NOMBRE":"Angostura","ID":"9339"},{"NOMBRE":"Anori","ID":"5385"},{"NOMBRE":"Anza","ID":"267"},{"NOMBRE":"Apartado","ID":"243"},{"NOMBRE":"Arboletes","ID":"437"},{"NOMBRE":"Aretuca","ID":"438"},{"NOMBRE":"Argelia","ID":"9238"},{"NOMBRE":"Armenia","ID":"384"},{"NOMBRE":"Bagre","ID":"5378"},{"NOMBRE":"Bahia Solano","ID":"640"},{"NOMBRE":"Barbosa","ID":"13"},{"NOMBRE":"Bello","ID":"19"},{"NOMBRE":"Belmira","ID":"250"},{"NOMBRE":"Betania","ID":"343"},{"NOMBRE":"Betulia","ID":"256"},{"NOMBRE":"Bolivar","ID":"20"},{"NOMBRE":"Bolombolo","ID":"21"},{"NOMBRE":"","ID":"5422"},{"NOMBRE":"Buritica","ID":"231"},{"NOMBRE":"Caceres","ID":"5390"},{"NOMBRE":"Cafe-antioquia","ID":"248"},{"NOMBRE":"Caicedo","ID":"439"},{"NOMBRE":"Caldas","ID":"30"},{"NOMBRE":"Campamento","ID":"9579"},{"NOMBRE":"Caracoli","ID":"656"},{"NOMBRE":"Caramanta","ID":"5384"},{"NOMBRE":"Carepa","ID":"636"},{"NOMBRE":"Carmen De Viboral","ID":"7998"},{"NOMBRE":"","ID":"9679"},{"NOMBRE":"Caucasia","ID":"38"},{"NOMBRE":"","ID":"32"},{"NOMBRE":"Chigorodo","ID":"402"},{"NOMBRE":"Cisneros","ID":"379"},{"NOMBRE":"Ciudad Bolivar","ID":"265"},{"NOMBRE":"Cocorna","ID":"213"},{"NOMBRE":"Concepcion","ID":"5710"},{"NOMBRE":"Concordia","ID":"345"},{"NOMBRE":"Copacabana","ID":"50"},{"NOMBRE":"Cristo Rey","ID":"257"},{"NOMBRE":"Currulao","ID":"635"},{"NOMBRE":"Dabeiba","ID":"252"},{"NOMBRE":"Don Matias","ID":"57"},{"NOMBRE":"Doradal","ID":"358"},{"NOMBRE":"Ebejico","ID":"638"},{"NOMBRE":"El Bagre","ID":"60"},{"NOMBRE":"El Carmen De Viboral","ID":"61"},{"NOMBRE":"","ID":"65"},{"NOMBRE":"El Retiro","ID":"67"},{"NOMBRE":"El Santuario","ID":"263"},{"NOMBRE":"Entrerios","ID":"70"},{"NOMBRE":"Envigado","ID":"71"},{"NOMBRE":"Fredonia","ID":"77"},{"NOMBRE":"Frontino","ID":"78"},{"NOMBRE":"Giraldo","ID":"254"},{"NOMBRE":"Girardota","ID":"86"},{"NOMBRE":"Gomez Plata","ID":"88"},{"NOMBRE":"Granada","ID":"320"},{"NOMBRE":"Guarne","ID":"91"},{"NOMBRE":"Guatape","ID":"92"},{"NOMBRE":"Hato Viejo","ID":"440"},{"NOMBRE":"Heliconia","ID":"238"},{"NOMBRE":"Hispania","ID":"251"},{"NOMBRE":"Itagui","ID":"95"},{"NOMBRE":"Ituango","ID":"10619"},{"NOMBRE":"Jardin","ID":"226"},{"NOMBRE":"Jerico","ID":"264"},{"NOMBRE":"La Ceja","ID":"98"},{"NOMBRE":"La Estrella","ID":"100"},{"NOMBRE":"La Fe","ID":"101"},{"NOMBRE":"La Pintada","ID":"103"},{"NOMBRE":"La Union-antioquia","ID":"104"},{"NOMBRE":"Liborina","ID":"5386"},{"NOMBRE":"Llano Grande","ID":"110"},{"NOMBRE":"Maceo","ID":"637"},{"NOMBRE":"Marinilla","ID":"114"},{"NOMBRE":"Medellin","ID":"115"},{"NOMBRE":"Monte Bello","ID":"353"},{"NOMBRE":"Murindo","ID":"7818"},{"NOMBRE":"Mutata","ID":"5498"},{"NOMBRE":"","ID":"225"},{"NOMBRE":"Nechi","ID":"7634"},{"NOMBRE":"Necocli","ID":"253"},{"NOMBRE":"Palmitas","ID":"255"},{"NOMBRE":"Peque","ID":"9359"},{"NOMBRE":"Piedras Blancas","ID":"227"},{"NOMBRE":"Pintada","ID":"259"},{"NOMBRE":"Pueblorico","ID":"5389"},{"NOMBRE":"Puerto Berrio","ID":"232"},{"NOMBRE":"Puerto Nare","ID":"441"},{"NOMBRE":"Puerto Perales","ID":"9939"},{"NOMBRE":"Puerto Triunfo","ID":"258"},{"NOMBRE":"Puerto Valdivia","ID":"7635"},{"NOMBRE":"Remedios","ID":"5382"},{"NOMBRE":"Rionegro","ID":"140"},{"NOMBRE":"Sabanalarga","ID":"10239"},{"NOMBRE":"Sabaneta","ID":"143"},{"NOMBRE":"Salgar","ID":"7698"},{"NOMBRE":"San Andres De Cuerquia","ID":"11019"},{"NOMBRE":"San Antonio De Pereira","ID":"442"},{"NOMBRE":"San Antonio De Prado","ID":"410"},{"NOMBRE":"San Carlos","ID":"235"},{"NOMBRE":"San Cristobal","ID":"149"},{"NOMBRE":"San Francisco","ID":"10539"},{"NOMBRE":"San Jeronimo","ID":"151"},{"NOMBRE":"","ID":"615"},{"NOMBRE":"San Jose Del Nus","ID":"8138"},{"NOMBRE":"San Juan De Uraba","ID":"633"},{"NOMBRE":"San Luis","ID":"359"},{"NOMBRE":"San Pedro","ID":"153"},{"NOMBRE":"San Pedro De Uraba","ID":"8979"},{"NOMBRE":"San Rafael","ID":"241"},{"NOMBRE":"San Roque","ID":"154"},{"NOMBRE":"San Vicente","ID":"230"},{"NOMBRE":"Santa Barbara","ID":"155"},{"NOMBRE":"Santa Elena","ID":"156"},{"NOMBRE":"Santa Fe De Antioquia","ID":"157"},{"NOMBRE":"Santa Rosa De Osos","ID":"419"},{"NOMBRE":"Santo Domingo","ID":"163"},{"NOMBRE":"Santuario","ID":"443"},{"NOMBRE":"Segovia","ID":"233"},{"NOMBRE":"Sonson","ID":"240"},{"NOMBRE":"Sopetran","ID":"172"},{"NOMBRE":"Tamesis","ID":"245"},{"NOMBRE":"Taraza","ID":"249"},{"NOMBRE":"Tarso","ID":"214"},{"NOMBRE":"Titiribi","ID":"271"},{"NOMBRE":"Toledo","ID":"11119"},{"NOMBRE":"Turbo","ID":"372"},{"NOMBRE":"Urrao","ID":"377"},{"NOMBRE":"Valdivia","ID":"266"},{"NOMBRE":"Valparaiso","ID":"244"},{"NOMBRE":"Vegachi","ID":"237"},{"NOMBRE":"Venecia","ID":"325"},{"NOMBRE":"Versalles","ID":"10739"},{"NOMBRE":"Yali","ID":"639"},{"NOMBRE":"Yarumal","ID":"196"},{"NOMBRE":"Yolombo","ID":"634"},{"NOMBRE":"Yondo","ID":"444"},{"NOMBRE":"Zaragoza","ID":"221"}]};
	var data;
	var temp = "";
	if(obj.type == FieldTemplate.SELECT_DEPTO)
	{
		data = d1;
		temp += "<option value='-1'>Departamento</option>";
	}
	if(obj.type == FieldTemplate.SELECT_CITY)
	{
		data = d2.data;
		temp += "<option value='-1'>Ciudad</option>";
	}
	for(var i in data)
	{
		temp += "<option value='"+data[i].ID+"'>"+data[i].NOMBRE+"</option>";			
	}
	obj.ref.html(temp);*/	
	
	var datos, d1, d2;
	var servicio = ""

	if(obj.type == FieldTemplate.SELECT_DEPTO)
	{
		servicio = "getDepartamentos";
		datos = {idPais:1};
	}
	else
	{		
		servicio = "getCiudades";
		obj.ref = $(obj.ref);
		datos = {idDepartamento:obj.id_departamento};
	}
	$.ajax({
	type: "POST",
	url: "util.php?cmd=" + servicio,
	data: datos,
	dataType: "json"
	}).success($.proxy(
		function(response){
			var data;
			var temp = "";
			if(obj.type == FieldTemplate.SELECT_DEPTO)
			{
				data = response;
				temp += "<option value='-1'>Departamento</option>";
			}
			if(obj.type == FieldTemplate.SELECT_CITY)
			{
				data = response;
				temp += "<option value='-1'>Ciudad</option>";
			}
			for(var i in data)
			{
				temp += "<option value='"+data[i].ID+"'>"+data[i].NOMBRE+"</option>";			
			}
			obj.ref.html(temp);	


	},obj));
		
}
FieldTemplate.prototype.dummyData = function(obj)
{
	if(this.type == FieldTemplate.SELECT_DATE)
	{
		this.refs[0].val(obj.dummy[0]);
		this.refs[1].val(obj.dummy[1]);
		this.refs[2].val(obj.dummy[2]);
	}
	if(this.type == FieldTemplate.RADIO_BUTTON)
	{
		if(obj.selected)
		{
			this.ref.prop('checked', true);
		}
	}
	if(this.type == FieldTemplate.TEXTFIELD_GROUP)
	{
		if(obj.dummy)
		{
			if(this.refs)
			{
				for(var i=0;i<this.refs.length;i++)
				{					
					if(i<obj.dummy.length)
					{
						this.refs[i].val(obj.dummy[i]);
					}
				}
			}
		}
	}
	if(this.type == FieldTemplate.DEFAULT ||
	   this.type == FieldTemplate.TELEPHONE ||
	   this.type == FieldTemplate.EMAIL ||
	   this.type == FieldTemplate.PASSWORD)
	{
		if(this.default_value)//Esta validacion se debe mover a la clase TextField
		{
			this.readOnly();				
		}
		else
		{
			if(obj.dummy)
			{
				if(this.ref)
				{
					this.ref.val(obj.dummy);
				}
				else
				{
					if(this.refs)
					{
						for(var i in this.refs)
						{
							this.refs[i].val(obj.dummy)
						}
					}
				}
			}
		}
	}
}
FieldTemplate.prototype.readOnly = function(obj)
{
	if(this.default_value)//Esta validacion se debe mover a la clase TextField
	{
		this.ref.val(this.default_value);
		if(this.read_only)
		{
			this.ref.attr("readonly", true);
		}
	}
}
FieldTemplate.prototype.isEmail = function(obj)
{
	var field = obj || this.ref;
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	//var emailPattern = /^[a-zA-Z0-9._]+[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;  
	return filter.test(field.val());

	//return emailPattern.test(field.val());   
};
FieldTemplate.prototype.isEmpty = function(obj)
{
	var field = obj || this.ref;		
	return !field.val();
};

FieldTemplate.prototype.minLength = function(p_num, p_str) {
	if(p_str.length >= p_num) {
		return true;
	}
	return false;
}
FieldTemplate.prototype.isAlphaNumeric = function(str) {
  var field = str; //|| this.ref.val();
  var regExp = /[^A-Za-záéíóúñÁÉÍÓÚÑ\s]/;///[^A-Za-z\s]/;
  return regExp.test(field);
};
FieldTemplate.prototype.isValidDate = function(obj)
{
	var d;
	obj.month = obj.month - 1;
	d = new Date(obj.year, obj.month, obj.day);
	return !(d.getFullYear() == obj.year && d.getMonth() == obj.month && d.getDate() == obj.day);
};
FieldTemplate.prototype.isNumeric = function(obj)
{
	var field = obj || this.ref;
	var value = field.val();
	var numbers = /^[0-9]+$/;
	return (value.length > 0 && value.match(numbers));
}
FieldTemplate.prototype.validate = function(p_obj)
{
	var cf;
	var temp;
	var validator;
	var error_message;
	var error = false;
	
	//if(this.check_error){
		cf = this.view.custom_form;
		if(this.ref)
		{
			validator = $(this.ref.parent()).find(cf.wrapper_validation);
			error_message = $(this.ref.parent()).find(cf.wrapper_error_message);			
		}		
		if(this.type == FieldTemplate.TELEPHONE)
		{
			error =  !this.isNumeric();
		}
		if(this.type == FieldTemplate.DEFAULT)
		{
			error = this.isEmpty();
		}
		if(this.type == FieldTemplate.RADIO_BUTTON)
		{
			//Se debe poner dos parent, cuando los radios estan dentro de un label,
			//revisar si se puede cambiar el find por otra funcionalidad
			validator = $(this.ref.parent().parent()).find(cf.wrapper_validation);
			error_message = $(this.ref.parent().parent()).find(cf.wrapper_error_message);
		 	temp = $("input:radio[name="+this.name+"]:checked").val();		 	
	    	error = (temp === undefined);  
		}
		if(this.type == FieldTemplate.SELECT_DATE)
		{
			if(this.refs && this.refs.length>0)
			{
				validator = $(this.refs[0].parent().parent()).find(cf.wrapper_validation);
				error_message = $(this.refs[0].parent().parent()).find(cf.wrapper_error_message);
				for(var i in this.refs)
				{
					if(!this.isNumeric(this.refs[i]))
					{
						error = true; break;
					}
				}
				if(!error)
				{
					error = (this.isValidDate({day:this.refs[0].val(),
											   month:this.refs[1].val(),
											   year:this.refs[2].val()}));				
				}
			}
		}
		if(this.type == FieldTemplate.PASSWORD)
		{	
			if(p_obj && !p_obj.isClick) {
				if(this.refs )
				{
					error =  this.isEmpty(this.refs[0]);				
					if(!error)
					{					
						//error = !(this.refs[0].val() == this.refs[1].val());
						//if(!error){
						error = !this.minLength(6,this.refs[0].val());
						//}
					}
					validator = $(this.refs[0].parent()).find(cf.wrapper_validation);
					error_message = $(this.refs[0].parent()).find(cf.wrapper_error_message);

					this.showValidation({
						cf:cf,
						validator:validator,
						error_message:error_message,
						error:error//!this.isEmpty(this.refs[0])
					});

					if(!this.isEmpty(this.refs[1]))
					{
						error =  this.isEmpty(this.refs[0]) || this.isEmpty(this.refs[1]);	
						if(!error)
						{					
							error = !(this.refs[0].val() == this.refs[1].val());
							if(!error){
								error = !this.minLength(6,this.refs[1].val());
							}
						}			
						validator = $(this.refs[1].parent()).find(cf.wrapper_validation);
						error_message = $(this.refs[1].parent()).find(cf.wrapper_error_message);
						this.showValidation({
							cf:cf,
							validator:validator,
							error_message:error_message,
							error:error//!this.isEmpty(this.refs[1])
						});						
					}
				}
				else
				{
					error = !this.isNumeric();
				}	
			}else {
				if(this.refs )
				{
					error =  this.isEmpty(this.refs[0]);				
					if(!error)
					{					
						//error = !(this.refs[0].val() == this.refs[1].val());
						//if(!error){
						error = !this.minLength(6,this.refs[0].val());
						//}
					}
					validator = $(this.refs[0].parent()).find(cf.wrapper_validation);
					error_message = $(this.refs[0].parent()).find(cf.wrapper_error_message);

					this.showValidation({
						cf:cf,
						validator:validator,
						error_message:error_message,
						error:error//!this.isEmpty(this.refs[0])
					});

					// if(!this.isEmpty(this.refs[1]))
					// {
						error =  this.isEmpty(this.refs[0]) || this.isEmpty(this.refs[1]);	
						if(!error)
						{					
							error = !(this.refs[0].val() == this.refs[1].val());
							if(!error){
								error = !this.minLength(6,this.refs[1].val());
							}
						}			
						validator = $(this.refs[1].parent()).find(cf.wrapper_validation);
						error_message = $(this.refs[1].parent()).find(cf.wrapper_error_message);
						this.showValidation({
							cf:cf,
							validator:validator,
							error_message:error_message,
							error:error//!this.isEmpty(this.refs[1])
						});						
					// }
				}
				else
				{
					error = !this.isNumeric();
				}	
			}
			
		}
		if(this.type == FieldTemplate.EMAIL)
		{		
			if(p_obj && !p_obj.isClick) {
				if(this.refs)
				{
					error = !this.isEmail(this.refs[0]);
					validator = $(this.refs[0].parent()).find(cf.wrapper_validation);
					error_message = $(this.refs[0].parent()).find(cf.wrapper_error_message);

					this.showValidation({
						cf:cf,
						validator:validator,
						error_message:error_message,
						error:error
					});

					if(!this.isEmpty(this.refs[1]))
					{
						error = !this.isEmail(this.refs[1]);

						if(!error)
						{					
							error = !(this.refs[0].val() == this.refs[1].val());
						}	 
						validator = $(this.refs[1].parent()).find(cf.wrapper_validation);
						error_message = $(this.refs[1].parent()).find(cf.wrapper_error_message);

						this.showValidation({
							cf:cf,
							validator:validator,
							error_message:error_message,
							error:!this.isEmail(this.refs[1]) || error
						});							
					}
					
				}
				else
				{
					error = !this.isEmail();
				}
			}else {
				if(this.refs)
				{
					error = !this.isEmail(this.refs[0]);
					validator = $(this.refs[0].parent()).find(cf.wrapper_validation);
					error_message = $(this.refs[0].parent()).find(cf.wrapper_error_message);

					this.showValidation({
						cf:cf,
						validator:validator,
						error_message:error_message,
						error:error
					});

					// if(!this.isEmpty(this.refs[1]))
					// {
						error = !this.isEmail(this.refs[1]);

						if(!error)
						{					
							error = !(this.refs[0].val() == this.refs[1].val());
						}	 
						validator = $(this.refs[1].parent()).find(cf.wrapper_validation);
						error_message = $(this.refs[1].parent()).find(cf.wrapper_error_message);

						this.showValidation({
							cf:cf,
							validator:validator,
							error_message:error_message,
							error:!this.isEmail(this.refs[1]) || error
						});							
					// }
					
				}
				else
				{
					error = !this.isEmail();
				}
			}		

		}
		if(this.type == FieldTemplate.CHECK_BOX)
		{
			error = $('[name="'+this.name+'"]:checked').size() == 0;
			validator = $(this.refs[0].parent().parent().parent()).find(cf.wrapper_validation);
			error_message = $(this.refs[0].parent().parent().parent()).find(cf.wrapper_error_message);
			this.callbackRedirect && this.callbackRedirect();
		}
		if(this.type == FieldTemplate.CHECK_BOX_GROUP)
		{	
			var _cg = 0;	
			for(var k in this.names)
			{
				//if($('[name="'+this.ghost+'"]:checked').size()==0)
				//{
					console.log(_cg+" "+this.names[k]+" "+$('[name="'+this.names[k]+'"]:checked').size());
					if($('[name="'+this.names[k]+'"]:checked').size()>0)
					{
						_cg++;
					}					
				//}
			}
			error = _cg == 0;
			validator = $(this._parent+" "+cf.wrapper_validation);
			error_message = $(this._parent+" "+cf.wrapper_error_message);
		}
		if(this.type == FieldTemplate.SELECT_DEPTO || this.type == FieldTemplate.SELECT_CITY)
		{
			validator = $(this.ref.parent().parent()).find(cf.wrapper_validation);
			error_message = $(this.ref.parent().parent()).find(cf.wrapper_error_message);
			temp = $("#"+this.name+" option:first").val();
			error = (temp == this.ref.val());
		}

		if(this.type == FieldTemplate.TEXTFIELD_GROUP)
		{
			this.refs[0].val(this.refs[0].val().trim());
			validator = $(this.refs[0].parent()).find(cf.wrapper_validation);
			error_message = $(this.refs[0].parent()).find(cf.wrapper_error_message);	
			error = this.isEmpty(this.refs[0]);

			if(!error) {
				error = this.isAlphaNumeric(this.refs[0].val()) || this.isAlphaNumeric(this.refs[1].val());

				if(!this.isEmpty(this.refs[1])) {
					error = this.isAlphaNumeric(this.refs[0].val()) || this.isAlphaNumeric(this.refs[1].val());
				}
			}
		}

		if(validator)
		{
			this.showValidation({
				cf:cf,
				validator:validator,
				error_message:error_message,
				error:error
			});
		}

		if(this.required)
		{
			return error;
		}
		else
		{
			return false;
		}
	//}
}
FieldTemplate.prototype.clear = function(obj)
{	var validator;

	if(this.type == FieldTemplate.TELEPHONE)
	{
		validator = $(this.ref.parent()).find(cf.wrapper_validation);
		validator.removeClass(cf.sucess_class);
		validator.removeClass(cf.error_class);
		this.ref.val("");
	}
	if(this.type == FieldTemplate.DEFAULT)
	{
		validator = $(this.ref.parent()).find(cf.wrapper_validation);
		validator.removeClass(cf.sucess_class);
		validator.removeClass(cf.error_class);
		this.ref.val("");
	}
	if(this.type == FieldTemplate.RADIO_BUTTON)
	{			
	 	$("input:radio[name='"+this.name+"']").attr('checked', false);
		validator = $(this.ref.parent().parent()).find(cf.wrapper_validation);
		validator.removeClass(cf.sucess_class);
		validator.removeClass(cf.error_class);
	}
	if(this.type == FieldTemplate.SELECT_DEPTO || this.type == FieldTemplate.SELECT_CITY)
	{			
		this.ref.val(this.ref.find('option').first());
		this.ref.val(this.ref.find('option').first());
		
		validator = $(this.ref.parent().parent()).find(cf.wrapper_validation);
		validator.removeClass(cf.sucess_class);
		validator.removeClass(cf.error_class);

	}
	if(this.type == FieldTemplate.SELECT_DATE)
	{
		for(var i in this.refs)
		{
			this.refs[i].val(this.refs[i].find('option').first().html());
			validator = $(this.refs[i].parent().parent()).find(cf.wrapper_validation);
		}
		validator.removeClass(cf.sucess_class);
		validator.removeClass(cf.error_class);
	}
	if(this.type == FieldTemplate.PASSWORD)
	{
		if(this.refs)
		{
			this.refs[0].val("");
			this.refs[1].val("");
		}			
	}
	if(this.type == FieldTemplate.EMAIL)
	{				
		if(this.refs)
		{
			this.refs[0].val("");
			this.refs[1].val("");	
		}
		else
		{
			this.ref.val("");
		}
	}
	if(this.type == FieldTemplate.CHECK_BOX)
	{
		$('[name="'+this.name+'"]').attr('checked', false);
	}
	if(this.type == FieldTemplate.TEXTFIELD_GROUP)
	{
		this.refs[0].val("");
		validator = $(this.refs[0].parent()).find(cf.wrapper_validation);
		validator.removeClass(cf.sucess_class);
		validator.removeClass(cf.error_class);

		this.refs[1].val("");
		validator = $(this.refs[1].parent()).find(cf.wrapper_validation);
		validator.removeClass(cf.sucess_class);
		validator.removeClass(cf.error_class);

	}		
}
FieldTemplate.prototype.showValidation = function(obj)
{
	var validator = obj.validator;
	var error_message = obj.error_message;
	var cf = obj.cf;
	var error = obj.error;
	validator.removeClass(cf.sucess_class+" "+cf.error_class);	
		if(!error)
		{
			if(cf.resize_error)
			{
				temp = error_message.css("display");			
				if(temp == "block")
				{
					error_message.fadeOut();													
				}
			}
			else
			{
				error_message.css("visibility","hidden");				
			}
			validator.addClass(cf.sucess_class);
		}
		else
		{
			//error_message.html("FUCK YOU BITCH!!!! *");
			if(cf.resize_error)
			{
				error_message.slideDown();				
			}
			else
			{
				error_message.css("visibility","visible");
			}
			validator.addClass(cf.error_class);
		}
}

  
