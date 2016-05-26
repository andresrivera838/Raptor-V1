var ServicesAPP =  (function(){
	"use strict";
	function ServicesAPP(p_obj) {
		this.user = p_obj.user;
		this.stickers = p_obj.stickers;
		this.persistenceCallback = p_obj.persistenceCallback;
		this.configServices = {
			// killSession: p_obj.configServices.killSession,
			// auth: p_obj.configServices.auth,
			// init: p_obj.configServices.init,
			// clave: p_obj.configServices.clave,
			// participacion: p_obj.configServices.participacion,
			// getDepartamentos: p_obj.configServices.getDepartamentos,
			// getCiudades: p_obj.configServices.getCiudades,
			// add: p_obj.configServices.add,
			downloadFile : p_obj.configServices.downloadFile
			// getTop: p_obj.configServices.getTop,
			// getStickersPkg: p_obj.configServices.getStickersPkg,
			// stickSticker: p_obj.configServices.stickSticker,
			// change:p_obj.configServices.change 
		};
		this.setup(p_obj)
	}
	var p = ServicesAPP.prototype = new  ServicesHandler();
	p.init = function(p_obj) {
		this.post({
			servicio: this.configServices.init,
			parametros: {f:p_obj.idFacebook},
			successCallback: p_obj.successCallback,
			failCallback: p_obj.failCallback
		});
	};

	p.clave = function(p_obj) {
		this.post({
			servicio: this.configServices.clave,
			parametros: {f:p_obj.idFacebook, c:p_obj.claveIngresada},
			successCallback: p_obj.successCallback,
			failCallback: p_obj.failCallback
		});
	};

	p.auth = function (p_obj) {
		//Validar datos
		if(!p_obj.usr || !p_obj.pwd) {
			p_obj.failCallback && p_obj.failCallback();
			return;
		}
		this.post({
			servicio: this.configServices.auth,
			parametros: {u:p_obj.usr,p:p_obj.pwd,c:p_obj.country,f:p_obj.idFacebook},
			successCallback: p_obj.successCallback,
			failCallback: p_obj.failCallback
		});
	};

	p.participacion = function (p_obj) {
		this.post({
			servicio: this.configServices.participacion,
			parametros: {f:p_obj.idFacebook, g:p_obj.gol},
			successCallback: p_obj.successCallback,
			failCallback: p_obj.failCallback
		});
	};

	p.getDepartamentos = function (p_obj){
		this.post({
			servicio: this.configServices.getDepartamentos,
			parametros: {idPais:p_obj.idPais},
			successCallback: p_obj.successCallback,
			failCallback: p_obj.failCallback
		});
	}

	p.getCiudades = function (p_obj){
		this.post({
			servicio: this.configServices.getCiudades,
			parametros: {idDepartamento:p_obj.idDepartamento},
			successCallback: p_obj.successCallback,
			failCallback: p_obj.failCallback
		});
	}

	p.add = function (p_obj){
		this.post({
			servicio: this.configServices.add,
			parametros: {
				primeronom_usr:p_obj.primeronom_usr,
				identificacion_usr: p_obj.identificacion_usr,
				correo_usr: p_obj.correo_usr,
				direccionc_user: p_obj.direccionc_user,
				telefono_user: p_obj.telefono_user,
				departamento_user: p_obj.departamento_user,
				ciudad_user: p_obj.ciudad_user,
				fecha_dia_usr: p_obj.fecha_dia_usr,
				fecha_mes_usr: p_obj.fecha_mes_usr,
				fecha_ano_usr: p_obj.fecha_ano_usr,
				p_periodo: p_obj.p_periodo,
				p_no_periodo: p_obj.p_no_periodo,
				quien_compra: p_obj.quien_compra,
				donde_compra: p_obj.donde_compra,
				contacto: p_obj.contacto
			},
			successCallback: p_obj.successCallback,
			failCallback: p_obj.failCallback
		});
	},

	p.downloadFile = function (p_obj){
		this.post({
			servicio: this.configServices.downloadFile,
			parametros: {
				file_path : p_obj.file_path,
			},
			successCallback: p_obj.successCallback,
			failCallback: p_obj.failCallback
		});
	}


	p = ServicesHandler;
	return new ServicesAPP({
		persistenceCallback: function(response) {
			console.log("persistenceCallback");
			if(response) {
			console.log(response);
				// if(response.data && response.data.USER ){
				// 	var user = response.data.USER;
				// 	this.user.set({
				// 		id:	user.ID,
				// 		nombre:	user.NOMBRE,
				// 	// 	puntos:	user.PUNTOS,
				// 		visitor: user.VISITOR
				// 	});
					

				// 	// $("#puntos_usuario").html(this.user.get("puntos"));
					
				// }
				// if(response.data && response.data.GOLES){
				// 	// var laminas = response.data.LAMINAS;
				// 	// Stickers.set(laminas);
				// 	// $("#num_cuantas").html(Stickers.getPegadas());
				// 	// updateCarruselLaminas && updateCarruselLaminas();
				// 	ConstantesJuego.goles = response.data.GOLES;
				// 	if($(".golesWrap")[0]){
				// 		$(".golesWrap h3").html(ConstantesJuego.goles);
				// 	}
				// }
				// if(response.data && response.data.CLAVES){
				// 	ConstantesJuego.clavesIngresadas = response.data.CLAVES;
				// 	if($(".clavesWrap")[0]){
				// 		$(".clavesWrap h3").html(ConstantesJuego.clavesIngresadas);

				// 	}
				// 	// var laminasNuevas = response.data.E_NUEVAS;
				// 	// Stickers.setNuevas(laminasNuevas);
				// 	// updateCarruselLaminas && updateCarruselLaminas();
				// }

				// if(response.data && response.data.SORPRESAS){
				// 	ConstantesJuego.sorpresas = response.data.SORPRESAS;
				// 	if($(".sorpresasWrap")[0]){
				// 		$(".sorpresasWrap h3").html(ConstantesJuego.sorpresas);
				// 	}
				// 	// var repetidas = response.data.REPETIDAS;
				// 	// $("#num_repetidas").html(repetidas);
				// 	// this.user.set({repetidas: repetidas})
				// }

				// if(response.data && response.data.PARTICIPANTE){
				// 	// var repetidas = response.data.REPETIDAS;
				// 	// $("#num_repetidas").html(repetidas);
				// 	// this.user.set({repetidas: repetidas})
				// }

				// this.stickers.set(laminas)
				
			}
		},
		user: UserAPP,
		pathURL: "php/download_file.php",
		ctx: "?cmd=",
		configServices: {
			// killSession: "init",
			// auth: "auth",
			// init: "init",
			// clave: "clave",
			// participacion: "participacion",
		
			downloadFile: "downloadFile" 
			// getTop: "top",
			// getStickersPkg: "red",
			// stickSticker: "lam",
			// change: "canj"
		}
	});
})();