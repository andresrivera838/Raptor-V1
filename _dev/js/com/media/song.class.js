/**
* Esta clase permite controlar la reproduccion de canciones.
*
* @class Song
* @constructor
*/


var Song = function(obj){
	/**
	* Esta propiedad determina si la canción se está o no reproduciendo
	* @property {Boolean} _isPlaying
	*/
	this._isPlaying = false;
	this.audioPath = "audio/sonidos/";
	this.time = null;
	this.name = null;
	this.formatType = null;
	this.genre = null;
	// this._audio = new Audio();
	// this._audio.preload="none";
	this.id = null;
	this.volume = 1;
	this.enableStatistics = true;
	this.obj = null;
	this.init(obj);
	this.onEndedEvent = null;
}

/**
* Este método genera un evento de Google Analytics, este método 
* depende de una instancia de la clase Estadisticas.
* @method statisticsEvent
*
*/
Song.prototype.statisticsEvent = function(event){
	/*
	var myobj = {trigger: this.name,
                      event:this.obj.statistics.event,
                      seccion:this.obj.statistics.seccion,
                      sufijo:this.obj.statistics.sufijo
                  };
    // console.log(myobj);
	Estadisticas.clic(myobj);
	//*/
}

/**
* Este método inicializa la canción
*
* @method init
* @param {Object} obj Objeto con información para la inicialización.
* @param {String} obj.name Nombre de la canción.
* @param {String} obj.id Identificador de la canción.
* @param {Boolean} obj.load Bandera que indica si se debe precargar la canción.
* @param {Boolean} obj.onEndedEvent Evento que se ejecutará añ terminar de reproducirse la canción.
*/
Song.prototype.init = function(obj){
	this.obj = obj;
	this.name = obj.name;
	this.id = obj.id;
	// console.log(this.id);
	// this._audio.src = this._audio.canPlayType("audio/ogg")==""? "audio/mp3/"+this.name+".mp3":"audio/ogg/"+this.name+".ogg";
	// console.log(this._audio.src);

	// if (!createjs.Sound.initializeDefaultPlugins()) {return;}

	// var manifest = [
 //                    {id: this.id ,
 //                     src: this.name + ".ogg"
 //                 	}
 //                ];

	// createjs.Sound.alternateExtensions = ["mp3"]; 
	// var loadProxy = createjs.proxy(this.handleLoad, this);
 //    // createjs.Sound.registerSound(this.audioPath + this.name + ".ogg", this.id);   
	// createjs.Sound.addEventListener("fileload", this.onLoadHandle.bind(this)); 
	// createjs.Sound.registerManifest(manifest, this.audioPath);

	// if(obj.load){
	// 	// console.log("loading");
	// 	// this._audio.load();
	// }

	// if(obj.onEndedEvent){
	// 	this.onEndedEvent = obj.onEndedEvent;
	// }
	// console.log("eveeeeeeeeeeeeeeentooooooooooo");
	// console.log(obj.onEndedEvent);

	// // if(obj.onEndedEvent){
	// // 	var self = this;
	// // 	this.onEnded(function(){
	// // 		// console.log("ha terminado la cancion en song class facilito");
	// // 		self.resetAudio();
	// // 		obj.onEndedEvent();
	// // 	});
	// // }
	var self =  this;
	soundManager.setup({
		  url: '/js/vendor/soundmanager/swf/',
		  onready: function() {
		    self._audio = soundManager.createSound({
		      id: self.id ,
		      url: 'audio/sonidos/'+ self.name + '.mp3'
		    });
		    // self._audio.play();
		  },
		  ontimeout: function() {
		    // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
		  }
	});
}

Song.prototype.handleLoad = function(event) {
    // createjs.Sound.play(event.src);
    // this.displayMessage.innerHTML = "Playing " + event.src;
}

Song.prototype.onLoadHandle = function(evt) {
	if(this._audio) {
		return;
	}
	console.log(this.id);
	this._audio = createjs.Sound.createInstance(this.id); 
	createjs.Sound.removeAllEventListeners("fileload"); 
	 // if(obj.onEndedEvent){
		var self = this;

		// this.onEnded(function(){
		// 	// console.log("ha terminado la cancion en song class facilito");
		// 	// self.resetAudio();

		// 	// obj.onEndedEvent();
		// });
	// }
}

/**
* Este método agrega un evento al fin de la canción 
* para que se ejecute un callback enviado previamente.
* @method onEnded
* @param {Function} param_fcn Callback que se ejecutará al terminar la canción.
*/
Song.prototype.onEnded = function(param_fcn){
		// console.log(this._audio.src);
		this._audio.addEventListener("ended",$.proxy(param_fcn,this));
}
Song.prototype.onStart = function(param_fcn){
		this._audio.addEventListener("play",param_fcn);
}

Song.prototype.pauseAudio = function(param_times){
	if(this._isPlaying && this._audio){
		this._audio.pause();
		this._isPlaying = false;
	}
}

Song.prototype.playAudio = function(param_times){
	// createjs.Sound.play(this.id);
	// console.log(this);
	var self = this;
	if(!this._isPlaying && this._audio){
		console.log("dandole el super playyyyyyyyyyy!!!!");
		this._audio.play({
			onfinish:function(){
				console.log("super EEEEEEEEEEnDDDD");
				console.log(self);
				//ojo al machete de ultima hora
				terminoUnaCancion();

				// self.onEndedEvent();
			}
		});
		// console.log(this);
		// createjs.Sound.play(this.id)
		// if(this._audio.playState == createjs.Sound.PLAY_SUCCEEDED) {
			this._isPlaying = true;
		// }

		if(this.enableStatistics){
			this.statisticsEvent();
		}
	}else if(!this._isPlaying){
		// this._audio = createjs.Sound.play(this.id); 
		// this._audio.play();
		// if(this._audio.playState == createjs.Sound.PLAY_SUCCEEDED) {
		// 	this._isPlaying = true;
		// }else {
		// 	this._audio = null;
		// }
	}
	// console.log(this)
}	
	

Song.prototype.resetAudio = function(){
	// this.pauseAudio();
	// if(this._audio.currentTime != 0){
	// 	this._audio.currentTime = 0;
	// }


	if(this._audio && typeof this._audio.stop === "function") {
		this._audio.stop();
		this._isPlaying = false;
	}else {
		// createjs.Sound.stop(this.id);
		// this._isPlaying = false;

	}
}

/**
* Este método cambia el volumen de la canción
*
* @method setVolume
* @param {String} vol Valor entre 0 y 1 correspondiente al volumen de la canción
*/
Song.prototype.setVolume = function(vol){
	if(this._audio && vol >=0 && vol <=1){
		this._audio.volume = vol;
	}
}

/**
* Este método obtiene el valor actual del volumen de la canción
*
* @method getVolume
* @return {Float} Retorna un número flotante comprendido entre 0 y 1, 
* el cual representa el volumen actual de la canción
*/

Song.prototype.getVolume = function(){
	if(this._audio) {
		return this._audio.volume;	
	}
	return null;
}

Song.prototype.incVolume = function(step){
	var newVolume = this._audio.volume + step;
	if(this._audio && newVolume >=0 && newVolume <=1){
		this._audio.volume = newVolume;
	}
}

Song.prototype.decVolume = function(step){
	var newVolume = this._audio.volume - step;
	if(this._audio && newVolume >=0 && newVolume <=1 ){
		this._audio.volume = newVolume;
	}
}

Song.prototype.mute = function(){
		
	if(this._audio) {
		this._audio.volume = 0;
	}
}


