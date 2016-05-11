var game;

var gameSetup = [
	{
		animacion: false,
		player: 'playerGame1',
		background: 'backgroundGame1',
		obstacle1: 'obstaculoGame11',
		obstacle2: 'obstaculoGame12',
		obstacle3: 'obstaculoGame13',
		particle: 'hit_particleGame1',
		heightPlayer: 231

	},
	{
		animacion: true,
		player: 'playerGame3',
		player2: 'playerGame32',
		player3: 'playerGame33',
		player4: 'playerGame34',
		player5: 'playerGame35',
		player6: 'playerGame36',
		background: 'backgroundGame3',
		obstacle1: 'obstaculoGame31',
		obstacle2: 'obstaculoGame32',
		obstacle3: 'obstaculoGame33',
		particle: 'hit_particleGame3',
		heightPlayer: 386
	}
]

function initGame() {

	game = new Phaser.Game(Setup.GAME_WIDTH, Setup.GAME_HEIGHT, Phaser.AUTO, 'gameDivCont2');

	game.global = {
		gameLevel: 0,
		mute: false,
	    score: 0,
	    index: 1,
	    music: false,
	    power: false
	}

    game.state.add('boot', Game.states.Boot);
    game.state.add('preload', Concentrese.states.Preload);
    game.state.add('play', Concentrese.states.Play);
    game.state.add('gameOver', Concentrese.states.GameOver);

    game.state.start('boot');
}

function init() {
	initGame();
};

window.onload = init;   

'use strict';

/**
* Plugin to make screen shake FX (makes number of short camera movements).
*
*/
Phaser.Plugin.ScreenShake = function(game, parent){
  Phaser.Plugin.call(this, game, parent);

  //settings by default
  this._settings = {
    shakesCount: 0,
    shakeX: true,
    shakeY: true,
    sensCoef: 0.5
  };
  this.game.camera.bounds = null;

  /**
  * screen shake FX.
  */
  this._moveCamera = function(){
    if(this._settings.shakesCount > 0){
      var sens = this._settings.shakesCount * this._settings.sensCoef;

      if(this._settings.shakesCount % 2){
        this.game.camera.x += this._settings.shakeX ? sens : 0;
        this.game.camera.y += this._settings.shakeY ? sens : 0;
      }
      else{
        this.game.camera.x -= this._settings.shakeX ? sens : 0;
        this.game.camera.y -= this._settings.shakeY ? sens : 0;
      }

      this._settings.shakesCount--;

      if(this._settings.shakesCount === 0){
        this.game.camera.setPosition(0, 0);
      }
    }
  };
};

Phaser.Plugin.ScreenShake.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.ScreenShake.prototype.constructor = Phaser.Plugin.ScreenShake;


/**
* Change default settings object values with passed object value.
*
* @method Phaser.Plugin.ScreenShake#setup
* @param {object} [obj] - Passed object to merge
*/
Phaser.Plugin.ScreenShake.prototype.setup = function(obj){
  this._settings = Phaser.Utils.extend(false, this._settings, obj);
};


/**
* Pass value of count shakes.
*
* @method Phaser.Plugin.ScreenShake#shake
* @param {number} [count] - Value of count shakes
*/
Phaser.Plugin.ScreenShake.prototype.shake = function(count){
  this._settings.shakesCount = count;
};

Phaser.Plugin.ScreenShake.prototype.update = function(){
  this._moveCamera();
};

var Prefabs = Prefabs || {};

Prefabs.Background = (function(window, Phaser, Prefabs, $, Setup) {

    'use strict';
    var p;

    function Background(_game) {
        this.game = game;
    }

    p = Background.prototype = Object.create(Phaser.Group.prototype);
    p.constructor = Background;

    p.create = function() {
        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, 1363, gameSetup[this.game.global.gameLevel].background);
    };

    return Background;
})(window, Phaser, Prefabs, jQuery, Setup);

var Prefabs = Prefabs || {};

