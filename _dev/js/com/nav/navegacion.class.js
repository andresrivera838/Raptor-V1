/**
* Esta es la descripción de la clase
*
* @class Navegacion
* @static
*/

var Navegacion = function()
{
    ConstantesAPP.test = 160;
    this.step = 100;
}
Navegacion._BLANK = "_blank";
Navegacion._SELF = "_self";


/**
* 
* @method getScrollX
* @static
* @return {Float} returns the current horizontal scroll position
*/
Navegacion.getScrollX = function() {
    return (window.pageXOffset != null) ? window.pageXOffset : (document.documentElement.scrollLeft != null) ? document.documentElement.scrollLeft : document.body.scrollLeft;
}

/**
* 
* @method getScrollY
* @static
* @return {Float} returns the current vertical scroll position
*/
Navegacion.getScrollY = function() {
    return (window.pageYOffset != null) ? window.pageYOffset : (document.documentElement.scrollTop != null) ? document.documentElement.scrollTop : document.body.scrollTop;
}
Navegacion.getURLData = function( name ){
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp ( regexS );
    var tmpURL = window.location.href;
    var results = regex.exec( tmpURL );
    if( results == null )
        return"";
    else
        return results[1];
}//unescape(gup("data")),unescape(gup("id"))
Navegacion.getURL = function(obj)
{
    if(obj.target == Navegacion._SELF)
    {        
        location.href = obj.url;
    }
    else{
        window.open(obj.url);
    }
    if(obj.callback)
    {
        obj.callback();
    }
}
Navegacion.prototype.agregarBoton = function(obj)
{
    obj.ref.bind('click', obj , $.proxy(this.abrirSeccion,this));
}
Navegacion.irA = function(obj)
{
    var curScroll = {x:0,y:0};
    var elem = $(obj.etiqueta);  
    // if(obj.dispositivo == Constantes_DISPOSITIVOS.WEB)
    // {
    //     obj.offset = obj.offset?obj.offset:0;
    //     obj.offset = Navegacion.getScrollY() == 0 ? obj.offset:0;        
    // }
    // if(obj.dispositivo == Constantes_DISPOSITIVOS.MOBILE_GENERICA)
    // {        
    // }
    obj.offset = 0;
    curScroll.y = Navegacion.getScrollY();
    //curScroll.y = obj.isDy?getScrollY():0;
    //elemPos = {x:elem.offset().left,y:elem.offset().top}; //- elem.height();
    elemPos = {y:elem.offset().top-obj.offset}; //- elem.height();
    TweenLite.to(curScroll, 1, {y:elemPos.y, 
                            onUpdate:function() { window.scrollTo(curScroll.x, curScroll.y); },
                            onStart:function(){
                                
                            },
                            onComplete:function(){
                                //$("#contenedorFurgon").hide();$("#contenedorFurgon").hide();$("#contenedorEstacas").hide();                           
                                if(obj.callback)
                                {
                                    obj.callback();
                                }                                 
                            }
                        });                 
}
Navegacion.prototype.abrirSeccion = function(e)
{//obj.path:(""+location.href).split("#")[1]
    var data = e.data;    
    if(Constantes_DISPOSITIVOS.ANCHO_ACTUAL > Constantes_DISPOSITIVOS.ANCHO_TABLET)
    {
        if(data.scroll)
        {
            this.irA({etiqueta:data.seccion_web,callback:data.callback,offset:260});
        }
        else
        {        
            ConstantesAPP.lightbox.abrir({
                seccion:data.seccion_web,
                callback:data.callback,
                closeCallback:data.closeCallback?data.closeCallback:undefined
            });
        }
    }

    if(Constantes_DISPOSITIVOS.ANCHO_ACTUAL > Constantes_DISPOSITIVOS.ANCHO_MOBILE && 
       Constantes_DISPOSITIVOS.ANCHO_ACTUAL <= Constantes_DISPOSITIVOS.ANCHO_TABLET)
    {
        this.irA({etiqueta:data.seccion_tablet,callback:data.callback,offset:140});
    }

    if(Constantes_DISPOSITIVOS.ANCHO_ACTUAL <= Constantes_DISPOSITIVOS.ANCHO_MOBILE)
    {        
        this.irA({etiqueta:data.seccion_mobile,callback:data.callback,offset:100});
    }
}
Navegacion.prototype.cargarTag = function(obj)
{       
    
}
Navegacion.prototype.cargarHtml = function(obj)
{
    
    //loader.fadeIn();  
    //location.hash = "arma_tu_estilo_"+tipo;     
    $.ajax({  
        url: obj.url+'?rnd='+Math.random(),  
        success: function(data) {            
            obj.dest.html(data);
            if(obj.callback)
            {                
                obj.callback();
            }
            //loader.fadeOut();             
       }  
    }); 
}


/**
* 
* @method scrollTo
* @static
* @return {Float} Este método hace scroll automático hasta la posición especificada.
* @param {Object} obj Objeto contenedor de parámetros de configuración.
* @param {Int} obj.position objValor en pixeles, a donde debe hacer scroll automático la página.
* @param {Int} obj.time Valor en ms del tiempo de la animación del scroll automático
* @param {Int} obj.time.hueso Valor en ms del tiempo de la animación del scroll automático

*/
Navegacion.scrollTo = function (obj){
    var curScroll = {};
    // var elem = $(obj);
    curScroll.y = Navegacion.getScrollY();
    //curScroll.y = obj.isDy?getScrollY():0;
    //elemPos = {x:elem.offset().left,y:elem.offset().top}; //- elem.height();
    elemPos = {y:obj.position}; //- elem.height();
    TweenLite.to(curScroll, obj.time, {y:elemPos.y, 
        onUpdate:function() { window.scrollTo(curScroll.x, curScroll.y); },
        onStart:function(){
            
        },
        onComplete:function(){
            //$("#contenedorFurgon").hide();$("#contenedorFurgon").hide();$("#contenedorEstacas").hide();                           
                                               
        }
    }); 
}