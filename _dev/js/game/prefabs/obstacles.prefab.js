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
