var ref = {};
var whereCallLogin = '';
var flagIniSlick = true;
var flagIniSlick2 = true;
var flagIniSlick3 = true;
var reloadGame = false;
var numOportunidad = 0;
var userKey = 0;
var positionSlide = 0;


/********************************
    constantes
*********************************/
// var URL_APP = 'http://www.nosotrasonline.com.co/eventos/colombia/2015/septiembre/frescuraextrema/';
// var URL_APP = 'http://54.174.23.51/eventos/colombia/2015/septiembre/frescuraextrema/';
// var HOSTNAME = 'http://www.nosotrasonline.com.co';
var HOSTNAME = 'http://54.174.23.51';

var generalServiceSetup = {

   nombreJuego: 'frescuraExtrema',
   url: HOSTNAME + '/Plantillas/NOL/ServiciosWeb/ServicioWebReusables.asmx',
   urlJuego: HOSTNAME + '/Plantillas/NOL/ServiciosWeb/ServicioJuegoGeneral.asmx',
   urlTampones: HOSTNAME + '/Plantillas/NOL/ServiciosWeb/ServicioTampones2016.asmx',
   paisCMS: 45,
   paisCRM: 1, /*para Colombia*/
   idGame: 4,
   // idMotivoGame: 5892, /*calidad*/
   idMotivoGame: 7532, /*produccion*/
   idPaisLog: 1, /*para Colombia*/
   cantidadTop: 35
};

var actividadAnalytics = 'RetoClavesTamponesColombia2015';
/********************************
    fin constantes
*********************************/

/*************** Mensajes Error Exito **************************/
var errorMsg = {
    login: {
        error1:"¡Algo no está bien! Ingresa de nuevo tus datos o regístrate para poder participar.",
        error2:"Lo sentimos, esta actividad es solo para usuarias de Colombia"
    },
    claves: {
        exito: '¡Todo un éxitooo! Puedes descontar puntos de tu cuenta de NosotrasOnline para jugar.',
        error1: '¡LA CLAVE YA HA SIDO INGRESADA! Compra nuevos productos Nosotras para ingresar y participar.',
        error2: '¡Ups! la clave no es válida. Vuelve a ingresarla sin puntos, comas, guiones ni espacios.',
        error3: '¡Ups! la clave que ingresaste no es válida, inténtalo de nuevo ingresando una clave de Tampones.'
    },
    finactividad: {
        error1: 'Tu Reto Tampones llegó a su fin. ¡Prepárate para conocer a las ganadoras!'
    }
};
/*************** Mensajes Error Exito **************************/

var _ga ={};
_ga.push =  function(_args) {

    var obj0 = {
        'method': 'send',
        'type': 'event',
        'category': _args[1],
        'action': _args[2],
        'label': _args[3]
    };

    var obj1 = {
        'method': 'p_corporativo.send',
        'type': 'event',
        'category': _args[1],
        'action': _args[2],
        'label': _args[3]
    };

    var obj2 = {
        'method': 'p_pragma.send',
        'type': 'event',
        'category': _args[1],
        'action': _args[2],
        'label': _args[3]
    };

    Analytics.push(obj0);
    Analytics.push(obj1);
    Analytics.push(obj2);
};


function references(){

    SectionHandler.addSections([{
        name: 'home',
        id: '#sectionHome',
        common: '.appSection',
        mode: 'local'
    }, {
        name: 'juego',
        id: '#gameDiv',
        common: '.appSection',
        mode: 'local'
    }]);

    ref.menu = new MenuClass();
    ref.btns = new MenuClass();

    ref.toast = new Toast({
        toastWrapId: 'myToast',
        messageWrap: 'toasMsgWrap',
        closeBtn: 'toastClose',
        autoClose: true
    });

}


