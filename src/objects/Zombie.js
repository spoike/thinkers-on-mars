/**
 * Setup and control base player.
 */
export default class Zombie extends Phaser.Sprite {
  constructor({game, x, y, key, frame}) {
  	console.log(game);
    super(game, x, y, key, frame);

    // Add the sprite to the game.
    this.game.add.existing(this);
    this.anchor.setTo(0.5);
  }
}
