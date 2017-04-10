var Game = function() {
    this.enemies = this.generateEnemies([]);
    this.difficulty = 1;

}

Game.prototype.update = function() {
    var isNeedToMove = nextAlienMove <= millis();
    if (isNeedToMove) {
        var speed;
        if (maxX >= width - ENEMY_WIDTH) {
            speed = -15;
            maxX = 0;
        } else if (minX <= 0) {
            speed = 15;
            minX = width;
        }
    }



    for (var i = 0; i < this.enemies.length; i++) {
        for (var j = 0; j < this.enemies[i].length; j++) {

            if (isNeedToMove) {
                this.enemies[i][j].move(speed);
            }
            this.enemies[i][j].update();
        }

    }


    if (isNeedToMove) {
        nextAlienMove = millis() + alienDelay;
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

    player.pos.y = -1000;
    console.log('player dead');
}
