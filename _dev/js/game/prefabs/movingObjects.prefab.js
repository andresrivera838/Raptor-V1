var Prefabs = Prefabs || {};

Prefabs.MovingObjects = (function(window, Phaser, Prefabs, $, Setup) {

    'use strict';
    var p;
    var _sprite; 
    var alims;

    function MovingObjects(_game) {
        this.game = _game;
        this.nextSpawnAt = 0;
        // this.player = _player;
        this.moving = this.game.add.audio('moving', 0.8);
        this.objetivo;
        this.brillo;
        this.alimentos;
        this.pesoNum = {};
        this.numAlimentos = 22;                 // Número de objetos móviles
        this.separation = 170;                  // Separación entre objeto y objeto
        this.objetivoWidth = 150;               // Ancho del objetivo
        this.objetivoHeight = 500;              // Alto del objetivo
        this.alimentoWidth = 100;                // Ancho de los objetos móviles   
        this.alimPosY = game.world.height - 185;// Posición en Y de la fila de objetos en la pantalla 
        this.velocity = 4;                      // Velocidad inicial de los objetos
        this.referenceX = 0;
        this.iniCont = false;
        this.iniPosX = 0; 
        this.timer = 0;
        this.boxWidth = 100;
    }

    p = MovingObjects.prototype = Object.create(Phaser.Group.prototype);
    p.constructor = MovingObjects;

    p.create = function() {

        this.game.add.tileSprite( 0, 0, 570, 822, gameSetup[game.global.gameLevel].background );
        this.objetivo = game.add.sprite( game.world.centerX, 20, gameSetup[game.global.gameLevel].targetObject ); // Target
        this.objetivo.anchor.setTo( 0.5, 0 );
        this.brillo = game.add.tileSprite( 0, 0, 300, 200, gameSetup[game.global.gameLevel].shine );
        this.brillo.anchor.setTo(0.5, 0.5);
        this.brillo.x = (game.world.width/2) - 10;
        this.brillo.y = 350;
        this.brillo.alpha = 0;

        if (gameSetup[game.global.gameLevel].isNumObject) {
            this.pesoAcum = game.add.text(0, 0, "0.0 Kg", { font: "55px AmaticBold", fill: "#FFFFFF", wordWrap: true, wordWrapWidth: this.objetivoWidth, align: "center" });
            this.pesoAcum.anchor.setTo( 0.5, 0.5 );
            this.pesoAcum.y = this.objetivoHeight - 125;
            this.pesoAcum.x = game.world.width / 2;
        }
        this.acumNumber = 0;
        

        this.alimentos = game.add.group();

        // ini Objetos en Movimiento ....................................................
        for (var i = 0; i < 5; i++) {

            var comida = this.alimentos.create( this.separation * (i + 1), this.alimPosY, gameSetup[game.global.gameLevel].movingObject, i);
            comida.name = 'caja' + i;
            alims = this.alimentos.getAt(i);                
            alims.anchor.setTo( 0, 0.5 );
            alims.inputEnabled = true;
            alims.flag = false;
            alims.input.enableDrag();
            alims.events.onDragStart.add( this.onDragStart, this );
            alims.events.onDragStop.add( this.onDragStop, this );
            if (gameSetup[game.global.gameLevel].isNumObject) {
                var randomNum = this.game.rnd.integerInRange(1, 3) / 10;
                alims.weight = randomNum;
                this.pesoNum[i] = game.add.text(0, 0, randomNum + " Kg", { font: "50px AmaticBold", fill: "#3C0F7C", wordWrap: true, wordWrapWidth: this.boxWidth, align: "center" });
                this.pesoNum[i].anchor.set(0.5);
            }
        }         
        // end Objetos en Movimiento ....................................................
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    };

    p.onDragStart = function(_sprite, pointer) {

        // console.log("moviste el " + _sprite.name);                      
        this.iniPosX = _sprite.x;                                                    // Guardando la posición del objeto
        // this.spriteFrame = _sprite.frame; 
        this.iniCont = true; 
        _sprite.flag = true;
        this.moving.play();

    };

    p.onDragStop = function(_sprite, pointer) {
        var i;
        var limiteIzq = (game.world.width - this.objetivoWidth)/2, 
            limiteDer = this.objetivoWidth + limiteIzq,
            limiteSup = 180,
            limiteInf = this.objetivoHeight;   

        if (_sprite.y < limiteInf && _sprite.y > limiteSup && _sprite.x > limiteIzq && _sprite.x < limiteDer ) {     // Si encholó el objeto en el objetivo, entonces...
                
            // console.log("entró");
            if (gameSetup[game.global.gameLevel].isNumObject) {
                this.acumNumber += _sprite.weight;
                this.pesoAcum.text =  this.acumNumber.toFixed(1) + " Kg";     
            }
            
            _sprite.alpha = 0;
            _sprite.y = game.world.height;

            this.game.global.score += Setup.valuePoint;
            this.animacionBueno(this.brillo);
            $('#counterScore').html(this.game.global.score);            

        } else {                                                                    // Si NO encholó ningún objeto en el objetivo...
            _sprite.y = this.alimPosY;
            _sprite.alpha = 1; 
        }

        _sprite.x = this.iniPosX + this.referenceX;                                  // ¡calmado! ...deje el objeto donde estaba

        this.iniCont = false;
        _sprite.flag = false;              
        this.referenceX = 0;
        // this.spriteFrame = -1;

    };

    p.animacionMalo = function(brillo) {
        
        var tween = game.add.tween(brillo).to( { alpha: 0.7 }, 50, Phaser.Easing.Bounce.Out, true);
        tween.onComplete.addOnce( function() {tween.to( { alpha: 0 }, 50, Phaser.Easing.Bounce.Out, true);}, this );
        tween.start();

    };

    p.animacionBueno = function(_target) {
        
        var tween = game.add.tween(_target).to( { alpha: 0.7 }, 50, Phaser.Easing.Bounce.Out, true);
        tween.onComplete.addOnce( function() {tween.to( { alpha: 0 }, 50, Phaser.Easing.Bounce.Out, true);}, this );
        tween.start();

    };

    p.update = function() {

        var i, alim;

        var randPos;
           
        for (i = 0; i < 5; i++) {                                   
            alim =  this.alimentos.getAt(i); 
            randPos = game.rnd.integerInRange(0, this.numAlimentos - 1);
            if(!alim.flag) {
                alim.x -= this.velocity;
            }   
            if (alim.x <= -this.alimentoWidth - this.separation) {    
                // alim.frame = randPos;                                               // Muestre un objeto aleatorio
                alim.x = game.world.width;
                alim.y = this.alimPosY;
                alim.alpha = 1;   
            }
            if (gameSetup[game.global.gameLevel].isNumObject) {
                this.pesoNum[i].x = Math.floor(this.alimentos.getAt(i).x + this.alimentos.getAt(i).width / 2);
                this.pesoNum[i].y = Math.floor(this.alimentos.getAt(i).y + this.alimentos.getAt(i).height - 200 / 2);
            }
        }
        if (this.iniCont) {
            this.referenceX -= this.velocity;
            if (this.referenceX <= -this.alimentoWidth - this.separation) {
                this.referenceX = game.world.width;
            } 
        }
        if (this.timer == 350) {
            this.velocity += 1;
            this.timer = 0;
        }
        this.timer += 1;

    };

    return MovingObjects;
})(window, Phaser, Prefabs, jQuery, Setup);
