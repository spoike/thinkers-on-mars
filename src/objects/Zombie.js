/**
 * Setup and control base player.
 */
export default class Zombie extends Phaser.Sprite {
  constructor({game, x, y, key, frame, players}) {
  	console.log(game);
    super(game, x, y, key, frame);

    // Add the sprite to the game.
    this.game.add.existing(this);
    this.anchor.setTo(0.5);

    // Player reference
    this.players = players;
  }

  update() {
  	// Closets enemy
  	let distance_player1 = this.players[0].position.distance(this.position);
  	let distance_player2 = this.players[1].position.distance(this.position);
  	let follow_player = undefined;

  	if (this.players[0] === undefined) {
  		follow_player = this.players[1];
  	}
  	else if (this.players[1] === undefined) {
  		follow_player = this.players[0];
  	}
  	else if (distance_player1 < distance_player2) {
  		// Follow player 1
  		follow_player = this.players[0];
  	} else {
  		// Follow player 2
  		follow_player = this.players[1];
  	}

  	let followVec = Phaser.Point.subtract(follow_player.position, this.position).normalize();

  	console.log(followVec);
  	this.x += followVec.x;
  	this.y += followVec.y;
  }
}
