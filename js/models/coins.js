function Coins(ctx, y, vx) {
    this.img = new Image();
    this.img.src = "img/coins.png";
    this.img.frames = 6;
    this.img.frameIndex = 0;
    this.ctx = ctx;
  
    this.x = this.ctx.canvas.width * 1;
    this.y = y;
    
    this.y0 = this.y;
  
    this.vy = 0;
    this.vx = vx;
  
    
  
    this.w = this.ctx.canvas.width / 40;
    this.h = this.w;
  
    this.drawCount = 0;
    
    // this.setListeners();
  }

  Coins.prototype.draw = function() {
    this.drawCount++;

    this.ctx.drawImage(
      this.img,
      this.img.width * this.img.frameIndex / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y, 
      this.w, 
      this.h
    );
    if (this.drawCount % 7 === 0) {
      this.animate();
      this.drawCount = 0;
    }
  };

  Coins.prototype.move = function() {
    this.x += this.vx;
  };

  Coins.prototype.animate = function() {
    this.img.frameIndex++;
    if (this.img.frameIndex === this.img.frames) {
      this.img.frameIndex = 0;
    }
  };