Prefabs.Card = (function(window, Phaser, Setup) {
    var p;
    var x,
        y;

    function Card(_game, _i, _j, _cols) {
        this.scoreDOM = $('#score');

        x = _i*Setup.CARD_WIDTH;
        y = _j*Setup.CARD_HEIGHT;

        Phaser.Sprite.call(this, _game, x, y, 'cardsCover');
        this.name = squareList[_i*_cols+_j];
        this.setEvents();
        _game.add.existing(this);
    }

    p = Card.prototype = Object.create(Phaser.Sprite.prototype);

    p.constructor = Card;
    p.update = function() {};

    p.setEvents = function() {
        this.inputEnabled = true;
        this.events.onInputDown.add(this.selectCard, this);
    };

    p.selectCard = function(){
        if(!tableBlock){
            this.loadTexture('cards');
            this.frame = this.name;
            if(selectCard1 == null){
                selectCard1 = this;
            }else if(selectCard1 != this){
                tableBlock = true;
                selectCard2 = this;
                this.comparisonCards(selectCard1, selectCard2);
            }else{
                return;
            }
        }
    };

    p.comparisonCards = function(_item1, _item2){
        if(_item1.name == _item2.name){
            this.scorePoint();
            this.game.time.events.add(300, function() {
                _item1.alpha = 0.2;
                _item2.alpha = 0.2;
                _item1.inputEnabled = false;
                _item2.inputEnabled = false;
                tableBlock = false;
                parejasDestapadas += 1;
                if(parejasDestapadas == 18){
                    game.state.start('gameOver');
                }
            });
        }else{
            this.game.time.events.add(400, function() {
                _item1.loadTexture('cardsCover');
                _item2.loadTexture('cardsCover');
                tableBlock = false;
            });
        }

        selectCard1 = null;
        selectCard2 = null;
    };

    p.scorePoint = function(){
        scoreJuego +=Setup.concentreseScore;
        this.scoreDOM.html(scoreJuego);
    };

    return Card;
})(window, Phaser, Setup);

var Prefabs = Prefabs || {};

Prefabs.Obstacles = (function(window, Phaser, Prefabs, $, Setup) {

    'use strict';
    var p;

    function Obstacles(_game, _player) {
        this.game = game;
        this.nextSpawnAt = 0;
        this.player = _player;
    }

    p = Obstacles.prototype = Object.create(Phaser.Group.prototype);
    p.constructor = Obstacles;

    p.create = function() {
        this.group = game.add.group();
        this.group.enableBody = true;
        this.group.physicsBodyType = Phaser.Physics.ARCADE;
        this.group.createMultiple(3, gameSetup[this.game.global.gameLevel].obstacle2, 0, false);
        this.group.createMultiple(3, gameSetup[this.game.global.gameLevel].obstacle2, 0, false);
        this.group.createMultiple(3, gameSetup[this.game.global.gameLevel].obstacle1, 0, false);
        this.group.createMultiple(3, gameSetup[this.game.global.gameLevel].obstacle1, 0, false);
        this.group.createMultiple(4, gameSetup[this.game.global.gameLevel].obstacle3, 0, false);
        this.group.setAll('anchor.x', 0.5);
        this.group.setAll('anchor.y', 0.5);
        // setTimeout(function() {
            this.game.time.events.loop(100, this.spawn, this); 
        // }.bind(this), 2000);
    };

    p.update = function() {},

    p.spawn = function() {
        if (this.nextSpawnAt > this.game.time.now) {
            return;
        }
        this.nextSpawnAt = this.game.time.now + 3000 - this.player.speed * Setup.FACTOR_INCREMENT_DIFFICULTY;
        var newObstacle = this.group.getRandom();
        newObstacle.checkWorldBounds = true;
        newObstacle.events.onOutOfBounds.add(this.eliminarItem, this);

        if(newObstacle.alive) {
            return;
        }

        var randomX = this.game.rnd.integerInRange(50, 490);
        if (newObstacle) {
            newObstacle.reset(randomX, 0);
            newObstacle.body.gravity.y = 400 + this.player.speed * 10;
        } else {
            // console.log("no dead elements!!!!!!!!!!!!!!!");
        }
    },


    p.eliminarItem = function(item) {
        item.kill();
    }

    return Obstacles;
})(window, Phaser, Prefabs, jQuery, Setup);

var Prefabs = Prefabs || {};