function events(){

	$('input').placeholder();

    // ref.btns.addBtn({
    //     type: 'nav',
    //     selector: '.btnPerfil',
    //     action: function() {
    //         ref.lbGifLoader.open();
    //         ref.lbTop.close();
    //         irPerfil();
    //         ref.lbGifLoader.close();
    //         _ga.push(['_trackEvent', actividadAnalytics, 'ClicMenu', 'ImagenPerfil']);
    //     }
    // });

    // ref.btns.addBtn({
    //     type: "redes",
    //     selector: "#btnLogin",
    //     action: function(evt) {
    //         logUser();
    //         _ga.push(['_trackEvent', actividadAnalytics, 'ClicInicioSesion', 'EnviarIniciarSesion']);
    //     }
    // });

    $('#usPws').keypress(function(evt) {
        if (evt.keyCode == 13) {
            logUser();
        }
    });

    $('#btnIngresarClavesSubmit').on('click', function(){
        ingresarClaveHandler();
        _ga.push(['_trackEvent', actividadAnalytics, 'ClicJuego', 'IngresaTuClave']);
    });

    // ref.btns.addBtn({
    //     type: 'nav',
    //     selector: '.btnPremios',
    //     action: function() {
    //         $('.popupsClass').hide();
    //         // ref.lbPerfil.close();
    //         ref.lbPremios.open();
    //     }
    // });

    $('.btnTop').on('click', function(){
        ref.lbGifLoader.open();
        ref.lbTop.open();
        $("#scrollTopId").mCustomScrollbar('update');
        ref.lbGifLoader.close();
        _ga.push(['_trackEvent', actividadAnalytics, 'ClicMenu', 'TopGanadoras']);
    });

    // ref.btns.addBtn({
    //     type: 'nav',
    //     selector: '.btnIrAlJuego',
    //     action: function() {
    //         // ref.lbEndGame.close();
    //         ref.lbGifLoader.open();
    //         $('.popupsClass').hide();
    //         goToPlay();
    //         ref.lbGifLoader.close();
    //     }
    // });

    // ref.btns.addBtn({
    //     type: 'nav',
    //     selector: '#btnIrAlReto1',
    //     action: function() {
    //         // ref.lbEndGame.close();
    //         ref.lbGifLoader.open();
    //         $('.popupsClass').hide();
    //         openGame();
    //         ref.lbGifLoader.close();
    //         _ga.push(['_trackEvent', actividadAnalytics, 'ClicJuego', 'IrAlReto1']);
    //     }
    // });

    // ref.btns.addBtn({
    //     type: 'nav',
    //     selector: '#btnInstrucc',
    //     action: function() {
    //         // ref.lbEndGame.close();
    //         ref.lbInstrucciones.open();
    //         _ga.push(['_trackEvent', actividadAnalytics, 'ClicMenu', 'Instrucciones']);
    //     }
    // });


    $('#lbCloseInstrucciones').on('click', function(){
        $('#instruccionesWrapper').slick('slickGoTo', 0 , true);
    });

    $('.BtnTyC').on('click', function(){
        ref.lbCondiciones.open(); 
        $("#scrollTyC").mCustomScrollbar('update');
        _ga.push(['_trackEvent', actividadAnalytics, 'ClicMenu', 'TerminosYCondiciones']);
	});

    $('#btnMenuHamburguer').on('click' , function(){
        $('#menuHamburguer').toggleClass('showMenu');
        $(this).toggleClass('active');
    });

    $('#returnGame').on('click', function() {
        reloadGame = true;
        // console.log("reloadGame -> ", reloadGame);
        $('.popupsClass').hide();
        if (numOportunidad == 0) {
            ref.lbIngresaClaves.open();
        } else {
            ref.lbTrucos.open();
        }
        _ga.push(['_trackEvent', actividadAnalytics, 'ClicJuego', 'VolverAJugar']);
    });

    $('#btnSalirGame').on('click', function() {
        game.state.start('gameOverSalir');
        _ga.push(['_trackEvent', actividadAnalytics, 'ClicInternaJuego', 'Salir']);
    });

    $('#btnClosePerfil').on('click', function() {
        $('#contPerfil').hide();
    });

    $('#lbCloseEndGame').on('click', function() {
        $('#gameDiv').hide();
        $('.mainWrapper').fadeIn();
    });
    

	/************************
        Eventos Popup
    *************************/


    ref.lbGifLoader = new Popup({
        popupWrapId: "lbGifLoader",
        mainWrap: $(".mainWrapper"),
        beforeOpen: function() {
            window.scrollTo(0, 0);
        }
    });
    
    ref.lbEndGame = new Popup({
        popupWrapId: "lbEndGame",
        closeBtn: $("#lbCloseEndGame"),
        mainWrap: $(".mainWrapper"),
        beforeOpen: function() {
            window.scrollTo(0, 0);
            if (numOportunidad == 0) {
                $('#textolbFinal').html("<p class='textWrapM width90'>¡Ups! No tienes más oportunidades, ingresa más claves y vuelve a jugar.</p>"); 
                $('#returnGame').text("¡Ingresar claves!");   
            } else {
                $('#textolbFinal').html(" <p class='textWrapM width90'>tienes <span class='spanOpor' id='oportunidadesGame'>xx</span> oportunidad.</p> ");
                $('#returnGame').text("¡Volver a jugar!");   
            }
            $('#puntosPartida').text(game.global.score);
            $('#oportunidadesGame').text(numOportunidad);
        },
        onOpen: function() {
            if (numOportunidad == 0) {
                guardarLaPartida(); 
            }
        }
    });

    ref.lbLogin = new Popup({
        popupWrapId: "lbLogin",
        closeBtn: $("#lbCloseLogin"),
        mainWrap: $(".mainWrapper"),
        beforeOpen: function() {
            window.scrollTo(0, 0);
        }
    });

    ref.lbTop = new Popup({
        popupWrapId: "lbTop",
        mainWrap: $(".mainWrapper"),
        closeBtn: $("#lbCloseTop"),
        beforeOpen: function() {
            window.scrollTo(0, 0);
            geTop();
        },
        onOpen: function() {
            $("#scrollTopId").mCustomScrollbar('update');
        }
    });

    ref.lbIngresaClaves = new Popup({
        popupWrapId: "lbIngresaClaves",
        mainWrap: $(".mainWrapper"),
        closeBtn: $("#lbCloseIngresaClaves"),
        beforeOpen: function() {

        },
        onClose:function() {
            // window.scrollTo(0, $("#areaJuego").offset().top);
        }
    });

    ref.lbCondiciones = new Popup({
        popupWrapId: "lbCondiciones",
        mainWrap: $(".mainWrapper"),
        closeBtn: $("#lbCloseCondiciones"),
        beforeOpen: function() {
            window.scrollTo(0, 0);
            var top = $(".scrollTop").scrollTop();
            $(".scrollTop").scrollTop('0');
        },
        onOpen: function() {
            $("#scrollTyC").mCustomScrollbar('update');
        }
    });

    ref.lbInstrucciones = new Popup({
        popupWrapId: "lbInstrucciones",
        mainWrap: $(".mainWrapper"),
        closeBtn: $("#lbCloseInstrucciones"),
        beforeOpen: function() {
            window.scrollTo(0, 0);
            updateCarruselIns();
        }
    });

    ref.lbPremios = new Popup({
        popupWrapId: "lbPremios",
        mainWrap: $(".mainWrapper"),
        closeBtn: $("#lbClosePremios"),
        beforeOpen: function() {
            window.scrollTo(0, 0);

        }
    });

    ref.lbInstrucGame = new Popup({
        popupWrapId: "lbInstruccionesJuego",
        mainWrap: $(".mainWrapper"),
        beforeOpen: function() {
            window.scrollTo(0, 0);
            $('.gameLb').hide();
            // console.log('#juego' + game.global.gameLevel);
            $('#juego' + game.global.gameLevel).show();
            // $('#gameDivCont').css('opacity', 0);
        }
    });

    ref.lbTrucos = new Popup({
        popupWrapId: "lbTrucos",
        mainWrap: $(".mainWrapper"),
        beforeOpen: function() {
            window.scrollTo(0, 0);
        }
    });

    

    /************************
        fin Eventos Popup
    *************************/

    $('.btnJugar').on('click', function(e) {
        // console.log(this.attr("target"));
        reloadGame = true;
        var playTarget = this.getAttribute('play-target');
        // console.log("ir a " + playTarget);
        if(playTarget) {
            ref.lbInstrucGame.close();
            // $('#gameDivCont').css('opacity', 1);
            game.state.start(playTarget);
        }
    });


    // Métricas ----------------------------
    $('#btnPremiosMenu').on('click', function(){
        _ga.push(['_trackEvent', actividadAnalytics, 'ClicMenu', 'Premios']);
    });

    $('#btnJugarHome').on('click', function(){
        _ga.push(['_trackEvent', actividadAnalytics, 'ClicHome', 'EstoyLista']);
    });

    $('#loginOlvidar').on('click', function(){
        _ga.push(['_trackEvent', actividadAnalytics, 'ClicInicioSesion', 'OlvideContrasena']);
    });

    $('#loginRegisto').on('click', function(){
        _ga.push(['_trackEvent', actividadAnalytics, 'ClicInicioSesion', 'Registrarme']);
    });

    $('#botonInsGame1').on('click', function(){
        _ga.push(['_trackEvent', actividadAnalytics, 'ClicJuego', 'ComenzarReto1']);
    });

    $('#botonInsGame2').on('click', function(){
        _ga.push(['_trackEvent', actividadAnalytics, 'ClicJuego', 'ComenzarReto2']);
    });

    $('#botonInsGame3').on('click', function(){
        _ga.push(['_trackEvent', actividadAnalytics, 'ClicJuego', 'ComenzarReto3']);
    });

    $('#botonInsGame4').on('click', function(){
        _ga.push(['_trackEvent', actividadAnalytics, 'ClicJuego', 'ComenzarReto4']);
    });

    $('#ComenzarIns').on('click', function(){
        _ga.push(['_trackEvent', actividadAnalytics, 'ClicInstrucciones', 'Comenzar']);
    });

    $('#IrJuegoPermios').on('click', function(){
        _ga.push(['_trackEvent', actividadAnalytics, 'ClicPremios', 'IrAJugar']);
    });

    
    $('#challenge3Wrapper').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.numberPage').html(nextSlide+1);
        positionSlide++;
    });

    $('#questionsWrapper').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.numberPageCha2').html(nextSlide+1);
        positionSlide++;
    });

};

