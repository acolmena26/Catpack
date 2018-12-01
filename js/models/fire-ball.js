function FireBall(ctx) {
    this.img = new Image();
    this.img.src = "img/fireball2.png";
    this.ctx = ctx;
    this.x = this.ctx.canvas.width * 1;
    this.y = this.ctx.canvas.height * 0.70;
    this.vy = 0;
    this.vx = -10;
    this.w = this.ctx.canvas.width / 10;
    this.h = this.w;
}

FireBall.prototype.draw = function() {
    this.drawCount++;

    this.ctx.drawImage(
      this.img,
      this.x,
      this.y, 
      this.w + 15, 
      this.h + 30
    );
};

FireBall.prototype.move = function() {
    this.x += this.vx;
  };