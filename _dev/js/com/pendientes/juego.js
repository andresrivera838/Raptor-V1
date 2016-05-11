    var stage,
        bitmap,
        update = true,
        item,
        borde,
        nivel_0,
        nivel_1,
        nivel_2,
        dt,
        termino = false,
        total_encontrados = 0,
        id_tiempo,
        h_t=[],
        s_t;

    function salirJuego()
    {        
        $user.setToken(0);
        $user.setRedension(false);
        termino = false;
        total_encontrados = 0;
        dt = 0;
        clearInterval(id_tiempo);
        ref.contenedor_redes.fadeIn();
    }
    function contar(){
        //console.log(dt);
        clearInterval(id_tiempo);
        //if(++dt<=30 && !termino)        
        ref.control_tiempo.html("<p>"+dt+"</p>");
        if(++dt<=30 && !termino)
        {            
            h_t.push(s_t+""+dt);
            id_tiempo = setInterval(contar,1000);   
        }
        else
        {
            $user.setToken(0);
            $user.setRedension(false);
            if(total_encontrados!=10)
            {
                mostrarMensajeJuego({
                    tipo:"error",
                    callback:function()
                    {
                        ref.lightbox.fadeOut();
                        irA({selector:".contenedor_prehome_juego"});                    
                    }
                });
            }            
        }
    }
    function empezarTiempo(){        
        dt = 0;
        s_t = _.random(0,1000);
        h_t = [];
        clearInterval(id_tiempo);
        id_tiempo = setInterval(contar,1000);
    }    
    function crearBorde()
    {
        var border = new createjs.Shape();
        border.graphics.beginStroke("#000");
        border.graphics.setStrokeStyle(.5);
        border.graphics.beginFill(createjs.Graphics.getRGB(255,255,255));
        border.snapToPixel = true;
        border.graphics.drawRect(0, 0, 266, 276);
        border.visible = false;
        border.alpha = .5;
        return border;
    }    
    function agregarImagen(obj)
    {
        var dragger;
        var container;        
        bitmap = new createjs.Bitmap(obj.url);
        //bitmap.cursor = "pointer";
        bitmap.image.onload = function() { 
            stage.update(); 
        }        
        dragger = new createjs.Container();
        dragger.mouseEnabled = true;
        dragger.cursor = "pointer";
        dragger.params = obj;
        dragger.x = obj.x; 
        dragger.y = obj.y;
        //dragger.scaleX = dragger.scaleY = 1;
        //dragger.addChild(crearBorde());
        dragger.addChild(bitmap);
        //console.log(stage.getNumChildren());
        
        /*if(stage.getNumChildren()==0)
        {                
            container = new createjs.Container();
            stage.addChild(container);
        }*/
        
        if(obj.nivel == 0)
            nivel_0.addChild(dragger);
        else if(obj.nivel == 1)        
            nivel_1.addChild(dragger);
        else if(obj.nivel == 2)        
            nivel_2.addChild(dragger);

        dragger.onPress = function(evt) {
            var offset = {x:evt.target.x-evt.stageX, y:evt.target.y-evt.stageY};
            var obj = evt.target;
            item = evt.target.getChildAt(0); 
            $("."+obj.params.nombre.split(".")[0]).addClass("item_seleccionado");
            //console.log("x:"+obj.x+",y:"+obj.y+" name "+obj.params.nombre+" ocultable "+obj.params.ocultable+" "+obj.params.arrastrable);

            //borde = evt.target.getChildAt(0);
            //borde.visible = true;
            if(obj.params.arrastrable)
            {            
                // add a handler to the event object's onMouseMove callback
                // this will be active until the user releases the mouse button:
                evt.onMouseMove = function(evt) {
                    evt.target.x = evt.stageX+offset.x;
                    evt.target.y = evt.stageY+offset.y;
                }
                evt.onMouseUp = function(evt){
                    //borde.visible = false;
                    $("#coords").append("{x:"+obj.x+",y:"+obj.y+"}\n");
                }
            }
            if(obj.params.ocultable)
            {
                //console.log("total_encontrados: "+total_encontrados);
                TweenLite.to(item,.5,{alpha:0,onComplete:function(){
                            obj.onPress = null;                            
                            if(++total_encontrados == 10)
                            { 
                               clearInterval(id_tiempo);
                               termino = true;                                                            
                               //if((s_t+""+dt)==h_t.pop() && h_t.length==(dt-1)){                                
                                   save({
                                    tiempo:""+dt*1000,
                                    token:$user.getToken(),
                                    callback:function(){
                                        //console.log("Guardo bien! exito");
                                        mostrarMensajeJuego({
                                            tipo:"exito",
                                            callback:function()
                                            {
                                               ref.lightbox.fadeOut();
                                               irA({selector:".contenedor_prehome_juego"});                    
                                            }
                                        });
                                    },
                                    error:function(){
                                        //console.log("Error al guardar");
                                        irA({selector:".contenedor_prehome_juego"});
                                    }
                                   });
                               /*}
                               else
                               {
                                console.log("s_t"+s_t+"_ht"+h_t.pop()+"_dt"+dt+""+h_t.length);
                                console.log("intento fraude juego");
                               }*/
                            }
                         }});                
            }              
            
        }
        
        /*stage.removeChild(stage.getChildAt(0));            
        stage.addChildAt(bitmap,0);*/
               
    }
    function reflejar(direccion)
    {
        var flip;
        var escala;
        var nuevo;
        var direccion;
        var rx, ry;
        if(item)
        {
            rx = item.image.width/2;
            ry = item.image.height/2;
            if(direccion == "horizontal")
            {
                TweenLite.to(item,0,{x:rx,scaleX:item.scaleX*-1,regX:rx});                  
            }
            if(direccion == "vertical")
            {
                TweenLite.to(item,0,{y:ry,scaleY:item.scaleY*-1,regY:ry});                  
            }
        }
    }
    function eliminar()
    {
        if(item)
        {
            stage.removeChild(item.parent);
            item = undefined;
        }           
    }

    function borrar()
    {                
        stage.removeAllChildren();        
    }

    function cambiarIndice(opcion)
    {
        //cambiarIndice(item.parent,stage.getChildIndex(item.parent)-1);
        var index;
        var temp = item.parent;
        if(opcion == "arriba")
        {
            index = stage.getChildIndex(temp)+1;
        }
        if(opcion == "abajo")
        {
            index = stage.getChildIndex(temp)-1;
        }   
        if (index >= 1 && index < stage.getNumChildren())//El 1 evita que el objeto se vaya por debajo del fondo
        {
            stage.addChildAt(temp, index);
        }
    }
    function guardar_collage()
    {
        if(stage.getNumChildren() >= 3 )
        {
            guardarLienzo();
        }
        else
        {

        }
    }
    function init_aplicacion()
    {    
        var obj,
            coords,
            rnd; 

        item = null; 
        total_encontrados = 0;  
        termino = false;             
        stage = new createjs.Stage("lienzo");
        nivel_0 = new createjs.Container();
        nivel_1 = new createjs.Container();
        nivel_2 = new createjs.Container();

        stage.enableMouseOver(); 
        for (var i = 0; i < objetos_escenario.length; i++) {
            obj = objetos_escenario[i];
            obj.url = obj.ruta+obj.nombre;
            agregarImagen(obj);
        };
        rnd = _.random(0, 2);
        for (var i = 0; i < productos.length; i++) {
            obj = productos[i];
            coords = obj.coords[rnd];
            obj.url = obj.ruta+obj.nombre;
            obj.x = coords.x;            
            obj.y = coords.y;
            agregarImagen(obj);
        };                 
        /*stage.addEventListener("stagemousedown",function(){
            if(borde)
            {
                borde.visible = false;
            }               
        });
        */
        ref.contenedor_redes.fadeOut();
        ref.control_tiempo = jQuery(".tiempo_juego");
        console.log(ref.control_tiempo);
        jQuery(".logo_central").addClass("ajuste_logo");      
        jQuery(".item_juego").removeClass("item_seleccionado");
        if(stage.getNumChildren()>0)
        {
            borrar();
        } 
        stage.addChild(nivel_0);
        stage.addChild(nivel_1);
        stage.addChild(nivel_2);
        stage.update();         
        createjs.Ticker.addEventListener("tick",tick);
        empezarTiempo();
    }
    function tick(event) {
            // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
            if (update) {
                //update = false; // only update once
                stage.update(event);
            }
    }    
    function guardarLienzo(){
        var myImage;
        loader.fadeIn();
        if(borde){
            borde.visible = false;
        }
        var logo = new createjs.Bitmap("img/logo_galeria.png");
        logo.image.onload = function(evt) {           
            stage.update(); 
        }
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
              //console.log(e.datos.imagen[0]);
              if(!e.error)
              {
                //window.open(base_url+ans.datos.imagen[0].split("../")[1]);
                imagen_participacion = e.datos.imagen[0];
                if(selecciono=="participa")
                {
                    selecciono = undefined;
                    cargarParticipa();
                }
                if(selecciono=="compartir")
                {
                    selecciono = undefined;
                    cargarCompartir();
                }
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
        },1000); 
    } 