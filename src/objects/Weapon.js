import Bullet from './Bullet';

/**
 * Setup and control base weapon.
 */

export default class Weapon extends Phaser.Sprite {
  constructor(game, owner, type) {
    super(game, 0, 0, '', 0);
    this.game = game;
    this.owner = owner;
    this.type = type;
  }

 shoot() {
  if (this.type == 0) {
    var bullet = new Bullet({game: this.game,x : this.owner.x, y :this.owner.y, vx:this.owner.body.velocity.x,vy: this.owner.body.velocity.y});
    bullet.lifespan = 1000;
    game.state.callbackContext.addBullet(bullet);
  } else {


  }

 }

}