function getPuntosTotales(){

    ref.lbGifLoader.open();
    var result = Soap.obtenerPuntosTotales({
        idUsuario: UserAPP.get('id'),
        idJuego: generalServiceSetup.idGame,
        idPaisCRM: generalServiceSetup.paisCRM
    });

    // console.log(result);
    ref.lbGifLoader.close();
    return result.Estado.Puntaje;
}


function geTop() {

    var result = Soap.top({
        idJuego: generalServiceSetup.idGame,
        cantidad: generalServiceSetup.cantidadTop,
        idPaisCRM: generalServiceSetup.paisCRM
    });

    renderTop(result.Usuarios);
}


function guardarLaPartida () {
    // console.log(".");
    var result = Soap.guardarPartida({
        idUsuarioClave: md5(Constantes.md5.prefixSalt2 + UserAPP.get('id') + game.global.score + 0 + Constantes.md5.sufixSalt2),
        idUsuario: UserAPP.get('id'),
        idJuego: generalServiceSetup.idGame,
        puntaje: game.global.score,
        vidas: 0,
        claveProducto: userKey,
        idPaisCRM: generalServiceSetup.paisCRM,
        idPaisCMS: generalServiceSetup.paisCMS,
        motivo: generalServiceSetup.idMotivoGame
    });
    // console.log("guardar partida", result);
}


