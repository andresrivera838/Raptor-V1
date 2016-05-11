var View = function(obj){
	this.fields = [];
	this.name = obj.name || null;
	this.index = obj.index || -1;
	this.ref = obj.ref || null;
	this.service_app = obj.service_app || null;
	this.custom_form = obj.custom_form || null;
	this.next_button = obj.next_button || null;
	this.prev_button = obj.prev_button || null;
	this.backend = obj.backend || null;
	this.activeButtons();
}
View.VALIDATE = "validate";
View.prototype.activeButtons = function(obj)
{	
	if(this.next_button)
	{		
		//$(this.next_button).css("visibility","hidden");
		$(this.next_button).unbind("click").bind("click",{msg:""},$.proxy(function(e){
			//$(this.next_button).unbind("click");
			this.custom_form.nextView();
		},this));		
	}
	if(this.prev_button)
	{
		$(this.prev_button).css("visibility","hidden");
		/*$(this.prev_button).bind("click",{msg:""},$.proxy(function(e){
			this.custom_form.prevView();
		},this));*/
	}
}
View.prototype.clearFields = function(obj)
{
	var ft;
	for(var i in this.fields)
	{			
		ft = this.fields[i];
		ft.clear();
	}
}
View.prototype.addHijo = function(obj)
{
	var ans="",data,temp,str;
	var cf = this.custom_form;
	cf.hijos_count++;
	for(var i in this.fields)
	{
		temp = this.fields[i];
		
		if(temp.type == FieldTemplate.TEXTFIELD_GROUP)
		{
			str = temp.template;
			str = str.replace(/%/g,cf.hijos_count);			
			str = str.replace("#1",temp.refs[0].val()=="NONAME"?"":temp.refs[0].val());
			str = str.replace("#2",temp.refs[1].val()=="NONAME"?"":temp.refs[1].val());
			ans+= str;
		}

		if(temp.type == FieldTemplate.SELECT_DATE)
		{
			str = temp.template;
			str = str.replace(/%/g,cf.hijos_count);
			str = str.replace("#1",temp.refs[0].val());
			str = str.replace("#2",temp.refs[1].val());
			str = str.replace("#3",temp.refs[2].val());
			ans+= str;
		}

		if(temp.type == FieldTemplate.RADIO_BUTTON)
		{
			if(temp.ref)
			{
				if(temp.ref.is(':checked'))
				{
					if(temp.template)
					{
						str = temp.template;
						str = str.replace(/%/g,cf.hijos_count);
						str = str.replace("#",temp.ref.val());//temp.ref.is(':checked')
						ans+= str;
					}
				}
			}
		}
	}
	cf.hijos += ans;			
	console.log(cf.hijos+" \n hijos_count "+cf.hijos_count);
	//return ans;
}
View.prototype.validate = function(e)
{
	var ft;	
	var error = false;	
	var error_count = 0;
	var cf = this.custom_form;
	
	if(e.data.next)
	{
		for(var i in this.fields)
		{			
			ft = this.fields[i];
			error = ft.validate();
			if(error){error_count++;}
		}
	}
	
	if(e.data.saveView)
	{
		console.log("error_count "+error_count);
		if(error_count==0)
		{
			if(cf.hijos_count+1 <= 3)
			{
				this.addHijo();				
				this.clearFields();
			}
			else
			{
				e.data.error();				
			}
		}
		
	}
	else
	{	
		console.log();
		if(this.index==5 || this.index==6)
		{
			var flag = false;
			if(cf.hijos_count==0)
			{
				
				if(this.index == 5){
					$("#lightboxErrorUnHijo").css("height", "780px");
				}
				else{
					$("#lightboxErrorUnHijo").css("height", "728px");
				}

				$("#lightboxErrorUnHijo").fadeIn();

				$("#lightboxErrorUnHijo .btnCerrarLightboxRegistro").click(function(){
					$("#lightboxErrorUnHijo").fadeOut();
				});
				flag = true;
			}
			
			$('body').trigger({type:View.VALIDATE,
						obj:{
								error:flag,
								next:true,
								backend:undefined
					  		}
			});	
			
		}
		else
		{
			$('body').trigger({type:View.VALIDATE,
							obj:{
									error:error_count>0,
									next:e.data.next,
									backend:this.backend
						  		}
			});				
			
		}
	}
}
View.prototype.addField = function(obj)
{
	this.fields.push(obj);
}
View.prototype.addListener = function(listener)
{
	if(listener == CustomForm.NEXT_VIEW)
	{
		$('body').bind(CustomForm.NEXT_VIEW, {next:true},  $.proxy(this.validate,this));		
		$('body').bind(CustomForm.PREV_VIEW, {next:false} ,$.proxy(this.validate,this));		
	}
}
View.prototype.removeListener = function(listener)
{
	if(listener == CustomForm.NEXT_VIEW)
	{
		$('body').unbind(CustomForm.NEXT_VIEW);
		$('body').unbind(CustomForm.PREV_VIEW);		
	}
}
/*var view = (function (window, undefined) {
	"use strict";
	function View(obj) {
		this.fields = [];
		this.service_app = obj.service_app || null;
		this.custom_form = obj.custom_form || null;
	}
	var _ = View.prototype;
	//var _ = clase.prototype = new parentClass();
	_.validate = function()
	{
		var ft;		
		for(var i in this.fields)
		{
			ft = this.fields[i];
			ft.
		}
	}
})(window, undefined); */