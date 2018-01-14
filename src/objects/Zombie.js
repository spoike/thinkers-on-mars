/**
 * Setup and control base player.
 */
export default class Zombie extends Phaser.Sprite {
  constructor({game, x, y, players}) {
    super(game, x, y, 'zombie', 0);

	this.setHealth(100);

    // Add the sprite to the game.
    //this.game.add.existing(this);
	this.anchor.setTo(0.5);
	
	// Physics body
	this.game.physics.arcade.enable(this);
	this.enableBody = true;
	this.body.immovable = false;


    // Player reference
    this.players = players;
    // damage
    this.doNothing = 0;
    // Player reference
    this.initAnimations();

    this.scale.x = 2.0;
    this.scale.y = 2.0;
	this.smoothed = false;
}

damage(damage) {
    super.damage(damage);
    
    this.tint = 0xff0000;
  }

  update() {
	if (this.tint < 0xffffff) {
		this.tint += 7000;
	  } else {
		this.tint = 0xffffff;
	  }


  	let deltaTime = this.game.time.physicsElapsed;
  	if (this.doNothing > 0) {
  		this.doNothing -= deltaTime;
  		return;
  	}

  	// Closets enemy
  	let distance_player1 = this.players[0].position.distance(this.position);
  	let distance_player2 = this.players[1].position.distance(this.position);
  	let follow_player = undefined;
  	let distance = undefined;

  	if (this.players[0] === undefined || this.players[0].isDead()) {
  		follow_player = this.players[1];
  		distance = distance_player2;
  	}
  	else if (this.players[1] === undefined || this.players[1].isDead()) {
  		follow_player = this.players[0];
  		distance = distance_player1;
  	}
  	else if (distance_player1 < distance_player2) {
  		// Follow player 1
  		follow_player = this.players[0];
  		distance = distance_player1;
  	} else {
  		// Follow player 2
  		follow_player = this.players[1];
  		distance = distance_player2;
  	}

  	let followVec = new Phaser.Point(follow_player.position.x - this.position.x, follow_player.position.y - this.position.y).normalize();// Phaser.Point.subtract(follow_player.position, this.position).normalize();

  	if (distance > 38) {	
		var speed = 60;
		//this.body.velocity = Phaser.Math.linear(this.body.velocity, (followVec * speed), 0.1); //(followVec * speed) 
		this.body.velocity.x = followVec.x * speed;
		this.body.velocity.y = followVec.y * speed;
  	} else {
  		follow_player.damage(10);
		this.doNothing = 5;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
  	}
   

    this.animations.play(followVec.y <= 0 ? 'walk_front' : 'walk_back');
    this.scale.x = followVec.x > 0 ? -2.0 : 2.0 ;
  }

  initAnimations() {
    this.animations.add('walk_front', [0, 1, 2, 3, 4, 5, 6], 15);
    this.animations.add('walk_back', [7, 8, 9, 10, 11], 15);
  }
}
