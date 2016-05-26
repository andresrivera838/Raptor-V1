/*
*
*Youtube video js
* media.youtube.js
*
*/

videojs.Youtube=videojs.MediaTechController.extend({init:function(g,k,e){videojs.MediaTechController.call(this,g,k,e);this.features.progressEvents=false;
this.features.timeupdateEvents=false;if(typeof k.source!="undefined"){for(var h in k.source){g.options()[h]=k.source[h];}}this.userQuality=videojs.Youtube.convertQualityName(g.options()["quality"]);
this.player_=g;this.player_el_=document.getElementById(g.id());this.player_el_.className+=" vjs-youtube";if(!!navigator.userAgent.match(/iPhone/i)||!!navigator.userAgent.match(/iPad/i)||!!navigator.userAgent.match(/iPod/i)||!!navigator.userAgent.match(/Android.*AppleWebKit/i)){g.options()["ytcontrols"]=true;
}this.qualityButton=document.createElement("div");this.qualityButton.setAttribute("class","vjs-quality-button vjs-menu-button vjs-control");this.qualityButton.setAttribute("tabindex",0);
var f=document.createElement("div");this.qualityButton.appendChild(f);this.qualityTitle=document.createElement("span");f.appendChild(this.qualityTitle);
var c=document.createElement("div");c.setAttribute("class","vjs-menu");this.qualityButton.appendChild(c);this.qualityMenuContent=document.createElement("ul");
this.qualityMenuContent.setAttribute("class","vjs-menu-content");c.appendChild(this.qualityMenuContent);this.id_=this.player_.id()+"_youtube_api";this.el_=videojs.Component.prototype.createEl("iframe",{id:this.id_,className:"vjs-tech",scrolling:"no",marginWidth:0,marginHeight:0,frameBorder:0,webkitAllowFullScreen:"true",mozallowfullscreen:"true",allowFullScreen:"true"});
this.iframeblocker=videojs.Component.prototype.createEl("div",{className:"iframeblocker"});var i=this;var b=function(){if(i.paused()){i.play();}else{i.pause();
}};this.iframeblocker.addEventListener("click",b);this.iframeblocker.addEventListener("mousemove",function(l){if(!i.player_.userActive()){i.player_.userActive(true);
}l.stopPropagation();l.preventDefault();});if(!this.player_.options()["ytcontrols"]){this.iframeblocker.style.display="block";}this.player_el_.insertBefore(this.iframeblocker,this.player_el_.firstChild);
this.player_el_.insertBefore(this.el_,this.iframeblocker);this.parseSrc(g.options()["src"]);this.playOnReady=this.player_.options()["autoplay"]||false;
var a={enablejsapi:1,iv_load_policy:3,playerapiid:this.id(),disablekb:1,wmode:"transparent",controls:(this.player_.options()["ytcontrols"])?1:0,showinfo:0,modestbranding:1,rel:0,autoplay:(this.playOnReady)?1:0,loop:(this.player_.options()["loop"])?1:0,list:this.playlistId,vq:this.userQuality};
if(typeof a.list=="undefined"){delete a.list;}if(window.location.protocol!="file:"){a.origin=window.location.protocol+"//"+window.location.host;this.el_.src=window.location.protocol+"//www.youtube.com/embed/"+this.videoId+"?"+videojs.Youtube.makeQueryString(a);
}else{this.el_.src="https://www.youtube.com/embed/"+this.videoId+"?"+videojs.Youtube.makeQueryString(a);}var i=this;g.ready(function(){var l=i.player_el_.getElementsByClassName("vjs-control-bar")[0];
l.appendChild(i.qualityButton);if(i.playOnReady&&!i.player_.options()["ytcontrols"]){i.player_.loadingSpinner.show();i.player_.bigPlayButton.hide();}});
if(this.player_.options()["ytcontrols"]){this.player_.controls(false);}else{if(!this.player_.poster()){if(this.videoId==null){this.iframeblocker.style.backgroundColor="black";
}else{this.player_.poster("https://img.youtube.com/vi/"+this.videoId+"/0.jpg");}}}if(videojs.Youtube.apiReady){this.loadYoutube();}else{videojs.Youtube.loadingQueue.push(this);
if(!videojs.Youtube.apiLoading){var j=document.createElement("script");j.src="//www.youtube.com/iframe_api";var d=document.getElementsByTagName("script")[0];
d.parentNode.insertBefore(j,d);videojs.Youtube.apiLoading=true;}}this.on("dispose",function(){this.el_.parentNode.removeChild(this.el_);this.iframeblocker.parentNode.removeChild(this.iframeblocker);
this.qualityButton.parentNode.removeChild(this.qualityButton);this.player_.loadingSpinner.hide();this.player_.bigPlayButton.hide();});}});videojs.Youtube.prototype.parseSrc=function(e){this.srcVal=e;
if(e){var b=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;var a=e.match(b);if(a&&a[2].length==11){this.videoId=a[2];}else{this.videoId=null;
}var d=/[?&]list=([^#\&\?]+)/;a=e.match(d);if(a!=null&&a.length>1){this.playlistId=a[1];}else{if(this.playlistId){delete this.playlistId;}}var c=/[?&]vq=([^#\&\?]+)/;
a=e.match(c);if(a!=null&&a.length>1){this.userQuality=a[1];}}};videojs.Youtube.prototype.src=function(a){if(a){this.parseSrc(a);if(this.videoId==null){this.iframeblocker.style.backgroundColor="black";
this.iframeblocker.style.display="block";}else{this.ytplayer.loadVideoById({videoId:this.videoId,suggestedQuality:this.userQuality});this.player_el_.getElementsByClassName("vjs-poster")[0].style.backgroundImage="url(https://img.youtube.com/vi/"+this.videoId+"/0.jpg)";
this.iframeblocker.style.backgroundColor="";this.iframeblocker.style.display="";this.player_.poster("https://img.youtube.com/vi/"+this.videoId+"/0.jpg");
}}return this.srcVal;};videojs.Youtube.prototype.currentSrc=function(){return"http://www.youtube.com/embed/"+this.videoId;};videojs.Youtube.prototype.load=function(){};
videojs.Youtube.prototype.play=function(){if(this.videoId!=null){if(!this.player_.options()["ytcontrols"]){this.player_.trigger("waiting");}if(this.isReady_){this.ytplayer.playVideo();
}else{this.playOnReady=true;}}};videojs.Youtube.prototype.pause=function(){this.ytplayer.pauseVideo();};videojs.Youtube.prototype.paused=function(){return(this.ytplayer)?(this.lastState!==YT.PlayerState.PLAYING&&this.lastState!==YT.PlayerState.BUFFERING):true;
};videojs.Youtube.prototype.currentTime=function(){return(this.ytplayer&&this.ytplayer.getCurrentTime)?this.ytplayer.getCurrentTime():0;};videojs.Youtube.prototype.setCurrentTime=function(a){this.ytplayer.seekTo(a,true);
this.player_.trigger("timeupdate");};videojs.Youtube.prototype.duration=function(){return(this.ytplayer&&this.ytplayer.getDuration)?this.ytplayer.getDuration():0;
};videojs.Youtube.prototype.volume=function(){if(this.ytplayer&&isNaN(this.volumeVal)){this.volumeVal=this.ytplayer.getVolume()/100;}return this.volumeVal;
};videojs.Youtube.prototype.setVolume=function(a){if(a&&a!=this.volumeVal){this.ytplayer.setVolume(a*100);this.volumeVal=a;this.player_.trigger("volumechange");
}};videojs.Youtube.prototype.muted=function(){return this.mutedVal;};videojs.Youtube.prototype.setMuted=function(a){if(a){this.ytplayer.mute();}else{this.ytplayer.unMute();
}this.mutedVal=a;this.player_.trigger("volumechange");};videojs.Youtube.prototype.buffered=function(){if(this.ytplayer&&this.ytplayer.getVideoBytesLoaded){var a=this.ytplayer.getVideoBytesLoaded();
var d=this.ytplayer.getVideoBytesTotal();if(!a||!d){return 0;}var e=this.ytplayer.getDuration();var c=(a/d)*e;var b=(this.ytplayer.getVideoStartBytes()/d)*e;
return videojs.createTimeRange(b,b+c);}else{return videojs.createTimeRange(0,0);}};videojs.Youtube.prototype.supportsFullScreen=function(){return true;
};videojs.Youtube.isSupported=function(){return true;};videojs.Youtube.canPlaySource=function(a){return(a.type=="video/youtube");};videojs.Youtube.canControlVolume=function(){return true;
};videojs.Youtube.loadingQueue=[];videojs.Youtube.prototype.loadYoutube=function(){this.ytplayer=new YT.Player(this.id_,{events:{onReady:function(a){a.target.vjsTech.onReady();
},onStateChange:function(a){a.target.vjsTech.onStateChange(a.data);},onPlaybackQualityChange:function(a){a.target.vjsTech.onPlaybackQualityChange(a.data);
},onError:function(a){a.target.vjsTech.onError(a.data);}}});this.ytplayer.vjsTech=this;};videojs.Youtube.makeQueryString=function(a){var c=[];for(var b in a){if(a.hasOwnProperty(b)){c.push(encodeURIComponent(b)+"="+encodeURIComponent(a[b]));
}}return c.join("&");};window.onYouTubeIframeAPIReady=function(){var a;while((a=videojs.Youtube.loadingQueue.shift())){a.loadYoutube();}videojs.Youtube.loadingQueue=[];
videojs.Youtube.apiReady=true;};videojs.Youtube.prototype.onReady=function(){this.isReady_=true;this.triggerReady();this.iframeblocker.style.display="";
this.player_.loadingSpinner.hide();if(this.player_.options()["muted"]){this.setMuted(true);}if(this.playOnReady){this.playOnReady=false;this.play();}};
videojs.Youtube.prototype.updateQualities=function(){var d=this.ytplayer.getAvailableQualityLevels();if(d.length==0){this.qualityButton.style.display="none";
}else{this.qualityButton.style.display="";while(this.qualityMenuContent.hasChildNodes()){this.qualityMenuContent.removeChild(this.qualityMenuContent.lastChild);
}for(var b=0;b<d.length;++b){var c=document.createElement("li");c.setAttribute("class","vjs-menu-item");setInnerText(c,videojs.Youtube.parseQualityName(d[b]));
c.setAttribute("data-val",d[b]);if(d[b]==this.quality){c.classList.add("vjs-selected");}var a=this;c.addEventListener("click",function(){var f=this.getAttribute("data-val");
a.ytplayer.setPlaybackQuality(f);setInnerText(a.qualityTitle,videojs.Youtube.parseQualityName(f));var e=a.qualityMenuContent.querySelector(".vjs-selected");
if(e){e.classList.remove("vjs-selected");}this.classList.add("vjs-selected");});this.qualityMenuContent.appendChild(c);}}};videojs.Youtube.prototype.onStateChange=function(a){if(a!=this.lastState){switch(a){case -1:this.player_.trigger("durationchange");
break;case YT.PlayerState.ENDED:if(!this.player_.options()["ytcontrols"]){this.player_el_.getElementsByClassName("vjs-poster")[0].style.display="block";
this.player_.bigPlayButton.show();}this.player_.trigger("ended");break;case YT.PlayerState.PLAYING:this.player_.bigPlayButton.hide();this.updateQualities();
this.player_.trigger("timeupdate");this.player_.trigger("durationchange");this.player_.trigger("playing");this.player_.trigger("play");break;case YT.PlayerState.PAUSED:this.player_.trigger("pause");
break;case YT.PlayerState.BUFFERING:this.player_.trigger("timeupdate");if(!this.player_.options()["ytcontrols"]){this.player_.trigger("waiting");}break;
case YT.PlayerState.CUED:break;}this.lastState=a;}};videojs.Youtube.convertQualityName=function(a){switch(a){case"144p":return"tiny";case"240p":return"small";
case"360p":return"medium";case"480p":return"large";case"720p":return"hd720";case"1080p":return"hd1080";}return a;};videojs.Youtube.parseQualityName=function(a){switch(a){case"tiny":return"144p";
case"small":return"240p";case"medium":return"360p";case"large":return"480p";case"hd720":return"720p";case"hd1080":return"1080p";}return a;};videojs.Youtube.prototype.onPlaybackQualityChange=function(a){this.quality=a;
setInnerText(this.qualityTitle,videojs.Youtube.parseQualityName(a));switch(a){case"medium":this.player_.videoWidth=480;this.player_.videoHeight=360;break;
case"large":this.player_.videoWidth=640;this.player_.videoHeight=480;break;case"hd720":this.player_.videoWidth=960;this.player_.videoHeight=720;break;case"hd1080":this.player_.videoWidth=1440;
this.player_.videoHeight=1080;break;case"highres":this.player_.videoWidth=1920;this.player_.videoHeight=1080;break;case"small":this.player_.videoWidth=320;
this.player_.videoHeight=240;break;case"tiny":this.player_.videoWidth=144;this.player_.videoHeight=108;break;default:this.player_.videoWidth=0;this.player_.videoHeight=0;
break;}this.player_.trigger("ratechange");};videojs.Youtube.prototype.onError=function(a){this.player_.error=a;this.player_.trigger("error");};function setInnerText(a,c){var b=("innerText" in a)?"innerText":"textContent";
a[b]=c;}(function(){var b=document.createElement("style");b.type="text/css";var a=" .vjs-youtube .vjs-poster { background-size: cover; }.iframeblocker { display:none;position:absolute;top:0;left:0;width:100%;height:100%;cursor:pointer;z-index:2; }.vjs-youtube.vjs-user-inactive .iframeblocker { display:block; } .vjs-quality-button > div:first-child > span:first-child { position:relative;top:7px }";
setInnerText(b,a);document.getElementsByTagName("head")[0].appendChild(b);})();
