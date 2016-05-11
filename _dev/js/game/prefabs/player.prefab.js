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
        this.cont = 0;
    };

    p = Player.prototype = Object.create(Phaser.Group.prototype);
    p.constructor = Player;

    p.create = function() {

        this.group = this.game.add.group();
        this.sprite = this.game.add.sprite(this.game.world.centerX, 830-(gameSetup[this.game.global.gameLevel].heightPlayer/2), gameSetup[this.game.global.gameLevel].player);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.game.global.index = 1;

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
                
                if(this.cont == 4){
                    this.game.global.index += 1;
                    if(this.game.global.index > 6) {
                        this.game.global.index = 6;
                    }
                    var str1 = this.game.global.index.toString();
                    var str2 = 'playerGame3';
                    var res = str2.concat(str1);
                    _playerSprite.loadTexture(res, 0, false);
                    this.cont = 0;
                }
                this.cont += 1;
            }

            this.game.global.score += Setup.valuePoint;
            $('#counterScore').html(this.game.global.score);
        }
    }

    return Player;
})(window, Phaser, Prefabs, jQuery, Setup);