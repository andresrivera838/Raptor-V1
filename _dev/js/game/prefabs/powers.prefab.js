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