Prefabs.Player = (function(window, Phaser, Prefabs, $, Setup) {
    'use strict';
    var p;

    function Player(_game, _speed) {
        this.game = _game;
        this.speed = _speed;
        // this.lives = _lives;
        this.isDead = false;
        this.canMove = true;
        this.thud = this.game.add.audio('power');
        // this.power = this.game.add.audio('power');
        this.moving = this.game.add.audio('moving', 0.8);
        // this.death = this.game.add.audio('death');
        this.rockEmitter = this.game.add.emitter(-100, -100, 100);
        this.rockEmitter.makeParticles(gameSetup[this.game.global.gameLevel].particle);
        this.dustEmitter = this.game.add.emitter(-100, -100, 100);
        this.dustEmitter.makeParticles(gameSetup[this.game.global.gameLevel].particle);
        this.dustEmitter.gravity = 500;
        this.dustEmitter.setAlpha(1, 0, 0);
        this.rockEmitter.gravity = 500;
        this.rockEmitter.setAlpha(1, 0, 0);
    };

    p = Player.prototype = Object.create(Phaser.Group.prototype);
    p.constructor = Player;

    p.create = function() {

        this.group = this.game.add.group();
        this.sprite = this.game.add.sprite(this.game.world.centerX, 830-(gameSetup[this.game.global.gameLevel].heightPlayer/2), gameSetup[this.game.global.gameLevel].player);
        this.sprite.anchor.setTo(0.5, 0.5);

        //Start the player Physics
        this.game.physics.arcade.enable(this.sprite, Phaser.Physics.ARCADE);
        this.game.input.onUp.add(this.move, this);
        this.sprite.body.immovable = true;
        this.group.add(this.sprite);
        this.game.add.tween(this.group)
            .to({
                y: +8
            }, 1200, Phaser.Easing.Sinusoidal.In)
            .to({
                y: 0
            }, 1200, Phaser.Easing.Sinusoidal.In)
            .loop()
            .start();
    };

    p.update = function() {
        if (this.speed < 50) {
            this.speed += 0.008;
        }
    };

    p.move = function(pointer) {
        if (this.canMove) {
            this.canMove = false;
            this.moving.play();
            var tempX;
            if (pointer.x < 70) {
                tempX = 70;
            } else if (pointer.x > Setup.GAME_WIDTH - 66) {
                tempX = 510;
            } else {
                tempX = pointer.x;
            }

            this.game.add.tween(this.group)
                .to({
                    x: tempX - 290
                }, 200, Phaser.Easing.Back.InOut)
                .start();
            this.game.time.events.add(250, (function() {
                this.canMove = true;
            }), this);
        }
    };

    p.onHit = function(_playerSprite, _object) {
        if (_object.name === 'powerup') {

        } else {
            
            this.thud.play();
            _object.kill();
            this.rockEmitter.x = this.dustEmitter.x = _object.x;
            this.rockEmitter.y = this.dustEmitter.y = _object.y;
            this.rockEmitter.start(true, 1000, 250, 10);
            this.dustEmitter.start(true, 1000, 250, 10);

            
            if(gameSetup[this.game.global.gameLevel].animacion) {
                this.game.global.index += 1;
                if(this.game.global.index > 6) {
                    this.game.global.index = 6;
                }
                var str1 = this.game.global.index.toString();
                var str2 = 'playerGame3';
                var res = str2.concat(str1);
                _playerSprite.loadTexture(res, 0, false);
            }

            this.game.global.score += Setup.valuePoint;
            $('#counterScore').html(this.game.global.score);
        }
    }

    return Player;
})(window, Phaser, Prefabs, jQuery, Setup);
var Prefabs = Prefabs || {};

Prefabs.Powers = (function(window, Phaser, Prefabs, $, Setup) {

    'use strict';
    var p;

    function Powers(_game, _player, _cantidad) {
        this.game = game;
        this.nextSpawnAt = 0;
        this.player = _player;
        this.cantidad = _cantidad;
    }

    p = Powers.prototype = Object.create(Phaser.Group.prototype);
    p.constructor = Powers;

    p.create = function() {
        
        var spritePower = 'powerup' + this.game.rnd.integerInRange(1, this.cantidad);
        // console.log(spritePower);
        this.sprite = this.game.add.sprite(0, -240, spritePower);
        this.sprite.name = 'powerup';
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.kill();
        this.game.time.events.loop(18000 - (this.player.speed * 200), this.spawn, this);
        this.game.time.events.loop(5000, this.recycle, this);
    };

    p.spawn = function() {

        var spritePower = 'powerup' + this.game.rnd.integerInRange(1, this.cantidad);
        this.sprite.loadTexture(spritePower, 0, false);

        if (!this.game.global.power) {
            if (this.nextSpawnAt > this.game.time.now) {
            return;
            }
            this.nextSpawnAt = this.game.time.now + 15000 - this.player.speed * 100;
            if (!this.sprite.alive) {
                var random = this.game.rnd.integerInRange(45, 485);
                this.sprite.reset(random, -240);
                this.sprite.body.gravity.y = 200;
            }
        } else {
            return;
        }
        
        
    }

    p.update = function() {};

    p.recycle = function() {
        if (this.sprite.y > this.game.world.height) {
            this.sprite.kill();
        }
    }

    return Powers;
})(window, Phaser, Prefabs, jQuery, Setup);

