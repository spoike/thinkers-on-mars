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
    this.shootTimer = 0;

    this.lastVx = 1;
    this.lastVy = 0;

    if (type == 0) {
      this.speed = 900;
    } else if (type == 1) {
      this.speed = 1300;
    }
  }

  update() {
    let deltaTime = this.game.time.physicsElapsed;
    this.shootTimer -= deltaTime;

    if (this.shootTimer < 0) {
      this.canShoot = true;
    }

  }

 shoot() {
   this.update();

  if ( !this.canShoot )
    return;

  this.canShoot = false;

  var dir = new Phaser.Point( this.owner.body.velocity.x, this.owner.body.velocity.y).normalize();
  var vx = dir.x * this.speed;
  var vy = dir.y * this.speed;

  if (vx == 0 && vy == 0) {
    vx = this.lastVx;
    vy = this.lastVy;
  } else {
    this.lastVx = dir.x;
    this.lastVy = dir.y;
  }

  if (this.type == 0) {
    var bullet = new Bullet({game: this.game,x : this.owner.x, y : this.owner.y, vx: vx,vy: vy });
    bullet.lifespan = 1000;
    bullet.damage = 34;
    game.state.callbackContext.addBullet(bullet);
    this.shootTimer = 0.5;
  } else {


  }


 }

}
