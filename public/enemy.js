var Enemy = function(x, y) {
    this.height = ENEMY_HEIGHT;
    this.width = ENEMY_WIDTH;
    this.pos = createVector(x, y);
    this.speed = 15;
    this.bullets = [];
}

Enemy.prototype.draw = function() {
    image(invader, this.pos.x, this.pos.y, this.width, this.height);
}

Enemy.prototype.update = function() {
    this.draw();
    this.fire();
}

Enemy.prototype.fire = function() {
    this.loadBullet();
    for (var i = this.bullets.length - 1; i > 0; i--) {
        var eBullet = this.bullets[i];
        eBullet.draw();
        eBullet.pos.y += eBullet.velocity.y;

        if (eBullet.pos.y >= height) {
            this.bullets.splice(i, 1);
        }

        if (eBullet.playerHit()) {
            this.bullets.splice(i, 1);
            game.playerDeath();
        }
    }
}


Enemy.prototype.move = function(speed, verticalMove) {
    if (speed) {
        this.speed = speed;
    }
    /*
    // If vertical move is possible, then check which direction to set
    */
    if (verticalMove) {
        if (this.speed > 0) {
            this.pos.y += this.speed;
        } else {
            this.pos.y -= this.speed;
        }
    } else {
        this.pos.x += this.speed;
        game.minX = Math.min(game.minX, this.pos.x);
        game.maxX = Math.max(game.maxX, this.pos.x);
    }
}

Enemy.prototype.loadBullet = function() {
    var randNo = random(0, 100);
    if (randNo >= 99.9) {
        this.bullets.push(new Bullet(this.pos.x + this.width / 2, this.pos.y + this.height / 2));
    }

}
