var Player = function() {
    this.pos = createVector(mouseX, height - 20);
    this.height = 10;
    this.width = 30;
    this.bullets = [];
}

Player.prototype.draw = function() {
    this.pos.x = mouseX;
    fill(255, 255, 255);
    var MaxRange = constrain(this.pos.x, 0, width - this.width);
    rect(MaxRange, this.pos.y, this.width, this.height);
}
Player.prototype.fire = function() {
    //draws each bullet and checks to see if they are hitting an enemy
    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].draw();
        this.bullets[i].enemyHit();
        this.bullets[i].pos.y -= this.bullets[i].velocity.y;
        if (this.bullets[i].pos.y <= 0 || this.bullets[i] > height) {
            this.bullets.splice(i, 1);
            i--;
        }
    }
    // checks to see if its time to shoot another shot
    if (nextShotAt > millis()) {
        return;
    }
    nextShotAt = millis() + shotDelay;
    this.bullets.push(new Bullet(this.pos.x + this.width / 2, this.pos.y - this.height / 2));
}
