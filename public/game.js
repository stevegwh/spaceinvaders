var Game = function(currentAlienDelay, currentShotDelay, level) {
    this.level = level;

    this.enemies = this.generateEnemies([]);
    this.minX = width;
    this.maxX = 0;
    this.verticalMove = false;

    this.alienShotDelay = this.setShotDelay(currentShotDelay);
    this.nextAlienShotAt = 0;
    this.alienDelay = this.setAlienDelay(currentAlienDelay);
    this.nextAlienMove = 0;

    this.levelStart = false;
    this.enemiesLeft = COLS * ROWS;
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
        if(this.enemiesLeft > 0) {
            for (var j = 0; j < this.enemies[i].length; j++) {
                // if time to move, then move
                if (isNeedToMove) {
                    // add speed for every enemy missing from array
                    this.enemies[i][j].move(speed, this.verticalMove);
                }
                this.enemies[i][j].update();
            }
        } else {
            this.levelStart = true; //start new level
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

    this.killBullets();
    if(player.lives > 0) {
        player.alive = false;
        player.lives -= 1;
    } else {
         this.gameOver = true;
    }


}

Game.prototype.hud = function() {
    textAlign(LEFT, LEFT);
    fill(255);
    textSize(16);
    text("score: " + player.score, 10, height - 5);
    text("lives: " + player.lives, width - 68, height - 5);
}

Game.prototype.nextLevel = function() {
    this.killBullets();
    player.lives = 3;
    this.level++;
    game = new Game(this.alienDelay, this.alienShotDelay, this.level);

}

Game.prototype.killBullets = function() {
    for (var i = player.bullets.length - 1; i > 0; i--) {
        player.bullets.splice(i, 1);
    }

    for (var x = this.enemies.length - 1; x > 0; x--) {
        this.enemies[x].bullets = [];
    }
}

Game.prototype.setAlienDelay = function(currentAlienDelay) {
    if(currentAlienDelay > 300) {
        return currentAlienDelay - 100;
    } else {
        return 100;
    }
}

Game.prototype.setShotDelay = function(currentShotDelay) {
    if(currentShotDelay > 200) {
        return currentShotDelay - 100;
    } else {
        return 100;
    }
}
