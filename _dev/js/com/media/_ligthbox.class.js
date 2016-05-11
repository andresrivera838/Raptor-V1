var Lightbox = (function() {
    "use strict";
    function Lightbox(p_obj) {
        this.lbCommon = $(p_obj.lbCommon);
        this.lightbox = $(p_obj.lightbox);
        this.internas = $(p_obj.internas);
        this.onClose = p_obj.onClose;
        this.onOpen = p_obj.onOpen;
        this.beforeOpen = p_obj.beforeOpen;
        this.onSubmit = p_obj.btnSubmit && p_obj.btnSubmit.onSubmit;

        this.btnClose = new ButtonClass({
                type: p_obj.btnClose.type,
                name: p_obj.btnClose.name,
                selector: p_obj.btnClose.selector,
                action: this.close.bind(this)
            });

        this.btnSubmit = p_obj.btnSubmit && new ButtonClass({
                type: p_obj.btnSubmit.type,
                name: p_obj.btnSubmit.name,
                selector: p_obj.btnSubmit.selector,
                action: this._onSubmit.bind(this)
            });
    }
    var p = Lightbox.prototype;

    p.init = function(p_obj) { 
        // this.lightbox = obj.lightbox;
        // this.internas = obj.internas;
        // this.btn_cerrar = obj.btn_cerrar; 
        // this.btn_cerrar.click($.proxy(this.cerrar,this));
        //this.btn_cerrar.bind("click",obj,($.proxy(this.cerrar,this)));
    }

    p._onClose =  function() {
        this.onClose && this.onClose()
    }
    p._onOpen =  function() {
        this.onOpen && this.onOpen()
    }
    p._beforeOpen =  function() {
        this.beforeOpen && this.beforeOpen()
    }
    p.close = function(evt, p_onclose) {  
        this.lightbox.fadeOut((function(){
            this._onClose();
            p_onclose && p_onclose();
        }).bind(this));
    }
    p._onSubmit = function() {
        this.onSubmit && this.onSubmit();
    }
    p.disableBtn = function(p_str) {

        switch(p_str) {
                    
            case "both": this.btnSubmit.disable = true;
                        this.btnSubmit.disable = true;
                        break;
            case "submit": this.btnSubmit.disable = true;
                        break;

            case "close": this.btnClose.disable = true;
                        break;
            }

    }
    p.enableBtn = function(p_str) {

        switch(p_str) {
                    
            case "both": this.btnSubmit.disable = false;
                        this.btnSubmit.disable = false;
                        break;
            case "submit": this.btnSubmit.disable = false;
                        break;

            case "close": this.btnClose.disable = false;
                        break;
            }
            
    }

    p.open = function(evt, p_onOpen) { 
        // this.lightbox.css("opacity",0);
        // this.lightbox.show();
        // this.internas.hide();

        this.lbCommon.fadeOut("fast");
        this.beforeOpen && this.beforeOpen();
        this.lightbox.fadeIn((function(){
            this._onOpen();
            p_onOpen && p_onOpen();
        }).bind(this));
    }
    return Lightbox;
})();
