import Weapon from "./Weapon";
import fx from 'wafxr';

/**
 * Setup and control base player.
 */
export default class Player extends Phaser.Sprite {
  constructor({game, pIndex, x, y}) {
    super(game, x, y, "player", 0);
    this.playerIndex = pIndex;
    this.facing = 'front';
    this.scale.x = 2.0;
    this.scale.y = 2.0;
    this.smoothed = false;

    // Constant members
    this.speed = 190;

    // Add the sprite to the game.
    //this.game.add.existing(this);
    this.anchor.setTo(0.5);
    
    // Physics body
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    this.body.collideWorldBounds = true;
    //this.body.bounce.set(0.8);
    //this.body.immovable = true;
    //this.body.allowRotation = true;

    this.health = 100;

    this.initKeys();
    this.initWeapon();
    this.initAnimations();
  }

  isDead() {
  	return this.health <= 0;
  }

  initAnimations() {
    this.animations.add('idle_front', [0, 1, 2, 3, 4], 15);
    this.animations.add('idle_back', [5, 6, 7, 8], 15);
    this.animations.add('run_front', [9, 10, 11], 15);
    this.animations.add('run_back', [12, 13, 14], 15);
  }

  initKeys() {
    if (this.playerIndex == 0) {
      this.keys = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
      };
      this.gamepad = game.input.gamepad.pad1;
    } else {
      this.scale.x = -2.0;
      this.keys = game.input.keyboard.createCursorKeys();
      this.gamepad = game.input.gamepad.pad2;
    }
    this.game.input.gamepad.start();
    this.axes = {x: 0, y: 0};
    this.gamepad.onAxisCallback = (args) => {
      this.axes.x = this.gamepad._axes[0];
      this.axes.y = this.gamepad._axes[1];
    }
  }

  initWeapon() {
     this.weapon = new Weapon(game, this, this.playerIndex);
  }

  damage(damage) {
    super.damage(damage);
    this.tint = 0xff0000;
    
    if (damage > 5)
      fx.play({"volume":-25,"sustain":0.0757,"release":0.0994,"frequency":434.8,"sweep":-0.3644,"source":"sawtooth","lowpass":1704,"lowpassSweep":929.7,"compressorThreshold":-30.22});
  }

  update() {
    this.updateInput();
    this.updateRotation();
    this.updateShooting();
   
    if (this.tint < 0xffffff) {
      this.tint += 5000;
    } else {
      this.tint = 0xffffff;
    }
  }

  updateShooting() {
    if (this.weapon != null) {
      this.weapon.shoot();
    }
  }

  updateInput() {
    this.isMoving = false;
    this.body.velocity.x *= 0.9;
    this.body.velocity.y *= 0.9;

    var accAlpha = 0.75;

    if (this.keys.left.isDown || this.axes.x < 0) {
      this.isMoving = true;
      this.body.velocity.x = Phaser.Math.linear(this.body.velocity.x, -this.speed, accAlpha);
      this.scale.x = 2.0;
    }
    if (this.keys.right.isDown || this.axes.x > 0) {
      this.isMoving = true;
      this.body.velocity.x = Phaser.Math.linear(this.body.velocity.x, this.speed, accAlpha);
      this.scale.x = -2.0;
    }
    if (this.keys.up.isDown || this.axes.y < 0) {
      this.isMoving = true;
      this.body.velocity.y= Phaser.Math.linear(this.body.velocity.y, -this.speed, accAlpha);
      this.facing = 'back';
    }
    if (this.keys.down.isDown || this.axes.y > 0) {
      this.isMoving = true;
      this.body.velocity.y = Phaser.Math.linear(this.body.velocity.y, this.speed, accAlpha);
      this.facing = 'front';
    } 
  }

  updateRotation() {
    switch (this.facing) {
      case 'back':
        if (this.isMoving) {
          this.animations.play('run_back');
        } else {
          this.animations.play('idle_back');
        }
        break;
      case 'front':
      default:
      if (this.isMoving) {
        this.animations.play('run_front');
      } else {
        this.animations.play('idle_front');
      }
      break;
    }

    /* if (false) { // Is in range of one or more zombie

    } else { // No zombie close
      var velocity = this.body.velocity; //new Phaser.Point(-10, 1);
      //const rotation = Phaser.Point.angle(velocity, game.Zero);
    } */
  }

  
}
