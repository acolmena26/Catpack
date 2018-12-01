function Player(ctx) {
  this.img = new Image();
  this.img.src = "img/cat.png";
  this.img.frames = 5;
  this.img.frameIndex = 0;
  this.ctx = ctx;

  this.x = this.ctx.canvas.width * 0.07;
  this.y = this.ctx.canvas.height * 0.70;
  console.log(this.y);
  
  this.y0 = this.y;

  this.vy = 0;
  this.vx = 0;

  this.g = 0.5;

  this.w = this.ctx.canvas.width / 17;
  this.h = this.w * 2;

  this.drawCount = 0;

  this.setListeners();
  
}

Player.prototype.draw = function() {
  this.drawCount++;
  var isJumping = this.isJumping() ? 0 : this.img.height / 2;
  this.ctx.drawImage(
    this.img,
    this.img.width * this.img.frameIndex / this.img.frames,
    isJumping,
    this.img.width / this.img.frames,
    this.img.height / 2 ,
    this.x,
    this.y, 
    this.w, 
    this.h
  )
  if (this.drawCount % 7 === 0) {
    this.animate();
    this.drawCount = 0;
  }
};

Player.prototype.move = function() {
  this.x += this.vx;
  if (this.x + this.w >= this.ctx.canvas.width) {
    this.vx = 0;
    this.x -= 2;
  } 

  if (this.x <= 0) {
    this.vx = 0;
    this.x += 2;
  }
  // else {
  //    this.vx = 0;
  //    this.x += this.vx;
  //  }

  this.vy += this.g;
  this.y += this.vy;
  if(this.y > this.y0){
    this.y = this.y0;
    this.vy = 0;
  }
  if (this.y <= 0 ){
    this.y = 0;
    // this.vy += 1;
    this.vy = 0;
  } 
  
};

Player.prototype.animate = function() {
  this.img.frameIndex++;
  if (this.img.frameIndex === this.img.frames) {
    this.img.frameIndex = 0;
  }
  
};

Player.prototype.jump = function() {
  if (this.y > -5){
    this.vy -= 15;
  }

};

Player.prototype.isJumping = function() {
  return this.y < this.y0;
};

Player.prototype.onKeyDown = function(event) {
  switch (event.keyCode) {
    case KEY_UP:
      this.jump();
      break;
    case KEY_RIGHT:
      this.vx = 10;
      break;
    case KEY_LEFT:
      this.vx = -10;
      break;
  }
};

Player.prototype.onKeyUp = function(event) {
  this.vx = 0;
};

Player.prototype.setListeners = function() {
  document.addEventListener('keydown', this.onKeyDown.bind(this));
  document.addEventListener("keyup", this.onKeyUp.bind(this));
};

Player.prototype.isCollition = function(obstacle){
  // return (this.x <= obstacle.x + obstacle.w  && this.x + this.w  >= obstacle.x &&
  //       this.y <= obstacle.y + this.h && this.y + this.h >= obstacle.y);

  var horizontalCollitions = (this.x + this.w >= obstacle.x && this.x + this.w <= obstacle.x + obstacle.w)
  || (this.x <= obstacle.x + obstacle.w && this.x >= obstacle.x);

  var verticalCollitions = (this.y + this.h >= obstacle.y && this.y + this.h <= obstacle.y + obstacle.h)
    || (this.y <= obstacle.y + obstacle.h && this.y >= obstacle.y);

  if (horizontalCollitions
      && this.y <= obstacle.y && this.y + this.h >= obstacle.y + obstacle.h) {
    return true
  } else if (verticalCollitions
      && this.x <= obstacle.x && this.x + this.w >= obstacle.x + obstacle.w
    ) {
    return true
  } else {
    return false
  }

} 