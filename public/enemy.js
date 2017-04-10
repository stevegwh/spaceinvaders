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
    for (var i = 0; i < this.bullets.length; i++) {
        var eBullet = this.bullets[i];
        eBullet.draw();
        eBullet.pos.y += eBullet.velocity.y;

        if (eBullet.pos.y >= height) {
            this.bullets.splice(i, 1);
            i--;
        }

        if (eBullet.playerHit()) {
            this.bullets.splice(i, 1);
            i--;
            game.playerDeath();
        }
    }
}


Enemy.prototype.move = function(speed) {
    if (speed) {
        this.speed = speed;
    }
    this.pos.x += this.speed;
    minX = Math.min(minX, this.pos.x);
    maxX = Math.max(maxX, this.pos.x);
}

Enemy.prototype.loadBullet = function() {
    var randNo = random(0, 100);
    if (randNo >= 99.9) {
        this.bullets.push(new Bullet(this.pos.x + this.width / 2, this.pos.y + this.height / 2));
    }

}
