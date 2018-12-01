function Game(canvasElement) {
  this.ctx = canvasElement.getContext("2d");
  this.bg = new Background(this.ctx);
  this.intervalId = undefined;
  this.player = new Player(this.ctx);
  this.newObstacleCount = 0;
  this.obstacles = [
    new Obstacle(this.ctx, this.ctx.canvas.height * 0.55)
  ];
}

Game.prototype.start = function() {
  this.intervalId = setInterval(function() {
    this.clear();
    this.drawAll();
    this.checkGameOver();
    this.moveAll();
    this.newObstacleCount += 1;
    var getHarder = 200;

    if (this.newObstacleCount % 20000 && getHarder >= 30){
      getHarder -= 1;
    }

    if (this.newObstacleCount % getHarder === 0){
      var max = 500;
      var min = 10;
      var random = Math.floor(Math.random() * (max - min) + min);
      console.log(random);
      this.obstacles.push(new Obstacle(this.ctx, random));
    }

  }.bind(this), DRAW_INTERVAL_MS);
};

Game.prototype.drawAll = function(action) {
  this.bg.draw()
  this.player.draw();
  this.obstacles.forEach(function (obstacle) {
    obstacle.draw();
  })

};

Game.prototype.moveAll = function(action) {
  this.bg.move();
  this.player.move();
  this.obstacles.forEach(function (obstacle) {
    obstacle.move();
  })
};

Game.prototype.checkGameOver = function() {
  var collide = this.obstacles.some(function (obstacle) {
    return this.player.isCollition(obstacle)
  }.bind(this));

  if(collide) {
    this.gameOver();
  };
};

Game.prototype.gameOver = function() {
  console.log('game over');
  // clearInterval(this.intervalId);
  clearInterval(this.intervalId);

  if (confirm("GAME OVER! Play again?")) {
    location.reload();
  }
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};
