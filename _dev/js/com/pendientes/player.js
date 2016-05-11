var Player = function (){
	this.myPlaylist = [];
	this.actualPlaylist = "musica";
	this.init();
	this.paso = .2;
	this.showOrHideVolume();
}

Player.prototype.showOrHideVolume = function(){

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // some code..
		$(".volume").hide();
		$(".herramientas-player ul").css("width","245px");
    }
}

Player.prototype.init = function(){
	$(".myPlaylists").hide();
	$("#myPlayList_"+this.actualPlaylist).fadeIn(
		function(){
			destroyScroll(".myPlaylists");
			setUpScrolls(".myPlaylists","light",function(){},false);
		});
	this.myPlaylist["musica"] = new Playlist({
        songs:[
          {id:"0",name:"spring"},
          {id:"1",name:"summer"},
          {id:"2",name:"fall"},
          {id:"3",name:"winter"}
        ],
        load:true,
        onEndedEvent: this.onEndedFnc,
        _parent: this,
        statistics: {
	          	event:ConstantesEstadisticas.EVENTO_CLIC,
	            seccion:ConstantesEstadisticas.TRIGGER_MUSICA_DORMIR,
	            sufijo:ConstantesAPP.SUFIJO
        }
      });

	this.myPlaylist["sonidos"] = new Playlist({
        songs:[
          {id:"4",name:"mi_querido_bebe"},
          {id:"5",name:"estrellita_quiero_verte"},
          {id:"6",name:"una_oveja_dormilona"}
          // {id:"0",name:"cuando_tengas_ganas_rocola"},
          // {id:"1",name:"el_payaso_pin_pin_rocola"},
          // {id:"2",name:"los_pollitos_rocola"},
          // {id:"3",name:"materile_rocola"},
          // {id:"4",name:"payasin_payason_rocola"}
        ],
        load:true,
        onEndedEvent: this.onEndedFnc,
        _parent: this,
        statistics: {
	          	event:ConstantesEstadisticas.EVENTO_CLIC,
	            seccion:ConstantesEstadisticas.TRIGGER_SONIDO_DORMIR,
	            sufijo:ConstantesAPP.SUFIJO
        }
  	});
  	this.events();
}


Player.prototype.onEndedFnc = function(){
	// console.log("evento de termino cancion en el player");
	this.myPlaylist[this.actualPlaylist].resetAllSongs();
	$(".myPlaylistsSong").removeClass("selectedSong");
	$(".play").show();
	$(".pause").hide();
}

Player.prototype.events = function(){
	// console.log("asignado eventos");
	$(".play").click($.proxy(function(){
		this.myPlaylist[this.actualPlaylist].resume();
		$(".play").hide();
		$(".pause").show();
		$(".myPlaylistsSong").removeClass("selectedSong");
		$("#myPlaylist_"+this.actualPlaylist+"_song_"+this.myPlaylist[this.actualPlaylist].getActualSongId()).addClass("selectedSong");

	},this));

	$(".pause").click($.proxy(function(){
		this.myPlaylist[this.actualPlaylist].pauseAllSongs();
		$(".play").show();
		$(".pause").hide();
	},this));

	$(".incVolume").click($.proxy(function(){
		this.myPlaylist[this.actualPlaylist].incVolume(this.paso);
	},this));
	$(".decVolume").click($.proxy(function(){
		this.myPlaylist[this.actualPlaylist].decVolume(this.paso);
	},this));
	$(".forward").click($.proxy(function(){
		$(".play").hide();
		$(".pause").show();
		this.myPlaylist[this.actualPlaylist].nextSong();
		$(".myPlaylistsSong").removeClass("selectedSong");
		$("#myPlaylist_"+this.actualPlaylist+"_song_"+this.myPlaylist[this.actualPlaylist].getActualSongId()).addClass("selectedSong");
	},this));
	$(".rewind").click($.proxy(function(){
		$(".play").hide();
		$(".pause").show();
		this.myPlaylist[this.actualPlaylist].prevSong();
		$(".myPlaylistsSong").removeClass("selectedSong");
		$("#myPlaylist_"+this.actualPlaylist+"_song_"+this.myPlaylist[this.actualPlaylist].getActualSongId()).addClass("selectedSong");
	},this));

	$(".changePlaylistBtn").bind("click",{obj:this},function(e){
		var me = e.data.obj;
		var name = (""+e.target.id).split("_")[1];
		me.changePlayList(name);
		
		Estadisticas.clic({trigger: "dormir-pequenin",
                      event:ConstantesEstadisticas.EVENTO_CLIC,
                      seccion: name + "-dormir",
                      sufijo:ConstantesAPP.SUFIJO});

	});

	$(".myPlaylistsSong").bind("click",{obj:this},function(e){
		var me = e.data.obj;
		var myArray = (""+e.target.id).split("_");
		var playListName = myArray[1];
		var songId = myArray[3]; 

		if(me.actualPlaylist == playListName){
			me.myPlaylist[me.actualPlaylist].resetAllSongs();
			me.myPlaylist[me.actualPlaylist].playSong(songId);
			$(".play").hide();
			$(".pause").show();
			$(".myPlaylistsSong").removeClass("selectedSong");
			$("#myPlaylist_"+playListName+"_song_"+songId).addClass("selectedSong");
		}
	});
}

Player.prototype.changePlayList = function(name){
	if(name!=this.actualPlaylist){
		$(".myPlaylistsSong").removeClass("selectedSong");
		// console.log("se ha cambio a la playlist: "+ name);
		this.myPlaylist[name].volume = this.myPlaylist[this.actualPlaylist].volume;
		this.myPlaylist[this.actualPlaylist].resetAllSongs();
		$(".play").show();
		$(".pause").hide();
		this.actualPlaylist = name;

		$(".myPlaylists").hide();
		$("#myPlayList_"+name).fadeIn(
			function(){
				destroyScroll(".myPlaylists");
				setUpScrolls(".myPlaylists","light",function(){},false);
			}
		);
		
	}
}