var Prefabs = Prefabs || {};

Prefabs.UI = (function(window, Phaser, Prefabs, $, Setup) {

    'use strict';
    var p;

    function UI(_game, _player) {
        this.game = game;
        this.player = _player;
    }

    p = UI.prototype = Object.create(Phaser.Group.prototype);
    p.constructor = UI;

    p.create = function() {
        this.distanceCounter = 0;
        this.logoNol = game.add.image(416, 700, 'logo_nol');
        // this.bkgPuntos = game.add.image(376, 15, 'bkg_puntos');
        // this.distanceTraveled = this.game.add.text(435, 33, this.distanceCounter + 'm', {
        //     fontSize: 24,
        //     fill: '#ffffff'
        // });
        // this.emptyHearts = this.game.add.tileSprite(30, 30, 96, 27, 'empty_heart');
        // this.hearts = this.game.add.tileSprite(30, 30, 96, 27, 'full_heart');
        // this.defeat = this.game.add.image(this.game.world.centerX + 20, this.game.world.centerY - 100, 'defeat');
        // this.defeat.alpha = 0;
        // this.defeat.anchor.setTo(0.5, 0.5);
    };

    p.update = function(_player) {

        this.distanceCounter += this.player.speed / 200;
        // this.distanceTraveled.text = Math.ceil(this.distanceCounter) + 'm';
        // this.hearts.width = this.player.lives * 32;
        // this.emptyHearts.width = game.global.lives * 32;
        
    }

    return UI;
})(window, Phaser, Prefabs, jQuery, Setup);

// var Setup = Setup ||  {}; 

// Setup.GAME_WIDTH = 576;
// Setup.GAME_HEIGHT = 830;

// /* Parametros jugador */
// Setup.SPEED_PLAYER = 20;
// // Setup.LIVES = 3;
// Setup.TIME_LEVEL = 25000;
// Setup.FACTOR_INCREMENT_DIFFICULTY = 100; // The more higher, the faster increments difficulty
// Setup.timeLimit = 10;
// Setup.valuePoint = 5;
var Game = Game || {};
Game.states = Game.states || {};

Game.states.Boot = (function(window, Phaser) {
    'use strict'; 
    
    var p; 

    function Boot() {};

    p = Boot.prototype;

    p.preload = function(){
        this.game.load.image('progressBar', 'img/ui/progress_bar.png');
    };

    p.onResize = function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        // this.scale.maxHeight = $('#gameDivCont').height(); 
        // this.scale.maxWidth = $('#gameDivCont').width(); 
        this.scale.maxHeight = window.innerHeight; 
        this.scale.maxWidth = window.innerWidth; 


    };

    p.create = function(){
        this.onResize(); 
        this.game.plugins.screenShake = this.game.plugins.add(Phaser.Plugin.ScreenShake);
        this.game.state.start('preload'); 
        window.addEventListener('resize', this.onResize.bind(this));
    };

    p.update = function(){};

    return Boot;
})(window, Phaser);
var Game2 = Game2 || {};
Game2.states = Game2.states || {};

Game2.states.Boot = (function(window, Phaser) {
    'use strict'; 
    
    var p; 

    function Boot() {};

    p = Boot.prototype;

    p.preload = function(){
        this.game.load.image('progressBar', 'img/ui/progress_bar.png');
    };

    p.onResize = function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        // this.scale.maxHeight = $('#gameDivCont').height(); 
        // this.scale.maxWidth = $('#gameDivCont').width(); 
        this.scale.maxHeight = window.innerHeight; 
        this.scale.maxWidth = window.innerWidth; 


    };

    p.create = function(){
        this.onResize(); 
        this.game.plugins.screenShake = this.game.plugins.add(Phaser.Plugin.ScreenShake);
        this.game.state.start('preload2'); 
        window.addEventListener('resize', this.onResize.bind(this));
    };

    p.update = function(){};

    return Boot;
})(window, Phaser);
var Concentrese = Concentrese || {};
Concentrese.states = Concentrese.states || {};

