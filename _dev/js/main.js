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





function events(){
    
    $('.pruebaBtn').on('click', function(){
        alert("ssss");
    });

};



function getLogin(p_obj) {
    
    ref.userOtroPais = false;

    var result = Soap.inicioSesion({
        'usuario': p_obj.usuario,
        'clave': p_obj.clave,
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

function init() {
	events();
	/*setServices();*/

    //numOportunidad = 2;
	// openGame();
} 

window.onload = init;