function renderTop(_result) {
    if(_result.length == 0){
        var str = '<div class="topItem">' +
            '<div>' +
            '<div class="topItemName">NOMBRE</div>' +
            '<div class="topItemScore">PUNTAJE</div>' +
            '</div>' +
            '</div>';
    } else{
        var tmpl = '<div class="topItem">' +
            '<div>' +
            '<div class="topItemName"><span>#INDEX </span>#NOMBRE</div>' +
            '<div class="topItemScore">#PUNTAJE</div>' +
            '</div>' +
            '</div>' ;
        var str = '';
        var temp = '';
        _result.forEach(function(el, i, a) {
            temp = tmpl.replace('#INDEX', i + 1);
            temp = temp.replace('#NOMBRE', (el.PrimerNombre + ' ' + el.PrimerApellido).toLowerCase());
            temp = temp.replace('#PUNTAJE', el.Puntos);

            str += temp;
            temp = '';
        });
    }
    $('.topItemWrap').html(str);
    ref.lbGifLoader.close();
}


function ingresarClaveHandler() {
    var clave,
        result;
    clave = $('#inputIngresarClave').val();
    if (!clave) {
        ref.toast.log(errorMsg.claves.error2, 'error');
        return;
    }

    ref.lbGifLoader.open(function() {

        result = Soap.verificarClave({
            idUsuario: UserAPP.get('id'),
            claveProducto: clave,
            idUsuarioClave: md5(Constantes.md5.prefixSalt2 + UserAPP.get('id') + clave + Constantes.md5.sufixSalt2),
            idPaisCMS: generalServiceSetup.paisCMS,
            motivo: generalServiceSetup.idMotivoGame
        });
        // console.log("verificar claves result", result);
        ref.lbGifLoader.close();
        console.log(result);
        if (result.DetalleError.MensajeError == "101: La actividad ha terminado") {
            ref.toast.log(errorMsg.finactividad.error1, 'error');
        } else {

            if (!result.DetalleError.Error) {
                UserAPP.set(result);
                userKey = clave;
                clearInput('#inputIngresarClave');
                $('.popupsClass').hide();
                if (result.ClaveDeTampones) {
                    numOportunidad = 2;
                } else {
                    numOportunidad = 1;
                }
                ref.lbTrucos.open();

            } else if (result.DetalleError.MensajeError == "2: La clave ya fue utilizada") {
                ref.toast.log(errorMsg.claves.error1, 'error');
            } else {
                ref.toast.log(errorMsg.claves.error2, 'error');
            }

        }

    });
}


