
function obtenerDepartamentos(obj){
	ServicesAPP.getDepartamentos({
		idPais:1,
		successCallback: function(callback_obj){
			// console.log("successCallback: obtenerDepartamentos");
			myObj = callback_obj;
			$('select[name="'+obj.first+'"]').html("<option value='-1'>Seleccionar departamento</option>");
			for(var i=0; i < myObj.length ; i++){
				$('select[name="'+obj.first+'"]').append("<option value='"+ myObj[i].ID +"'>"+ myObj[i].NOMBRE+" </option>");
			}
		},
		failCallback: function(){
			// console.log("failCallback obtenerDepartamentos");
		}
	});
}


function enableDropdownCiudades(obj){
	$('select[name="'+obj.first+'"]').change(function(){
		if(ValidarCampos.isNaturalNumber({
	        name: "departamento",
	        element_type: "dropDown"
	  	})){
			var departamento = ObtenerValorCampos.dropDown({
		        name: "departamento"
	        });
	        // console.log("departamento: "+ departamento);
	        ServicesAPP.getCiudades({
				idDepartamento: departamento,
				successCallback: function(callback_obj){
					// console.log("successCallback: getCiudades");
					myObj = callback_obj;
					$('select[name="'+obj.second+'"]').html("<option value='-1'>Seleccionar ciudad</option>");
					for(var i=0; i < myObj.length ; i++){
						$('select[name="'+obj.second+'"]').append("<option value='"+ myObj[i].ID +"'>"+ myObj[i].NOMBRE+" </option>");
					}
				},
				failCallback: function(){
					// console.log("failCallback getCiudades");
				}
			});


	  	}
	  	else{
	  		// console.log("no se valido el departamento");
	  		$('select[name="'+obj.second+'"]').html("<option value='-1'>Seleccionar ciudad</option>");
	  	}
	});
}