Concentrese.states.GameOver = (function(window, Phaser, Prefabs) {
    'use strict';
    var p;

    function GameOver() {};

    p = GameOver.prototype;

    p.preload = function(){};
    p.create = function(){
    	$('#gameDiv').hide();
        $('.mainWrapper').fadeIn();
    	ref.lbEndGame.open();
    };
    p.update = function(){};

    return GameOver;
})(window, Phaser, Prefabs);
var Arrastrar = Arrastrar || {};
Arrastrar.states = Arrastrar.states || {};

Arrastrar.states.GameOver = (function(window, Phaser, Prefabs) {
    'use strict';
    var p;

    function GameOver() {};

    p = GameOver.prototype;

    p.preload = function(){};
    p.create = function(){
    	$('#gameDiv').hide();
        $('.mainWrapper').fadeIn();
    	ref.lbEndGame.open();
    };
    p.update = function(){};

    return GameOver;
})(window, Phaser, Prefabs);
var Boutique = Boutique || {};
Boutique.states = Boutique.states || {};

Boutique.states.Menu = (function(window, Phaser) {
	'use strict';
	var p;


	function Menu() {}

	p = Menu.prototype;


	p.preload = function(){};
	p.create = function(){};
	p.update = function(){};

	return Menu;
})(window, Phaser);
var Concentrese = Concentrese || {};
Concentrese.states = Concentrese.states || {};

Concentrese.states.Play = (function(window, Phaser, Prefabs) {
    'use strict';
    var p;

    function Play() {
        this.background;
        this.player;
        this.obstacles;
        this.level = 2;
        this.time;
        this.t = Setup.timeLimit;
        this.numGame = 1;
    };

    p = Play.prototype;

    p.preload = function(){

    };

    p.clock = function() {

        $('#gameTime').text(this.t);

        if(this.t > 0) {
            this.t -= 1;
            this.game.time.events.add(Phaser.Timer.SECOND, this.clock, this);
        } else {
            this.endTime();
        }
    }

    p.create = function(){
        game.global.lives = 3;
        this.level = 2;
        this.game.world.setBounds(-20, -20, this.game.width + 20, game.height + 20);
        this.background = new Prefabs.Background(this.game);
        this.background.create();
        this.player = new Prefabs.Player(this.game, Setup.SPEED_PLAYER);
        this.player.create();
        this.obstacles = new Prefabs.Obstacles(this.game, this.player);
        this.obstacles.create();
        this.ui = new Prefabs.UI(this.game, this.player);
        this.ui.create();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.clock();
    };

    p.update = function(){
        
        this.player.update();
        this.game.physics.arcade.overlap(this.player.sprite, this.obstacles.group, this.player.onHit, null, this.player);
        this.ui.update();
        this.checkPulse();

    };

    p.checkPulse = function() {
        if (this.player.isDead) {
            this.defeat();
        }
    };

    p.defeat = function() {
        this.hasLost = true;
        this.player.sprite.kill();
        this.player.canMove = false;
        this.player.speed = 0;
        this.game.global.score = Math.ceil(this.ui.distanceCounter);
        this.game.state.start('gameOver');
    };

     p.endTime = function() {

        console.log("terminó el juego "+ game.global.gameLevel);
        

        // if(game.global.gameLevel == 4) {
        //     game.global.gameLevel = 0;
        // } else {
            game.global.gameLevel += 1;
            this.game.state.start('play2');
        // }
        // switch (game.global.gameLevel) {

        //     case 0: this.game.state.start('play2');
        //             game.global.gameLevel += 1;
        //             break;
        //     case 1: this.game.state.start('play');
        //             game.global.gameLevel += 1;
        //             break;
        //     case 2: this.game.state.start('play2');
        //             game.global.gameLevel = 0;
        //             break;
        // }


        // console.log('lose2');
        // game.global.youLose = false;
        // this.game.state.start('preload');
        this.t = Setup.timeLimit;
        
        // currentLevel = 1;
        // game.state.start('gameOver');
        // ref.LbPerdiste.open();
        // $('#gameDiv').css('opacity', '0');
        // $('#sectionGame').hide();
        // $('.mainWrapper').fadeIn();
        // $('body').css('background-color', '#712C19');
        // guardarLaPartida();
        
    }

    return Play;
})(window, Phaser, Prefabs);
var Arrastrar = Arrastrar || {};
Arrastrar.states = Arrastrar.states || {};


