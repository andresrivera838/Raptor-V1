var customDrawItem = (function() {
    function customDrawItem(obj) {
        console.log("el objeto");
        console.log(obj);
        this.parentContainer = obj.parentContainer;

        this.cursor = "pointer";
        this.item = null;
        this.stage = this.parentContainer.stage;
        this.color = "#828b20";
        this.oldPt =null;
        this.oldMidPt = null;
        this.stroke = 10;
        this.enabled = false;
    }
    // customDrawItem.prototype = new createjs.Container();
    var p = customDrawItem.prototype;
    p.undo = function()
    {
        if(this.item.getNumChildren()>1){//para arreglar que no se borre el primer dibujo
            this.item.removeChildAt(this.item.getNumChildren()-1);
        }
    }

    p.eraseAll = function()
    {
        this.item.removeAllChildren();
        this.item.addChild(new createjs.Shape());//para arreglar que no se borre el primer dibujo
    }

    p.init = function(obj)
    {
        if(obj.enable){
            this.enable();
        }
        console.log("enable drawing mode");
        this.item = new createjs.Container();
        this.item.addChild(new createjs.Shape());//para arreglar que no se borre el primer dibujo
        console.log(this.parentContainer.stage);

        handleMouseDown = handleMouseDown.bind(this);
        handleMouseUp = handleMouseUp.bind(this);

        this.stage.addEventListener("stagemousedown",handleMouseDown);
        this.stage.addEventListener("stagemouseup",handleMouseUp);

        function handleMouseDown(evt){
            if(this.enabled){
                console.log(" mousedown");
                this.item.addChild(new createjs.Shape());
                this.oldPt = new createjs.Point(this.stage.mouseX, this.stage.mouseY);
                this.oldMidPt = this.oldPt;
                handleMouseMove = handleMouseMove.bind(this);
                this.stage.addEventListener("stagemousemove", handleMouseMove);
            }
        }

        function handleMouseMove(evt){
            if(this.enabled){
                console.log(" move");
                var midPt = new createjs.Point(this.oldPt.x + this.stage.mouseX>>1, this.oldPt.y+this.stage.mouseY>>1);
                // this.item.getChildAt(this.item.getNumChildren()-1).graphics.setStrokeStyle(this.stroke, 'round', 'round').beginStroke(this.color).moveTo(midPt.x, midPt.y).curveTo(this.oldPt.x, this.oldPt.y, this.oldMidPt.x, this.oldMidPt.y);
                this.item.getChildAt(this.item.getNumChildren()-1).graphics.setStrokeStyle(this.stroke, 'round', 'round').beginStroke(this.color).moveTo(midPt.x, midPt.y).curveTo(this.oldPt.x, this.oldPt.y, this.oldMidPt.x, this.oldMidPt.y);
                
                this.oldPt.x = this.stage.mouseX;
                this.oldPt.y = this.stage.mouseY;
                this.oldMidPt.x = midPt.x;
                this.oldMidPt.y = midPt.y;
            }
        }

        function handleMouseUp(){
            if(this.enabled){
                console.log("arriba");
                this.stage.removeEventListener("stagemousemove" , handleMouseMove);
            }
        }



        return this.item;
    }

    p.enable = function(){
        // if(this.enabled){
            // console.log("enable");
        this.enabled = true;
    }
    p.disable = function(){
        // if(this.enabled){
        // console.log("disable");
        this.enabled = false;
    }

    p.setColor = function(obj){
        var isHexa  = /^#[0-9A-F]{6}$/i.test(obj.color);
        // console.log("is color? "+isHexa);
        if(isHexa){
            this.color = obj.color;
        }
    }

    p.setStroke = function(obj){
        var isNum  = isInt(obj.stroke);
        // console.log("is num? "+isNum);
        if(isNum){
            this.stroke = obj.stroke;
        }
        function isInt(n) {
           return typeof n === 'number' && n % 1 == 0;
        }
    }

    return customDrawItem;
})();  