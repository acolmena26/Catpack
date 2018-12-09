function Game(canvasElement) {
  this.ctx = canvasElement.getContext("2d");
  this.bg = new Background(this.ctx);
  this.intervalId = undefined;
  this.player = new Player(this.ctx);
  this.newObstacleCount = 0;
  this.gameScore = document.querySelector("#score-game span");
  this.coinsCollected = document.querySelector("#score-game2 span");
  this.gameFinalScore = document.querySelector("#final-score span");
  this.gameFinalCoins = document.querySelector("#final-coins span");
  this.startBtn = document.querySelector("#start-btn");
  this.score = 0;
  this.getHarder = 150;
  this.coinsGotten = 0;
  this.coinAvailability = false;
  this.random = 0;
  this.obstacles = [
    // new Obstacle(this.ctx, this.ctx.canvas.height * 0.55, -4)
  ];

  this.fireball = [
    new FireBall(this.ctx)
  ]

  this.coins = [
    // new Coins(this.ctx, this.ctx.canvas.height * 0.55, -4)
  ]

  this.sounds = new Sounds();
}




Game.prototype.start = function() {

  this.intervalId = setInterval(function() {
    this.clear();
    this.drawAll();
    this.checkGameOver();
    this.moveAll();
    this.score += 1;
    this.coinTime += 1;
    this.gameScore.innerText = this.score;
    this.coinsCollected.innerText = this.coinsGotten;
    this.newObstacleCount += 1;

    
    if (this.newObstacleCount % this.getHarder === 0){
      if (this.getHarder > 40){
        this.getHarder -= 10;
        console.log(this.getHarder);
      }
      var random = getRandom();

      if (this.score < 1000){
        this.obstacles.push(new Obstacle(this.ctx, random, -6));
      } else if (this.score < 6000){
        this.obstacles.push(new Obstacle(this.ctx, random, -6));
      } else if (this.score < 10000){
        this.obstacles.push(new Obstacle(this.ctx, random, -10));
      } else {
        this.obstacles.push(new Obstacle(this.ctx, random, -12));
      }
    }

    if (this.newObstacleCount % (this.getHarder + 900) === 0){
      this.fireball.push(new FireBall(this.ctx));
    }

    if (this.coinAvailability && this.score % 10 === 0){
      this.coins.push(new Coins(this.ctx, this.random, -5));
    }

  if (this.score % 180 === 0) {
    if (this.coinAvailability){
      this.coinAvailability = false;
    } else {
      this.coinAvailability = true;
      this.random = getRandom();
    }
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

  this.coins.forEach(function (coin) {
    coin.draw();
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

  this.coins.forEach(function (coin) {
    coin.move();
  });
};

Game.prototype.checkGameOver = function() {
  var collide = this.obstacles.some(function (obstacle) {
    return this.player.isCollition(obstacle)
  }.bind(this));

  var collide2 = this.fireball.some(function (fire) {
    return this.player.isCollition(fire)
  }.bind(this));

  var coinCollition = this.coins.find(function (coin) {
    return this.player.isCollition(coin)
  }.bind(this));

  if (coinCollition) {
    var index = this.coins.indexOf(coinCollition);
    this.coinsGotten += 1;
    this.sounds.play(3);
    this.coins.splice(index, 1);
  }

  // if (collide2){
  //   this.sounds.play(0);
  //   this.gameOver(collide2);
  // }

  if(collide || collide2) {
    this.gameOver();
    this.sounds.play(2);
    // this.sounds.pause(1);
  };
};

Game.prototype.gameOver = function() {
  console.log('game over');
  // clearInterval(this.intervalId);
  clearInterval(this.intervalId);
  document.getElementById("score-game").classList.add('hidden');
  document.getElementById("score-game2").classList.add('hidden');
  this.gameFinalScore.innerText = this.score;
  this.gameFinalCoins.innerText = this.coinsGotten;
  document.getElementById('game-over').classList.add('active');
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};