Arrastrar.states.Play = (function(window, Phaser, Prefabs) {
    'use strict';
    var p;
    

    function Play() {
        this.level = 2;
        this.time;
        this.t = Setup.timeLimit;
        this.numGame = 1;
    };

    p = Play.prototype;

    p.clock = function() {

        $('#gameTime').text(this.t);
        if(this.t > 0) {
            this.t -= 1;
            this.game.time.events.add(Phaser.Timer.SECOND, this.clock, this);
        } else {
            // this.numGame += 1;
            // console.log(this.numGame);
            this.endTime();
        }
    };

    p.create = function() {

        this.movingObjects = new Prefabs.MovingObjects(this.game);
        this.movingObjects.create();
        this.clock();
    };


    p.update = function() {
        this.movingObjects.update();
    };

    p.endTime = function() {

        console.log("terminó el juego "+ game.global.gameLevel);
            
        this.game.state.start('play');

        if(game.global.gameLevel == 3) {
            game.global.gameLevel = 0;
            // guardarLaPartida();
            this.game.state.start('gameOver2');
        }

        game.global.gameLevel += 1;
        this.t = Setup.timeLimit;
        
    }

    return Play;
})(window, Phaser, Prefabs);
var Concentrese = Concentrese || {};
Concentrese.states = Concentrese.states || {};

