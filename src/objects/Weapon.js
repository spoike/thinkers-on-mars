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

    this.lastVx = (type * 2) - 1;
    this.lastVy = 0;

    if (type == 0) {
      this.speed = 1300;
    } else if (type == 1) {
      this.speed = 1100;
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

  if (dir.x == 0 && dir.y == 0) {
    vx = this.lastVx * this.speed;
    vy = this.lastVy * this.speed;
  } else {
    this.lastVx = dir.x;
    this.lastVy = dir.y;
  }

  if (this.type == 0) {
    var bullet = new Bullet({game: this.game,x : this.owner.x, y : this.owner.y, vx: vx,vy: vy, scale: 1.5 });
    bullet.lifespan = 1500;
    bullet.damage = 40;
    game.state.callbackContext.addBullet(bullet);
    this.shootTimer = 0.17;
  } else {

    var p1 = new Phaser.Point(vx, vy);
    p1 = Phaser.Point.rotate(p1, 0, 0, 15, true);

    var bullet = new Bullet({game: this.game,x : this.owner.x, y : this.owner.y, vx: p1.x,vy:p1.y, scale: 1.2 });
    bullet.lifespan = 300;
    bullet.damage = 20;
    game.state.callbackContext.addBullet(bullet);


    bullet = new Bullet({game: this.game,x : this.owner.x, y : this.owner.y, vx: vx,vy: vy, scale: 1.2 });
    bullet.lifespan = 300;
    bullet.damage = 20;
    game.state.callbackContext.addBullet(bullet);


    var p3 = new Phaser.Point(vx, vy);
    p3 = Phaser.Point.rotate(p3, 0, 0, -15, true);

    bullet = new Bullet({game: this.game,x : this.owner.x, y : this.owner.y, vx: p3.x,vy: p3.y, scale: 1.2 });
    bullet.lifespan = 300;
    bullet.damage = 20;
    game.state.callbackContext.addBullet(bullet);

    this.shootTimer = 0.3;

  }


 }

}
