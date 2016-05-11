var Arrastrar = Arrastrar || {};
Arrastrar.states = Arrastrar.states || {};

Arrastrar.states.GameOver = (function(window, Phaser, Prefabs) {
    'use strict';
    var p;

    function GameOver() {};

    p = GameOver.prototype;

    p.preload = function(){};
    p.create = function(){

        if(game.global.gameLevel == 3) {
            //console.log("terminó el juego "+ game.global.gameLevel);
            game.global.gameLevel = 0;
            ref.lbEndGame.open();
        } else {
            //console.log("terminó el juego "+ game.global.gameLevel);
            game.global.gameLevel += 1;
            ref.lbInstrucGame.open();
        }

    };
    p.update = function(){};

    return GameOver;
})(window, Phaser, Prefabs);