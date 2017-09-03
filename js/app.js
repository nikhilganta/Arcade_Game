// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 101*5) {
      this.x = -100;
      /* To make the speeds of the Enemies move at random
      speeds.*/
      this.speed = 100 + Math.floor(Math.random() * 400);
    }

    /* when the player collides with the enemy the game
    gets reset. */
    if (player.x < this.x + 80 &&
       player.x + 60 > this.x &&
       player.y < this.y + 20 &&
       player.y + 20 > this.y) {
       player.x = 101*2;
       player.y = 83*5 - 10;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.x = x;
  this.y = y;

  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

    //Player cannot cross the boundaries.
    if(this.y > 83*5) {
      this.y = 83*5 - 10;
    }
    if(this.x > 101*4) {
      this.x = 101*4;
    }
    if(this.x < 0) {
      this.x = 0;
    }

    /* If the player reaches water the player wins
    and the game resets back to the start position */
    if(this.y < 0) {
      this.x = 101*2;
      this.y = 83*5 - 10;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//keyboard operations for moving the player.
Player.prototype.handleInput = function(keyPress) {
  switch (keyPress) {
        case "left":
            this.x -= 101;
            break;
        case "right":
            this.x += 101;
            break;
        case "up":
            this.y -= 83;
            break;
        case "down":
            this.y += 83;
            break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyPosition = [83*1 - 20, 83*1 - 20, 83*2 - 20, 83*2 - 20, 83*3 - 20, 83*3 - 20];
var player = new Player(101*2, 83*5 - 10);

enemyPosition.forEach(function(positionY) {
    var enemy = new Enemy(0, positionY, 100 + Math.floor(Math.random() * 400));
    allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
