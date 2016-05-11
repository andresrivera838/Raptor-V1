var ItemsContainer = (function() {
    function ItemsContainer(obj) {
        this.container = new createjs.Container(); 
        this.container.name = obj.name;
        this.name = obj.name;
        this.current_item = undefined;
    }

    var p = ItemsContainer.prototype;
    p.updateSelect = function() {
        var children = this.container.children;
        
        children.forEach(
            function(el, i, array) {
                el.children[0] && (el.children[0].visible = false);
            }, this);
    }   
    p.add = function(container)
    {
        /*if(this.container.getNumChildren()==0)
        {
            this.container.addChild(this.fakeBackground());
        }*/
        this.container.addChild(container);
    }
    
    /*p.fakeBackground = function(){
      var bkg = new createjs.Shape();
      bkg.graphics.beginStroke("#f00");
      bkg.graphics.beginFill(createjs.Graphics.getRGB(0,0,0));
      bkg.graphics.drawRect(0, 0, 852, 340);
      bkg.alpha = .1;
      return bkg;
    }*/

    p.changeIndex = function(opcion)
    {
        if(!this.current_item) {
            return;
        }
        var index;
        if(opcion == "up")
        {
            index = this.container.getChildIndex(this.current_item.item)+1;
        }
        if(opcion == "down")
        {
            index = this.container.getChildIndex(this.current_item.item)-1;
        }   
        this.container.setChildIndex(this.current_item.item, index)
    } 
    p.sendToFront = function(){
        this.changeIndex("up");
    }
    p.sendToBack = function(){
        this.changeIndex("down");
    }
    p.borrar = function()
    {
        if(!this.current_item) {
            return;
        }
        this.container.removeChild(this.current_item.item);
    }
    p.escalar = function(value) {
        if(!this.current_item) {
           return; 
        }
       this.current_item.item.scaleX = value;
       this.current_item.item.scaleY = value;
    }
    p.getScale = function() {
        return {
            x:this.current_item.item.scaleX,
            y:this.current_item.item.scaleY   
        }
    }
    p.girar = function()
    {
        if(!this.current_item) {
            return;
        }
        TweenLite.to(this.current_item.item, 0.5, {rotation: this.current_item.item.rotation + 15, transformOrigin:"50% 50%"});
    }

    p.setup = function(obj)
    {
        /*if(obj.scaleControl)
        {
            $(obj.scaleControl).slider({
                                min: .3,
                                max: 2,
                                step:.1,
                                slide: function( event, ui ) {                                  
                                    if(item)
                                    {
                                        TweenLite.to(item.parent,0.1,{scaleX:ui.value,scaleY:ui.value});
                                        item.parent.removeChildAt(0);
                                        borde = crearBorde();                                    
                                        item.parent.addChildAt(borde,0);
                                        borde.visible = true;
                                    }
                                }       
            });       
        }
                
        $("#div_over_boton_atras").click(function(){
            cambiarIndice('abajo');
        });
        $("#div_over_boton_adelante").click(function(){
            cambiarIndice('arriba');
        });
        $("#boton_eliminar").click(function(){
            eliminar();            
        });
        $("#boton_borrar").click(function(){ 
            borrar();
        });        
        $("#boton_guardar").click(function()
        {
            guardar_collage();            
        }); */
    }

    
    /*p.flip = function(direccion)
    {
        var rx, ry;       
        rx = this.current_item.image.width/2;
        ry = this.current_item.image.height/2;
        if(direccion == "horizontal")
        {
            TweenLite.to(this.current_item,0,{x:rx,scaleX:this.current_item.scaleX*-1,regX:rx});                  
        }
        if(direccion == "vertical")
        {
            TweenLite.to(this.current_item,0,{y:ry,scaleY:this.current_item.scaleY*-1,regY:ry});                  
        }
    }
    p.flipVertical = function()
    {
        this.current_item.flip("vertical");
    }
    p.flipHorizontal = function()
    {
        this.current_item.flip("horizontal");
    }
    p.changeIndex = function(opcion)
    {
        //cambiarIndice(item.parent,stage.getChildIndex(item.parent)-1);
        var index;
        if(opcion == "up")
        {
            index = this.current_item.parent.getChildIndex(this.current_item)+1;
        }
        if(opcion == "down")
        {
            index = this.current_item.parent.getChildIndex(this.current_item)-1;
        }   
        //if (index >= 1 && index < stage.getNumChildren())//El 1 evita que el objeto se vaya por debajo del fondo
        if(index>0 && index < this.current_item.parent.getNumChildren())//El 1 evita que el objeto se vaya por debajo del fondo
        {
            this.current_item.parent.addChildAt(this.current_item, index);
        }
    } 
    p.sendToFront = function(){
        this.current_item.changeIndex("up");
    }
    p.sendToBack = function(){
        this.current_item.changeIndex("down");
    }
    p.createHighlight = function()
    {
        var border = new createjs.Shape();
        border.graphics.beginStroke("#000");
        border.graphics.setStrokeStyle(.5);
        border.graphics.beginFill(createjs.Graphics.getRGB(255,255,255));
        border.snapToPixel = true;
        border.graphics.drawRect(0, 0, this.current_item.width, this.current_item.height);
        border.visible = false;
        border.alpha = .5;
        return border;
    }
    p.addImage = function(obj)
    {
        var mc = new createjs.Container();
        var bitmap = new createjs.Bitmap(obj.url);
        bitmap.cursor = "pointer";
        bitmap.image.onload = function() { stage.update();} //No se necesita porque se va a garantizar que la imagen esta en cache cuando esto se use
        mc.addChild(this.createHighlight());
        mc.addChild(bitmap);
        this.container.addChild(mc);
        this.current_item.onPress = function(evt) {
            var offset = {x:evt.target.x-evt.stageX, y:evt.target.y-evt.stageY};
            var item = evt.target.getChildAt(1);    
            var borde = evt.target.getChildAt(0);
            borde.visible = true;
            //$("#escala").slider("value",item.parent.scaleX);
            // add a handler to the event object's onMouseMove callback
            // this.movieclip will be active until the user releases the mouse button:
            evt.onMouseMove = function(ev) {
                ev.target.x = ev.stageX+offset.x;
                ev.target.y = ev.stageY+offset.y;
            }
            evt.onMouseUp = function(evt){
                //borde.visible = false;
            }
        }   
    } */    

    return ItemsContainer;
})();  