function verificarLaClave(_laClave) {
    
}

function clearInput(target) {
    $(target).val("");
}


function goToPlay(game){

    whereCallLogin = 'game';
    if (UserAPP.get('nombre1')) {
        if (numOportunidad == 0) {
            ref.lbIngresaClaves.open();
        } else {
            ref.lbTrucos.open();
        }
        // ref.lbTrucos.open();
    } else {
        ref.lbLogin.open();
    }

}

function openGame() {
    $('.mainWrapper').hide();
    $('#gameDiv').fadeIn();

    if (numOportunidad >= 1) {
        numOportunidad -= 1;
        if(reloadGame) {
            game.global.gameLevel = 0;
            game.state.start('preload2');
            // console.log("estado play");
        } else {
            initGame2();
            // console.log("inicializando juego");
        }
    } else {
        numOportunidad = 0;
    }
    // console.log("te quedan", numOportunidad + " oportunidades");
}


function logUser() {
    var login = $('#usLogin').val();
    var pws = $('#usPws').val();
    if (!login || !pws) {
        ref.toast.log(errorMsg.login.error1, 'error');
        return;
    } else {
        ref.lbGifLoader.open(function() {
            if (getLogin({
                    usuario: login,
                    clave: pws
                })) {

                ref.lbLogin.close();
                ref.lbGifLoader.close();
                reOpenCall();
            } else {
                ref.lbGifLoader.close();

                if(ref.userOtroPais){
                    ref.toast.log(errorMsg.login.error2, 'error');
                }else {
                    ref.toast.log(errorMsg.login.error1, 'error');
                }  
            }
        });
    }
} 

function getLogin(p_obj) {
    
    ref.userOtroPais = false;

    var result = Soap.inicioSesion({
        'usuario': p_obj.usuario,
        'clave': p_obj.clave,
        'usuarioClave': md5(Constantes.md5.prefixSalt + p_obj.usuario + Constantes.md5.sufixSalt),
        'contrasenaClave': md5(Constantes.md5.prefixSalt + p_obj.clave + Constantes.md5.sufixSalt)
    });

    // console.log("login:");
    // console.log(result);

    if (!result.Error) {
        var pais = result.Pais;
        if(pais == generalServiceSetup.idPaisLog){
            UserAPP.set(result);
            return true;
        }else if(pais == generalServiceSetup.idPaisLog2){
            ref.userOtroPais = true;
            window.open(generalServiceSetup.urlOtroPais2);
            return false; 
        }else if(pais == generalServiceSetup.idPaisLog3){
            ref.userOtroPais = true;
            window.open(generalServiceSetup.urlOtroPais3);
            return false; 
        }else if(pais == generalServiceSetup.idPaisLog4){
            ref.userOtroPais = true;
            window.open(generalServiceSetup.urlOtroPais4);
            return false; 
        }else{
            ref.userOtroPais = true;
            return false;
        }  
    } else {
        ref.userOtroPais = false;
        return false;
    }
}

function reOpenCall(){

    if(whereCallLogin == 'perfil'){
        // ref.lbPerfil.open();
        openPerfil();
    }else{
        ref.lbIngresaClaves.open();
        // ref.lbTrucos.open();
    }
}

function irPerfil() {
    // $('.popupsWrap').hide();
    $('.popupsClass').hide();
    if (UserAPP.get('nombre1')) {
        // ref.lbPerfil.open();
        openPerfil();
    } else {
        ref.lbLogin.open();
        whereCallLogin = 'perfil';
    }
}

