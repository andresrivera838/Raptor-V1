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
