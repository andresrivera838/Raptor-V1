function inputDependiente(obj){
	$('input[name="'+"quien_compra"+'"]').change(function(){
            // console.log("cambia");
		quienCompra = ObtenerValorCampos.radio({
	        name: "quien_compra"
      	});
      	if(quienCompra == 4){
                  otro = false;
                  $('.productosNosotrasDonde').attr('readonly', false);
                  $('.productosNosotrasDonde').val("");
            }
            else{
      		otro = true;
                  $('.productosNosotrasDonde').attr('readonly', true);
                  $('.productosNosotrasDonde').val("");   
      	}
	});
}