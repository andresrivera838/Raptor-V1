var Prefabs = Prefabs || {};

Prefabs.UI = (function(window, Phaser, Prefabs, $, Setup) {

    'use strict';
    var p;

    function UI(_game) {
        this.game = game;
    }

    p = UI.prototype = Object.create(Phaser.Group.prototype);
    p.constructor = UI;

    p.create = function() {
        // this.distanceCounter = 0;
        this.logoNol = game.add.image(0, 0, 'logo_nol');
        this.logoNol.anchor.setTo( 0, 1 );
        this.logoNol.x = 416;
        this.logoNol.y = game.world.height - 20;

    };

    p.update = function(_player) {

        // this.distanceCounter += this.player.speed / 200;
        
    }

    return UI;
})(window, Phaser, Prefabs, jQuery, Setup);
