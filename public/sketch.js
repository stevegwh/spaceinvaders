var ROWS, COLS, ENEMY_WIDTH, ENEMY_HEIGHT, game, player, bullets, ship, invader, started;

function setup() {
    started = false;
    var canvas = createCanvas(400, 600);
    canvas.parent("sketch");
    ROWS = 6;
    COLS = 8;
    ENEMY_WIDTH = 30;
    ENEMY_HEIGHT = 30;

    ship = loadImage('assets/ship.png');
    invader = loadImage('assets/invader.png');
    game = new Game(600, 700, 2);
    player = new Player();

}


var draw = function() {
    background(0);

    if(!started) {
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Space Invaders!", width / 2, height / 2 - 50);
        text("Click to play", width / 2, height / 2 + 150);
    } else if(game.gameOver) {
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("GAME OVER", width / 2, height / 2 - 50);
        text("Score: " + player.score, width / 2, height / 2 + 100);
        text("Click to continue", width / 2, height / 2 + 150);

    } else if(game.levelStart) {
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Level " + game.level, width / 2, height / 2 - 50);
        text("Click to continue", width / 2, height / 2 + 150);

    } else {
        game.update();
    }

}

function mousePressed() {
    if(!started) {
        started = true;
    } else if(game.gameOver) {
        setup();
    } else if(game.levelStart) {
        game.nextLevel();
    }
}
