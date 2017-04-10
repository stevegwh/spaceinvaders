var ROWS, COLS, ENEMY_WIDTH, ENEMY_HEIGHT, game, player, bullets, ship, invader;

function setup() {
    var canvas = createCanvas(400, 600);
    canvas.parent("sketch");
    ROWS = 6;
    COLS = 8;
    ENEMY_WIDTH = 30;
    ENEMY_HEIGHT = 30;

    ship = loadImage('ship.png');
    invader = loadImage('invader.png');
    game = new Game(600, 700);
    player = new Player();

}

function reset(difficulty) {
}


var draw = function() {
    background(0);
    if (!game.gameOver) {
        game.update();
    } else {
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("GAME OVER", width / 2, height / 2 - 50);
        text("Score: " + player.score, width / 2, height / 2 + 100);
        text("Click to play again", width / 2, height / 2 + 150);
    }

}

function mousePressed() {
    if(game.gameOver) {
        setup();
    }
}
