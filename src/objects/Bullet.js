/**
 * Setup and control base bullet.
 */
export default class Bullet extends Phaser.Sprite {
  constructor({game, x, y, vx, vy}) {
    super(game, x, y, "temp_sprites", 2);
    
    this.anchor.setTo(0.5);
    
  this.game.physics.arcade.enable(this);
	this.enableBody = true;
  this.body.immovable = true;

  this.body.velocity.x = vx;
  this.body.velocity.y = vy;
  }

  // TODO remove after X sec


}
