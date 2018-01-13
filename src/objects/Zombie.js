/**
 * Setup and control base player.
 */
export default class Zombie extends Phaser.Sprite {
  constructor({game, x, y, players}) {
    super(game, x, y, 'zombie', 0);

    // Add the sprite to the game.
    this.game.add.existing(this);
    this.anchor.setTo(0.5);

    // Physics body
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    this.body.immovable = false;

    // Player reference
    this.players = players;
    this.initAnimations();

    this.scale.x = 2.0;
    this.scale.y = 2.0;
  }

  initAnimations() {
    this.animations.add('walk_front', [0, 1, 2, 3, 4, 5, 6], 15);
    this.animations.add('walk_back', [7, 8, 9, 10, 11], 15);
  }

  update() {
    // Closets enemy
    let distance_player1 = this.players[0].position.distance(this.position);
    let distance_player2 = this.players[1].position.distance(this.position);
    let follow_player = undefined;
    let distance = undefined;

    if (this.players[0] === undefined) {
      follow_player = this.players[1];
      distance = distance_player2;
    }
    else if (this.players[1] === undefined) {
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

    if (distance > 32) {
      var speed = 90;
      this.body.velocity.x = followVec.x * speed;
      this.body.velocity.y = followVec.y * speed;

    }

    this.animations.play(followVec.y <= 0 ? 'walk_front' : 'walk_back');
    this.scale.x = followVec.x > 0 ? -2.0 : 2.0 ;
  }
}
