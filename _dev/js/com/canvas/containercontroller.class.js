var ContainerController = (function() {
    var tick;
    function ContainerController(obj) {               
        this.stage = new createjs.Stage(obj.canvas_id);
        this.itemContainers = {};

        this.stage.autoClear = false;
        this.stage.enableDOMEvents(true);
        
        createjs.Touch.enable(stage);
        createjs.Ticker.setFPS(24);
        this.stage.enableMouseOver();

        this.currentContainer = "";
        this.stage.addEventListener("stagemousedown",$.proxy(this.removeHightLight,this));

        
        if(!tick) {

          tick = createjs.Ticker.addEventListener("tick", $.proxy(this.repaint,this));
        }

        this.setup();
    }
    var p = ContainerController.prototype;
    
    p.getItem = function(p_name) {
        return this.itemContainers[p_name];
    };
    p.repaint = function(event){
        this.stage.update();
    };
    p.removeHightLight = function() {
      this.currentContainer.updateSelect();
      this.currentContainer.current_item = null;
    };
    p.setup = function(obj){};
    
    p.add = function(itemContainer) {
        this.itemContainers[itemContainer.name] = itemContainer;

        this.stage.addChild(itemContainer.container);
    };
    p.sendToBack = function() {
        this.currentContainer.sendToBack();
    };

    p.sendToFront = function() {
        this.currentContainer.sendToFront();
    };

    p.girar = function() {
        this.currentContainer.girar();
    };

    p.borrar = function() {
        this.currentContainer.borrar();
    };
    p.escalar = function(value) {
        this.currentContainer.escalar(value);
    };
    p.cleanAll = function() {
        for(var i in this.itemContainers) {
            // if((i != "seccion0") && (i != "seccion1")) {
                // console.log(this.itemContainers[i].name)
                this.itemContainers[i].container.removeAllChildren();
            // }
        }
    };
    p.showChildAt = function(name) {   
        var temp,depth;

        if(this.currentContainer.name == name && !this.currentContainer.name) {
          return;
        }
        depth = parseInt(name.split("seccion")[1]);

        for (var i = 0; i <this.stage.getNumChildren(); i++) {            
            this.stage.getChildAt(i).mouseEnabled = false;
            this.stage.getChildAt(i).visible = (i<=depth);
        }
                
        temp = this.stage.getChildByName(name);

        if(temp)
        {
            //this.stage.removeChild(temp);
            //this.stage.addChild(temp);        
            temp.mouseEnabled = true;
            if(this.currentContainer) {
              this.currentContainer.updateSelect();
            }
            this.currentContainer = this.itemContainers[name];
        }
      
    }
    // p.sendToBack = function(opcion)
    // {        
    //     this.stage.addChildAt(this, this.parent.getNumChildren());        
    // }  
    p.save = function(){
        /*var myImage;
        loader.fadeIn();
        if(borde){
            borde.visible = false;
        }
        var logo = new createjs.Bitmap("img/logo_galeria.png");
        logo.image.onload = $.proxy(function(evt) {           
            this.stage.update(); 
        },this);
        logo.x = 154.5;
        logo.y = 352;
        stage.addChild(logo);          
        setTimeout(function(){
            $.ajax({
              type: "POST",
              url: "php/libreria.php",
              data: {
                 cmd: "guardarImagen",
                 img: document.getElementById("lienzo").toDataURL("image/png")
              },
              dataType:"json"
            })
            .success(function(e) {                 
              //{"error":false,"datos":{"imagen":["..\/img\/uploads\/1ab2c2370877ccef2ff040e990c49be0.jpg","..\/img\/uploads\/thumbs\/1ab2c2370877ccef2ff040e990c49be0.jpg"]}}                  
              console.log(e.datos.imagen[0]);
              if(!e.error)
              {
                //window.open(base_url+ans.datos.imagen[0].split("../")[1]);
                imagen_participacion = e.datos.imagen[0];
              }
              else
              {
                alert("Error al crear tu diseño, intenta nuevamente más tarde.");
              }              
              loader.fadeOut();
            })
            .error(function(e){
              loader.fadeOut();
              alert("Error al crear tu diseño, intenta nuevamente más tarde.");
            });
        },1000); */
    }

    return ContainerController;
})();  
