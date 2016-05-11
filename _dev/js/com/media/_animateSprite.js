function AnimateSprite(p_obj) {
        this.item = document.getElementById(p_obj.item);
        this.noFrames = p_obj.noFrames || 0;
        this.onComplete = p_obj.onComplete || null;
        this.fps = p_obj.fps || 20;
        this.size = {w: 0, h: 0};
        this.bkgPos = {x: 0, y: 0};
        this.loop = p_obj.loop == false? false:true;
        this._currentFrame = 1;
        this._ticker = null;
        this._time = 0;
        // this._animating = false;

    }
    AnimateSprite.prototype = {
        start: function() {
            var objRect = this.item.getBoundingClientRect();
            this.size.w = objRect.width;
            this.size.h = objRect.height;
            
            this.setFPS();
            this.ticker();
        },
        restart: function(p_bool) {
            this._currentFrame = 1;
            this.bkgPos = {x: 0, y: 0};
            this.item.style.backgroundPosition = this.bkgPos.x + "px 0px";
            if(p_bool) {
                this.setFPS();
                this.ticker();
            } 
        },
        animate: function() {
          // console.log("_")
            if(this._currentFrame < this.noFrames) {
                this.bkgPos.x -= this.size.w;
                this._currentFrame++;
            }else {
                if(this.loop) {
                    this.bkgPos.x = 0;
                    this._currentFrame = 0;
                } else {
                    this.destroy();
                    this.onComplete && this.onComplete();
                }
            }
            this.item.style.backgroundPosition = this.bkgPos.x + "px 0px";
        },
        ticker: function() {
            this.destroy();
            this._ticker = setInterval(this.animate.bind(this), this._time);
        },
        // _interval:
        // (function(){
        //     return  
        //             // window.requestAnimationFrame       ||
        //             // window.webkitRequestAnimationFrame ||
        //             // window.mozRequestAnimationFrame    ||
        //             setInterval
        //             // function( p_cb, time ){
        //             //     return setTimeout(
        //             //         (function() {
        //             //           p_cb();
        //             //           this.ticker();
        //             //         }).bind(this), time);
        //             // };
        //     })(),
        // },
        setFPS: function(p_fps) {
            this.fps = p_fps || this.fps;
            this._time = Math.round(1000 / this.fps);

        },
        destroy: function(){
            clearTimeout(this._ticker);
            // clearInterval(this._ticker);
            // this.item = null;
        }

    };