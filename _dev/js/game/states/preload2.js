var Arrastrar = Arrastrar || {};
Arrastrar.states = Arrastrar.states || {};

Arrastrar.states.Preload = (function(window, Phaser,Setup) {
    'use strict';
    
    var p;

    function Preload() {};

    p = Preload.prototype;


    p.preload = function() {
        this.game.stage.backgroundColor = '#00F9FF';
        // var loadingLabel = this.game.add.text(this.game.world.centerX, 250, '¡Espera! el juego ya casi comienza.', {
        //     fontSize: 20,
        //     fill: '#fb0081'
        // });
        // loadingLabel.anchor.setTo(0.5, 0.5);
        // var progressBar = this.game.add.sprite(this.game.world.centerX, 300, 'progressBar');
        // progressBar.anchor.setTo(0.5, 0.5);
        // this.game.load.setPreloadSprite(progressBar);

        var loaderAnim = this.game.add.sprite(0, 0, 'loader');
        loaderAnim.anchor.setTo(0.5, 0.5);
        loaderAnim.x = this.game.width / 2;
        loaderAnim.y = this.game.height / 2;
        var runAnim = loaderAnim.animations.add('runAnim');
        loaderAnim.animations.play('runAnim', 30, true);

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
        this.game.load.image('shineGame2', 'img/juego2/shine.png');
        
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
        this.game.load.image('shineGame4', 'img/juego4/shine.png');

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


        ref.lbInstrucGame.open();
        // this.game.state.start('play');
        // game.add.tileSprite(0, 0, 358, 900, 'bkg_game');
    };

    p.update = function() {};

    return Preload;
})(window, Phaser, Setup);
