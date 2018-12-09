function Background(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;

    this.vx = -5;

    this.w = ctx.canvas.width;
    this.h = ctx.canvas.height;
    this.img = new Image();
    this.img.src = "./img/game-background2.jpg";
}

Background.prototype.draw = function() {
    this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h);
    this.ctx.drawImage(
        this.img,
        this.x + this.w,
        this.y,
        this.w,
        this.h);
};

Background.prototype.move = function() {
   this.x += this.vx;

   if (this.x + this.w <= 0) {
    this.x = 0;
   }
};