Concentrese.states.Preload = (function(window, Phaser,Setup) {
    'use strict';
    
    var p;

    function Preload() {};

    p = Preload.prototype;


    p.preload = function() {

        this.game.stage.backgroundColor = 0x5dffff;
        var loadingLabel = this.game.add.text(this.game.world.centerX, 150, '¡Espera! Esta misión ya casi comienza.', {
            fontSize: 20,
            fill: '#fb0081'
        });

        loadingLabel.anchor.setTo(0.5, 0.5);
        var progressBar = this.game.add.sprite(this.game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        this.game.load.setPreloadSprite(progressBar);

        //Game 1
        // this.game.load.spritesheet('player1', 'img/character/astronaut1.png', 171, 200);
        this.game.load.image('playerGame1', 'img/juego1/player.png' ); //Player
        this.game.load.image('backgroundGame1', 'img/juego1/bkg.jpg'); //Background
        this.game.load.image('obstaculoGame11', 'img/juego1/gota1.png'); //Obstacle
        this.game.load.image('obstaculoGame12', 'img/juego1/gota2.png'); //Obstacle
        this.game.load.image('obstaculoGame13', 'img/juego1/gota3.png'); //Obstacle
        this.game.load.image('hit_particleGame1', 'img/juego1/particle_dust.png'); //Hit Particle
        

        //Game 3
        this.game.load.image('playerGame3', 'img/juego3/player.png' ); //Player 
        this.game.load.image('playerGame32', 'img/juego3/player2.png'); //Player
        this.game.load.image('playerGame33', 'img/juego3/player3.png'); //Player
        this.game.load.image('playerGame34', 'img/juego3/player4.png'); //Player
        this.game.load.image('playerGame35', 'img/juego3/player5.png'); //Player
        this.game.load.image('playerGame36', 'img/juego3/player6.png'); //Player 
        this.game.load.image('backgroundGame3', 'img/juego3/bkg.jpg'); //Background
        this.game.load.image('obstaculoGame31', 'img/juego3/gota1.png'); //Obstacle
        this.game.load.image('obstaculoGame32', 'img/juego3/gota2.png'); //Obstacle
        this.game.load.image('obstaculoGame33', 'img/juego3/gota3.png'); //Obstacle
        this.game.load.image('hit_particleGame3', 'img/juego3/particle_dust.png'); //Hit Particle







        //Lets load sounds
        this.game.load.audio('power', 'audio/powerup.mp3');
        this.game.load.audio('soundtrack_menu', 'audio/technicko.mp3');
        this.game.load.audio('thud', 'audio/thud.mp3');
        this.game.load.audio('moving', 'audio/move.mp3');
        this.game.load.audio('death', 'audio/puff.mp3');


        //UI
        this.game.load.image('empty_heart', 'img/ui/empty_heart.png');
        this.game.load.image('full_heart', 'img/ui/full_heart.png');
        this.game.load.image('defeat', 'img/ui/defeat.png');
        this.game.load.image('bkg_puntos', 'img/ui/img_puntosacum.png');
        this.game.load.image('logo_nol', 'img/ui/logo_nol.png');




    };

    p.create = function() {
        this.game.state.start('play');
        // game.add.tileSprite(0, 0, 358, 900, 'bkg_game');
    };

    p.update = function() {};

    return Preload;
})(window, Phaser, Setup);

var Arrastrar = Arrastrar || {};
Arrastrar.states = Arrastrar.states || {};

Arrastrar.states.Preload = (function(window, Phaser,Setup) {
    'use strict';
    
    var p;

    function Preload() {};

    p = Preload.prototype;


    p.preload = function() {
        this.game.stage.backgroundColor = 0x5dffff;
        var loadingLabel = this.game.add.text(this.game.world.centerX, 150, '¡Espera! Esta misión ya casi comienza.', {
            fontSize: 20,
            fill: '#fb0081'
        });
        loadingLabel.anchor.setTo(0.5, 0.5);
        var progressBar = this.game.add.sprite(this.game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        this.game.load.setPreloadSprite(progressBar);


        //Game 1
        // this.game.load.spritesheet('player1', 'img/character/astronaut1.png', 171, 200);
        this.game.load.image('playerGame1', 'img/juego1/player.png' ); //Player
        this.game.load.image('backgroundGame1', 'img/juego1/bkg.jpg'); //Background
        this.game.load.image('obstaculoGame11', 'img/juego1/gota1.png'); //Obstacle
        this.game.load.image('obstaculoGame12', 'img/juego1/gota2.png'); //Obstacle
        this.game.load.image('obstaculoGame13', 'img/juego1/gota3.png'); //Obstacle
        this.game.load.image('hit_particleGame1', 'img/juego1/particle_dust.png'); //Hit Particle
        
        //Game2
        this.game.load.image('tamponGame2', 'img/juego2/tampon.png');
        this.game.load.image('backgroundGame2', 'img/juego2/bkg.png');
        this.game.load.image('boxGame2', 'img/juego2/box.png');
        
        //Game 3
        this.game.load.image('playerGame3', 'img/juego3/player.png' ); //Player 
        this.game.load.image('playerGame32', 'img/juego3/player2.png'); //Player
        this.game.load.image('playerGame33', 'img/juego3/player3.png'); //Player
        this.game.load.image('playerGame34', 'img/juego3/player4.png'); //Player
        this.game.load.image('playerGame35', 'img/juego3/player5.png'); //Player
        this.game.load.image('playerGame36', 'img/juego3/player6.png'); //Player 
        this.game.load.image('backgroundGame3', 'img/juego3/bkg.jpg'); //Background
        this.game.load.image('obstaculoGame31', 'img/juego3/gota1.png'); //Obstacle
        this.game.load.image('obstaculoGame32', 'img/juego3/gota2.png'); //Obstacle
        this.game.load.image('obstaculoGame33', 'img/juego3/gota3.png'); //Obstacle
        this.game.load.image('hit_particleGame3', 'img/juego3/particle_dust.png'); //Hit Particle
       
        //Game4
        this.game.load.image('backgroundGame4', 'img/juego4/bkg.png');
        this.game.load.image('tamponGame4', 'img/juego4/tampon.png');

        //Lets load sounds
        this.game.load.audio('power', 'audio/powerup.mp3');
        this.game.load.audio('soundtrack_menu', 'audio/technicko.mp3');
        this.game.load.audio('thud', 'audio/thud.mp3');
        this.game.load.audio('moving', 'audio/move.mp3');
        this.game.load.audio('death', 'audio/puff.mp3');

        //UI
        this.game.load.image('empty_heart', 'img/ui/empty_heart.png');
        this.game.load.image('full_heart', 'img/ui/full_heart.png');
        this.game.load.image('defeat', 'img/ui/defeat.png');
        this.game.load.image('bkg_puntos', 'img/ui/img_puntosacum.png');
        this.game.load.image('logo_nol', 'img/ui/logo_nol.png');

    };

    p.create = function() {
        this.game.state.start('play');
        // game.add.tileSprite(0, 0, 358, 900, 'bkg_game');
    };

    p.update = function() {};

    return Preload;
})(window, Phaser, Setup);
