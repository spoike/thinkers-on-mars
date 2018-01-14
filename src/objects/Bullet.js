/**
 * Setup and control base bullet.
 */
export default class Bullet extends Phaser.Sprite {
  constructor({game, x, y, vx, vy, scale}) {
    super(game, x, y, "temp_sprites", "bullet");
    
    this.anchor.setTo(0.5);
    this.scale.x = scale;
    this.scale.y = scale;
    this.smoothed = false;
    
  this.game.physics.arcade.enable(this);
	this.enableBody = true;
  this.body.immovable = true;

  this.body.velocity.x = vx;
  this.body.velocity.y = vy;
  }

}