function openPerfil() {
    window.scrollTo(0, 0);
    ref.lbGifLoader.open();
    var puntajeTotal = getPuntosTotales();
    $('#perfilScoreUser').text(puntajeTotal);
    $('#perfilNameUser').text(UserAPP.nombre1);
    $('#contPerfil').show();
    ref.lbGifLoader.close();
}

function setServices(){

    Soap.register({
        alias: 'inicioSesion',
        name: 'IniciarSesion',
        params: ['usuario', 'clave', 'usuarioClave', 'contrasenaClave'],
        url: location.hostname == 'localhost' ? 'dummyServices/login.xml' : generalServiceSetup.url
    });

    Soap.register({
        alias: 'top',
        name: 'ObtenerTopJuego',
        params: ['idJuego', 'cantidad', 'idPaisCRM'],
        url: location.hostname == 'localhost' ? 'dummyServices/top.xml' : generalServiceSetup.urlJuego
    });

    Soap.register({
        alias: 'comprarEntrada',
        name: 'ComprarObjetoValorVariable',
        params: ['idVisitante', 'idProducto', 'textoConfirmacion', 'valor', 'idPaisCMS'],
        url: location.hostname == 'localhost' ? 'dummyServices/compra.xml' : generalServiceSetup.url
    });

    // Soap.register({
    //     alias: 'guardarPartida',
    //     name: 'GuardarPartida',
    //     params: ['idUsuarioClave', 'idUsuario', 'idJuego', 'puntaje', 'vidas', 'idPaisCRM'],
    //     url: location.hostname == 'localhost' ? 'dummyServices/guardarPartida.xml' : generalServiceSetup.urlJuego
    // });

    Soap.register({
        alias: 'guardarPartida',
        name: 'GuardarPartida',
        params: ['idUsuarioClave', 'idUsuario', 'idJuego', 'puntaje', 'vidas', 'claveProducto', 'idPaisCRM', 'idPaisCMS', 'motivo'],
        url: location.hostname == 'localhost' ? 'dummyServices/guardarPartida.xml' : generalServiceSetup.urlTampones
    });

    Soap.register({
        alias: 'verificarClave',
        name: 'VerificarClave',
        params: ['idUsuario', 'claveProducto', 'idUsuarioClave', 'idPaisCMS', 'motivo'],
        url: location.hostname == 'localhost' ? 'dummyServices/ingresoClaveNoRed.xml' : generalServiceSetup.urlTampones
    });

    Soap.register({
        alias: 'obtenerPuntosTotales',
        name: 'ObtenerEstado',
        params: ['idUsuario', 'idJuego', 'idPaisCRM'],
        url: location.hostname == 'localhost' ? 'dummyServices/totalPuntos.xml' : generalServiceSetup.urlJuego
    });

    Soap.register({
        alias: 'ingresarClave',
        name: 'IngresarClaveNoRedimible',
        params: ['idUsuario', 'claveProducto', 'idUsuarioClave', 'idPaisCMS', 'motivo'],
        url: location.hostname == 'localhost' ? 'dummyServices/ingresoClaveNoRed.xml' : generalServiceSetup.urlTampones
    });

}


function iniScroll () {
    $("#scrollTyC").mCustomScrollbar();
    $("#scrollTopId").mCustomScrollbar();
}

function updateCarruselIns(){

    if (flagIniSlick) {
        $('#instruccionesWrapper').slick({
            adaptiveHeight: true,
            infinite: false,
        });
        flagIniSlick = false;
    } else {
        $('#instruccionesWrapper').slick('setPosition');
    }
}


function updateCarruselChallenge3(){

    if (flagIniSlick3) {
        $('#challenge3Wrapper').slick({
            infinite: false,
        });
        flagIniSlick3 = false;
    } else {
        $('#challenge3Wrapper').slick('setPosition');
    }
}

function updateCarruselChallenge2(){

    if (flagIniSlick2) {
        $('#questionsWrapper').slick({
            adaptiveHeight: true,
            infinite: false,
        });
        flagIniSlick2 = false;
    } else {
        $('#questionsWrapper').slick('setPosition');
    }
}

function init() {
    iniScroll();
	references();
	events();
	setServices();

    
    updateCarruselChallenge3();
    updateCarruselChallenge2();
    //numOportunidad = 2;
	// openGame();
} 

window.onload = init;