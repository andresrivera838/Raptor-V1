var Preloader = (function(window, undefined){
	'use strict';

	function Preloader() {
		this.loadQueue =  new createjs.LoadQueue(true);
		this.loadQueue.maintainScriptOrder = true;
        this.loadQueue.setMaxConnections(2);
	}

	var _ = Preloader.prototype;

	_.startLoad = function(p_obj) {
		this._itemsToLoad = p_obj.items;
	 	this.loadQueue.loadManifest(this._itemsToLoad);  
	 	this.setProgressHandler(p_obj.progressHandler);
	 	this.setCompleteHandler(p_obj.completeHandler);
	};

	_.getPercentage = function(evt){ 
	 	var loaded = evt.loaded;
	 	return  Math.floor(loaded*100);
	};

	_.setProgressHandler = function(p_progressHandler) {
		this.loadQueue.removeAllEventListeners("progress");
		this.loadQueue.addEventListener("progress", function(evt) {
 			p_progressHandler(evt);
 		});
	};

	_.setCompleteHandler = function(p_completeHandler) {
		this.loadQueue.removeAllEventListeners("complete");
		this.loadQueue.addEventListener("complete", function(evt) {
 			p_completeHandler(evt);
 		});
	};

	_.setItems = function(p_items){
 		this._itemsToLoad = p_items;
	};
	return new Preloader();
})(window, undefined);

/*
_Preloader.prototype.progressHandle = function(event)
{
	// var divBarProgress = document.getElementById("divBarProgress");
 //    divBarProgress.style.width = event.loaded * 400 + "px";
 //    document.getElementById("pPerc").innerHTML = Math.floor(event.loaded*100)+"%";
}
//*/