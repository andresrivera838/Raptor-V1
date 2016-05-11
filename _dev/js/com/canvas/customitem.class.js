var CustomItem = (function() {
    function CustomItem(obj) {
        this.parent = obj.parent;
        this.mouseEnabled = true;
        this.x = 0;
        this.y = 0;
    }
    // CustomItem.prototype = new createjs.Container();
    var p = CustomItem.prototype;
    p.borrar = function()
    {
        //stage.removeAllChildren();
    }
    p.flip = function(direccion)
    {
        var rx, ry;       
        rx = this.image.width/2;
        ry = this.image.height/2;
        if(direccion == "horizontal")
        {
            TweenLite.to(this,0,{x:rx,scaleX:this.scaleX*-1,regX:rx});                  
        }
        if(direccion == "vertical")
        {
            TweenLite.to(this,0,{y:ry,scaleY:this.scaleY*-1,regY:ry});                  
        }
    }
    p.flipVertical = function()
    {
        this.flip("vertical");
    }
    p.flipHorizontal = function()
    {
        this.flip("horizontal");
    }

    p.createHighlight = function()
    {
        var border = new createjs.Shape();
        border.graphics.beginStroke("#000");
        border.graphics.setStrokeStyle(.5);
        border.graphics.beginFill(createjs.Graphics.getRGB(148,84,162));
        border.snapToPixel = true;
        border.graphics.drawRect(0, 0, 500, 500);
        border.visible = false;
        border.alpha = .5;
        return border;
    }
    p.areaClick = function(rect) {
        var border = new createjs.Shape();
        border.graphics.beginStroke("#000");
        border.graphics.setStrokeStyle(.5);
        border.graphics.beginFill(createjs.Graphics.getRGB(255,31,154));
        border.snapToPixel = true;
        border.graphics.drawRect(0, 0, rect.width, rect.height);
        border.alpha = .01;
        return border;
    }
    p.addImage = function(obj)
    {
        var offset = {x:0, y:0};
        this.item = new createjs.Container();
        // console.log(this.createHighlight())
        this.item.addChild(this.createHighlight());
        this.item.addChild(new createjs.Bitmap(obj.url));
        this.item.addChild(this.areaClick({width: 500, height:500}));
        this.item.cursor = "pointer";

        this.item.regX = 250;
        this.item.regY = 250;

        this.item.x = 426;
        this.item.y = 170;

        this.item.scaleX = 0.5;
        this.item.scaleY = 0.5;

        this.item.addEventListener("onContainerSelect",
            (function(evt){
                this.parent.updateSelect();
                this.parent.current_item = this;
                ref.sliderTamano.slider("value", this.item.scaleX * 100)
            }).bind(this));

        this.item.addEventListener("mousedown",
            (function(evt) {
                this.item.dispatchEvent("onContainerSelect");
                // var item = evt.target.getChildAt(1);    
                var borde = this.item.getChildAt(0);
                borde.visible = true;
                //$("#escala").slider("value",item.parent.scaleX);
                // add a handler to the event object's onMouseMove callback
                // this.movieclip will be active until the user releases the mouse button:
                offset = {x:this.item.x - evt.stageX, y:this.item.y - evt.stageY};
                
            }).bind(this));

        this.item.addEventListener("pressmove", (function(evt) {
            var target = this.item;
            target.x = evt.stageX + offset.x;
            target.y = evt.stageY + offset.y;
        }).bind(this));

        this.item.addEventListener("pressup", function(evt){
            // borde.visible = false;
        });
        // this.item.on("mousedown", function(evt) {
        //         this.parent.addChild(this);
        //         this.offset = {x:this.x-evt.stageX, y:this.y-evt.stageY};
        //     });
            
        //     // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
        // this.item.on("pressmove", function(evt) {
        //         this.x = evt.stageX+ this.offset.x;
        //         this.y = evt.stageY+ this.offset.y;
        //         // indicate that the stage should be updated on the next tick:
        //         update = true;
        // });
        return this.item;
    }   
    
    return CustomItem;
})();  