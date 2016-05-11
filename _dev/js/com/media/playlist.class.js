var Playlist = function(obj){
	this.songs =[];
	this._isPlaying = false;
	this.actualSongId = 0;
	this.volume = 1;
	// console.log("el papa!!")
	// console.log(obj._parent);
	this._parent = obj._parent; 
	// this.onEndedEvent = null;
	this.init(obj);
}

Playlist.prototype.getActualSongId = function(){
	return this.actualSongId;
}

Playlist.prototype.setActualSongId = function(valor){
	this.actualSongId = 0;
}

Playlist.prototype.init = function(obj){
	var count = 0;
	// this.onEndedEvent = obj.onEndedEvent;
	// console.log("aqui vamos");
	// console.log(this.onEndedEvent);
	
	for (var i in obj.songs) {
		// var s = new Song({name:"fall",load:true});
		this.songs[count++] = new Song({
			id:obj.songs[i].id, 
			name:obj.songs[i].name,
			load:obj.songs[i].load,
			onEndedEvent: $.proxy(this.onEnded,this),
			statistics: obj.statistics
		});
	};
}

Playlist.prototype.onEnded = function(){
	console.log("hasta aca va bien la cosa en playlist");
	// this._parent.onEndedFnc();


	
	// this.onEndedEvent();
	// console.log(this.onEndedEvent):
	// this.onEndedEvent;
	// console.log(this._parent);
	// console.log(this._parent.onEndedFnc);

}

Playlist.prototype.pauseSong = function(id){
	// if(this.songs[id]._isPlaying){
		this.songs[id].pauseAudio();
		// this.songs[id]._isPlaying = false;
	// }
}

Playlist.prototype.playSong = function(id){
	// console.log(this.songs[id]._isPlaying)
	// if(!this.songs[id]._isPlaying){
		Debug.log("ID cancion "+id);
		this.actualSongId = parseInt(id);
		this.songs[id].setVolume(this.volume);
		this.songs[id].playAudio();
		// this.songs[id]._isPlaying = true;
	// }
}

Playlist.prototype.pauseAllSongs = function(){
	for (var i in this.songs) {
		this.songs[i].pauseAudio();
	};
}

Playlist.prototype.resume = function(){
	this.songs[this.actualSongId].playAudio();
}

Playlist.prototype.resetAllSongs = function(){	
	for (var i in this.songs) {
		this.songs[i].resetAudio();
	};
}

Playlist.prototype.nextSong = function(){
	if(this.actualSongId+1 < this.songs.length)
	{
		this.actualSongId++;
	}
	else
	{
		this.actualSongId = 0;
	}
	this.resetAllSongs();	
	this.playSong(this.actualSongId);
	Debug.log("next "+this.actualSongId);
}

Playlist.prototype.prevSong = function(){
	if(this.actualSongId-1 >=0)
	{
		this.actualSongId--;
	}
	else
	{
		this.actualSongId = this.songs.length-1;
	}
	this.resetAllSongs();	
	this.playSong(this.actualSongId);
	Debug.log("prev "+this.actualSongId);
}

Playlist.prototype.setVolume = function(vol){
	for (var i in this.songs) {
		this.songs[i].setVolume(vol);
	};
}

Playlist.prototype.incVolume = function(step){
	// for (var i in this.songs) {
	// 	this.songs[i].incVolume(step);
	// };
	this.songs[this.actualSongId].incVolume(step);
	this.volume = this.songs[this.actualSongId].getVolume();
}

Playlist.prototype.decVolume = function(step){
	// for (var i in this.songs) {
	// 	this.songs[i].decVolume(step);
	// };
	this.songs[this.actualSongId].decVolume(step);
	this.volume = this.songs[this.actualSongId].getVolume();
}

Playlist.prototype.mute = function(){
	for (var i in this.songs) {
		this.songs[i].mute();
	};
}
