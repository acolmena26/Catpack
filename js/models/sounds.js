function Sounds(){
    this.sounds = [
      'boom.m4a',
      'background-music.m4a',
      'game-over.m4a',
      'kaching.m4a'
    ];
  }
  
  Sounds.prototype.play = function(track){
    new Audio("./sounds/" + this.sounds[track]).play();
  };

  Sounds.prototype.pause = function(track){
      new Audio("./sounds/" + this.sounds[track].pause());
  }