var Bullet = function(x, y) {
    this.width = 5;
    this.height = 5;
    this.pos = createVector(x, y);
    this.velocity = createVector(5, 5);
}

Bullet.prototype.draw = function() {
    ellipse(this.pos.x, this.pos.y, this.width, this.height);
}

Bullet.prototype.playerHit = function() {
    if (player.alive) {
        var d = p5.Vector.dist(this.pos, player.pos);
        if (d < player.height || d < player.width) {
            return true;
        }
    }
}

Bullet.prototype.enemyHit = function() {
    for (i = 0; i < game.enemies.length; i++) {
        for (var y = 0; y < game.enemies[i].length; y++) {
            var d = p5.Vector.dist(this.pos, game.enemies[i][y].pos);
            if (d < game.enemies[i][y].height) {
                game.enemies[i].splice(y, 1);
                y--;
                player.bullets.splice(this, 1);
                game.enemiesLeft--;
                player.score += 10;
            }
        }
    }
}
