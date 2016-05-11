var Animaciones = function(obj){
	this.item = obj.item;
	this.itemJumpFlag = false;
	this.itemJumpFlag = false;
}

Animaciones.prototype.letreroColgando = function(obj){
	if(obj.rotation){
	 	var tl = new TimelineLite({pause:true}); 
		tl.add(TweenLite.to(this.item, obj.duration, {css:{top:obj.top},ease:Back.easeOut})); 
		tl.add(TweenLite.to(this.item,(0.5*obj.duration),{rotation:4}),(0.2*obj.duration));
		tl.add(TweenLite.to(this.item,(0.5*obj.duration),{rotation:-2}),(0.7*obj.duration));
		tl.add(TweenLite.to(this.item,(0.5*obj.duration),{rotation:1}));
		tl.add(TweenLite.to(this.item,(0.5*obj.duration),{rotation:0,onComplete:function(){
			if(obj.callback){
				obj.callback();
			}
		}}));
	   	tl.play();
	}
	else{
		TweenLite.to(this.item, obj.duration, {css:{top:obj.top},onComplete:function(){
			if(obj.callback){
				obj.callback();
			}
		}});
	}
	return this;

}

Animaciones.prototype.bounceItem = function(obj){
	TweenLite.to(this.item, obj.duration, {scale:obj.scale,ease:Back.easeIn,onComplete:function(){
		this.reverse();
	},onReverseComplete:function(){
		if(obj.callback){
			obj.callback();
		}
		this.play();
	}});
}

Animaciones.prototype.itemJump = function(obj){
	var self = this;
	if(this.itemShaking) {
		return this;
	}
	this.itemShaking = true
	TweenLite.to(this.item, obj.duration, {css:{top:obj.top},onComplete:function(){
		this.reverse();
	},onReverseComplete:function(){
		self.itemShaking  = false;
		if(obj.callback){
			obj.callback();
		}
	}});
	return this;
}

Animaciones.prototype.shakeItem = function(obj){
	var self = this;
	if(this.itemJumpFlag) {
		return this;
	}
	this.itemJumpFlag = true
	var tl = new TimelineLite({pause:true}); 
	tl.add(TweenLite.to(this.item,(0.5*obj.duration),{rotation:5}),(0.2*obj.duration));
	tl.add(TweenLite.to(this.item,(0.5*obj.duration),{rotation:-2}),(0.7*obj.duration));
	tl.add(TweenLite.to(this.item,(0.5*obj.duration),{rotation:1}));
	tl.add(TweenLite.to(this.item,(0.5*obj.duration),{rotation:0,onComplete:function(){
		if(obj.callback){
			obj.callback();
		}
		self.itemJumpFlag = false;
	}}));

	return this;
}

Animaciones.prototype.infiniteRotation = function(obj){
	TweenMax.to(this.item, obj.duration, {rotation:"360", onComplete:function(){
		this.reverse();
	},onReverseComplete:function(){
		this.play();
	}});
	return this;
}

