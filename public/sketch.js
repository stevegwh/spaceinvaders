var ROWS, COLS, ENEMY_WIDTH, ENEMY_HEIGHT, game, player, bullets, shotDelay, nextShotAt, alienShotDelay, nextAlienShotAt, alienDelay, nextAlienMove, enemies, enemyBullets, invader, minX, maxX;

function setup() {
    var canvas = createCanvas(400, 600);
    canvas.parent("sketch");
    ROWS = 6;
    COLS = 8;
    ENEMY_WIDTH = 30;
    ENEMY_HEIGHT = 30;

    bullets = [];
    shotDelay = 500;
    nextShotAt = 0;
    alienShotDelay = 500;
    nextAlienShotAt = 0;
    alienDelay = 1000;
    nextAlienMove = 0;
    enemyBullets = [];
    minX = width;
    maxX = 0;
    invader = loadImage('invader.png');
    game = new Game();
    player = new Player();

}


var draw = function() {
    background(0);
    game.update();
    player.draw();
    player.fire();


}
