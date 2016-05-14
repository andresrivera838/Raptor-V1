var ref = {};
var myApp = new Framework7(); 
var $$ = Dom7;

/********************************
    constantes
*********************************/

var HOSTNAME = 'https://raptor-speakerblack.c9users.io/';

var generalServiceSetup = {
   urlReusables: HOSTNAME + 'server/post/track/'
};

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
    
  
    var myApp = new Framework7({
        pushState: true,
        swipePanel: 'left',
        material: true
        // ... other parameters
    });
    
    
    $$('#searchPista').on('click', function(){
        $('.containPistas').empty();
        var pista =  $('.searchM').val();
        getPista({
            parameter: pista
        });
    });
    
    var playing = false;
    
 
    
 
    $('.algo').on('click', function() {
        alert("s");
        /*$(this).toggleClass("down");
        
        console.log($(this).parents());
 
        if (playing == false) {
            document.getElementById('player0').play();
            playing = true;
            $(this).text("Parar Sonido");
 
        } else {
            document.getElementById('player0').pause();
            playing = false;
            $(this).text("Reiniciar Sonido");
        }*/
    });
    
    var playing = false;
    var PistaA;
        
    $(".card").on("click", ".playVideo", function(){
        
        
        var padre = $(this).parents('.card');
        var id = $(padre).attr('id');
        
        $(this).toggleClass("down");
 
        if (playing == false) {
            
            if(PistaA){
                document.getElementById(PistaA).pause();
            }
            var idPista = $('#'+id+' .player').attr('id');
            document.getElementById(idPista).play();
            playing = true;
            PistaA = idPista;
            //$(this).text("Parar Sonido");
 
        } else {
            var idPista = $('#'+id+' .player').attr('id');
            document.getElementById(idPista).pause();
            playing = false;
            //$(this).text("Reiniciar Sonido");
        }
    });
};

function getPista(p_obj) {
    
    $.ajax({
		data: {query: p_obj.parameter},
		type: "POST",
		url:  generalServiceSetup.urlReusables + "search",
	})
	
    .done(function( data, textStatus, jqXHR ) {
            
            var datos = $.parseJSON(data);	
             
            console.log(datos);
            
            $.each(datos.data.data, function(i,item){
    			var newPageContent = '<div id="searchPt'+i+'" class="card demo-card-header-pic">'+
    			                        '<audio class="player" id="playerVideo'+i+'" src="'+ datos.data.data[i].preview +'"> </audio>'+
                                        '<div style="background-image:url('+ datos.data.data[i].album.cover_medium +')" '+
                                        ' valign="bottom" class="card-header color-white no-border playVideo">'+ datos.data.data[i].title +'</div>'+
                                        '<div class="card-con tent">'+
                                          '<div class="card-content-inner">'+
                                            '<div class="divClear"></div>'+
                                            '<div class="content-block">'+
                                              '<div class="chip">'+
                                                '<div class="chip-media"><img src="'+ datos.data.data[i].artist.picture_small +'"></div>'+
                                                '<div class="chip-label">'+ datos.data.data[i].artist.name +'</div>'+
                                              '</div>'+
                                            '</div>'+
                                            '<div class="divClear"></div>'+
                                          '</div>'+
                                        '</div>'+
                                        '<div class="card-footer no-border">'+
                                            '<a href="#" class="link">Like</a>'+
                                            '<a href="#" class="link">Share</a>'+
                                        '</div>'+
                                    '</div>';
               $('.containPistas').append(newPageContent);
    		});
    		events();
    	                       
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
    	    console.log(errorThrown);
    });
}

function init() {
	events();
	// openGame();   
}

window.onload = init;
