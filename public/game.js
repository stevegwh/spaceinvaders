var Game = function() {

    this.enemies = this.generateEnemies([]);
    this.difficulty = 1;
    this.minX = width;
    this.maxX = 0;
    this.verticalMove = false;

    this.alienShotDelay = 500;
    this.nextAlienShotAt = 0;
    this.alienDelay = 1000;
    this.nextAlienMove = 0;

    this.gameOver = false;

}

Game.prototype.update = function() {

    player.update();
    this.hud();


    var isNeedToMove = this.nextAlienMove <= millis();
    if (isNeedToMove) {
        var speed;
        if (this.maxX >= width - (ENEMY_WIDTH * 1.5) && !this.verticalMove) {
            speed = -15;
            this.maxX = 0;
            this.verticalMove = true;
        } else if (this.minX <= 0 + (ENEMY_WIDTH * 0.5) && !this.verticalMove) {
            speed = 15;
            this.minX = width;;
            this.verticalMove = true;
        } else {
            this.verticalMove = false;
        }
    }



    for (var i = 0; i < this.enemies.length; i++) {
        for (var j = 0; j < this.enemies[i].length; j++) {

            if (isNeedToMove) {
                this.enemies[i][j].move(speed, this.verticalMove);
            }
            this.enemies[i][j].update();
        }

    }


    if (isNeedToMove) {
        this.nextAlienMove = millis() + this.alienDelay;
    }

}

Game.prototype.generateEnemies = function(enemies) {

    for (var i = 0; i < ROWS; i++) {
        var newRow = [];
        for (var y = 0; y < COLS; y++) {
            newRow.push(new Enemy(y * 40 + 40, i * 30));
        }
        enemies.push(newRow);
    }
    return enemies;
}

Game.prototype.playerDeath = function() {
    for (var i = player.bullets.length - 1; i > 0; i--) {
        player.bullets.splice(i, 1);
    }
    if(player.lives > 0) {
        player.alive = false;
        player.lives -= 1;
    } else {
         this.gameOver = true;
    }


}

Game.prototype.hud = function() {

    fill(255);
    textSize(16);
    text("score: " + player.score, 10, height - 5);
    text("lives: " + player.lives, width - 68, height - 5);
}
