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
