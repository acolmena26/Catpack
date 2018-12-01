function Game(canvasElement) {
  this.ctx = canvasElement.getContext("2d");
  this.bg = new Background(this.ctx);
  this.intervalId = undefined;
  this.player = new Player(this.ctx);
  this.newObstacleCount = 0;
  this.gameScore = document.querySelector("#score-game span");
  this.gameFinalScore = document.querySelector("#final-score span");
  this.score = 0;
  this.obstacles = [
    new Obstacle(this.ctx, this.ctx.canvas.height * 0.55)
  ];

  this.fireball = [
    new FireBall(this.ctx)
  ]
}

Game.prototype.start = function() {
  this.intervalId = setInterval(function() {
    this.clear();
    this.drawAll();
    this.checkGameOver();
    this.moveAll();
    this.score += 1;
    this.gameScore.innerText = this.score;
    this.newObstacleCount += 1;
    var getHarder = 200;

    if (this.newObstacleCount % 1500 && getHarder >= 30){
      getHarder -= 3;
    }

    if (this.newObstacleCount % getHarder === 0){
      var max = 500;
      var min = 10;
      var random = Math.floor(Math.random() * (max - min) + min);
      this.obstacles.push(new Obstacle(this.ctx, random));
    }

    if (this.newObstacleCount % (getHarder + 900) === 0){
      this.fireball.push(new FireBall(this.ctx));
    }

  }.bind(this), DRAW_INTERVAL_MS);
};

Game.prototype.drawAll = function(action) {
  this.bg.draw()
  this.player.draw();
  this.obstacles.forEach(function (obstacle) {
    obstacle.draw();
  });

  this.fireball.forEach(function (fire) {
    fire.draw();
  });

};

Game.prototype.moveAll = function(action) {
  this.bg.move();
  this.player.move();
  this.obstacles.forEach(function (obstacle) {
    obstacle.move();
  })
  this.fireball.forEach(function (fire) {
    fire.move();
  });
};

Game.prototype.checkGameOver = function() {
  var collide = this.obstacles.some(function (obstacle) {
    return this.player.isCollition(obstacle)
  }.bind(this));

  var collide2 = this.fireball.some(function (fire) {
    return this.player.isCollition(fire)
  }.bind(this));

  if(collide || collide2) {
    this.gameOver();
  };
};

Game.prototype.gameOver = function() {
  console.log('game over');
  // clearInterval(this.intervalId);
  clearInterval(this.intervalId);
  document.getElementById("score-game").classList.add('hidden');
  this.gameFinalScore.innerText = this.score;
  document.getElementById('game-over').classList.add('active');

  // if (confirm("GAME OVER! Play again?")) {
  //   location.reload();
  // }
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};
