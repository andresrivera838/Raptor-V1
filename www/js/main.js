var ref = {};
var myApp = new Framework7(); 
var mainView = myApp.addView('.view-main');
var $$ = Dom7;


/********************************
    constantes
*********************************/

var HOSTNAME = 'https://raptor-speakerblack.c9users.io/';

var generalServiceSetup = {
   urlReusables: HOSTNAME + 'server/post/track/'
};


  
var myApp = new Framework7({
    pushState: true,
    swipePanel: 'left',
    material: true
    // ... other parameters
});
    
    

/********************************
    fin constantes
*********************************/

/*************** Mensajes Error Exito **************************/
var errorMsg = {
    login: {
        error1:"¡Algo nos hace falta! Ingresa de nuevo tus datos o regístrate en NosotrasOnline.com para poder participar.",
        error2:"Lo sentimos, esta actividad es solo para usuarias de Republica Dominicana"
    },
    claves: {
        exito: '¡Todo un éxitooo! Puedes descontar puntos de tu cuenta de NosotrasOnline para jugar.',
        error1: '¡LA CLAVE YA HA SIDO INGRESADA! Compra nuevos productos Nosotras para ingresar y participar.',
        error2: '¡Ups! la clave no es válida. Vuelve a ingresarla sin puntos, comas, guiones ni espacios.',
        error3: '¡Ups! la clave que ingresaste no es válida, inténtalo de nuevo ingresando una clave de Tampones.'
    },
    tiquete: {
        exito: '¡¡¡YA PUEDES JUGAAAR!!!Descontamos 10 puntos de tu cuenta de NosotrasOnline para entregarte 1 ENTRADA a esteincreíble juego. ¡Entra, diviértete y gana para mamá!',
        error1: '¡¡¡NO PUEDES JUGAR!!! Ingresa más claves de tus productos'
        // error2: '¡Gracias por jugar y divertirte en nombre de mamá en esta feria! Pronto descubrirás si eres una de las ganadoras.'
    }
};
/*************** Mensajes Error Exito **************************/

function events(){
    
    $$('#searchPista').on('click', function(){
        $('.containPistas').empty();
        var pista =  $('.searchM').val();
        $('.progressbar-infinite').show();
        if(getPista({parameter: pista})){
            
        }else{
            
        }
        
    });
    
    var playing = false;
    var PistaA, fatherP;
    
    if(!playing){
        $('.playGif').hide();
    }
    
    $('.Download').on('click', function(){
        var id_obj = $(this).children('.imgDownload').attr('id-pista');
        download(id_obj);
    });
    
    $(".card").on("click", ".playVideo", function(){
        
        var padre = $(this).parents('.card');
        var id = $(padre).attr('id');
        
        $(this).toggleClass("down");
 
        if (playing == false) {
            
            /* condicion para pausar audio anterior */
            
            if(PistaA){
                document.getElementById(PistaA).pause();
                $('#'+fatherP+' .playGif').hide();
                $('#'+fatherP+' .imgPause').addClass('imgPlay');
                $('#'+fatherP+' .imgPause').removeClass('imgPause');
            }
            
            var idPista = $('#'+id+' .player').attr('id');
            
            $('#'+id+' .playGif').show();
            document.getElementById(idPista).play();
            $(this).html("<span class='imgPause'></span>");
            
            /* funcion a finalizar audio */
            
            document.getElementById(idPista).onended = function() {
                $('#'+id+' .playGif').hide();
                myApp.addNotification({
                    message: 'estabas escuchando un preiew de <br> '+  $('#'+id+' .card-header').html()+'',
                });
            }; 
            
            /* llenando varibles globales */
            
            playing = true;
            PistaA = idPista;
            fatherP = id;
            
        } else {
            var idPista = $('#'+id+' .player').attr('id');
            $('#'+id+' .playGif').hide();
            document.getElementById(idPista).pause();
            playing = false;
            $(this).html("<span class='imgPlay'></span>");
        }
    });
};


function download(obj_id) {
    $.ajax({
		data: {id: obj_id},
		type: "POST",
		url:  generalServiceSetup.urlReusables + "download",
	})
	.done(function( data, textStatus, jqXHR ) {
 		console.log(jQuery.parseJSON(data));		
    })
      .fail(function( jqXHR, textStatus, errorThrown ) {
    	    console.log(errorThrown);
    });
}

function getPista(p_obj) {
    
    $.ajax({
		data: {query: p_obj.parameter},
		type: "POST",
		url:  generalServiceSetup.urlReusables + "search",
	})
	
    .done(function( data, textStatus, jqXHR ) {
            
            var datos = $.parseJSON(data);	
             
            console.log(datos);
            
            var gif = '<img class="playGif" border=0 src="css/img/PlayGif.GIF">';
            
            
            $.each(datos.data.data, function(i,item){
    			var newPageContent = '<div id="searchPt'+i+'" class="card demo-card-header-pic">'+
    			                        '<audio class="player" id="playerVideo'+i+'" src="'+ datos.data.data[i].preview +'"> </audio>'+
                                        '<div style="background-image:url('+ datos.data.data[i].album.cover_medium +')" '+
                                        ' valign="bottom" class="card-header color-white no-border ">'+ datos.data.data[i].title +'</div>'+
                                        '<div class="card-con tent">'+
                                          '<div class="card-content-inner">'+
                                            '<p class="color-gray">'+ datos.data.data[i].artist.name +'</p>'+
                                          '</div>'+
                                        '</div>'+
                                        '<div class="card-footer no-border">'+
                                            '<a href="#" class="playVideo"><span class="imgPlay"></span></a>'+
                                            ''+gif+''+
                                            '<a href="#" class="Download">'+
                                            '<span class="imgDownload" id-pista="'+ datos.data.data[i].id +'"></span></a>'+
                                        '</div>'+
                                    '</div>';
               $('.containPistas').append(newPageContent);
    		});
    		events();
    		$('.progressbar-infinite').hide();
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
    	    console.log(errorThrown);
    });
}

function init() {
	events();
	$('.progressbar-infinite').hide();
	// openGame();   
}

window.onload = init;
