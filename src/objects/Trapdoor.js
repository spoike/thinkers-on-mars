export default class Trapdoor extends Phaser.Sprite {
    constructor({game, x, y}) {
      super(game, x, y, "trapdoor", 0);

      this.initAnimations();
      this.scale.x = 2.0;
      this.scale.y = 2.0;
      this.anchor.setTo(0.5);
      this.isOpen = false;
      this.timeUntilOpen = this.getNewTime();

      this.game.physics.arcade.enable(this);
      this.enableBody = true;
      this.body.static = true;

      this.timer = this.game.time.create(false);
      this.timer.add(this.timeUntilOpen, this.updateDoorState, this);
      this.timer.start();
    }

    initAnimations ( ) {
        this.animations.add('trapdoor_animate', [0, 1, 2, 3, 4, 5], 15);
        this.animations.add('trapdoor_animate_close', [5, 4, 3, 2, 0], 15);
        this.animations.add('trapdoor_closed', [0], 15);
        this.animations.add('trapdoor_open', [5], 15);
        this.animations.add('trapdoor_blink', [6, 7, 8, 9, 10, 5], 15);

        this.animations.frame = 0;
    }

    getNewTime() {
      return Phaser.Math.random(5, 30) * 1000;
    }

    updateDoorState () {
        this.isOpen = !this.isOpen;
        this.animations.play(this.isOpen ? 'trapdoor_animate' : 'trapdoor_animate_close', 10, false, false);

        if (this.isOpen) {
          this.timer.add(3000, this.updateDoorState, this);
        } else {
          this.timeUntilOpen = this.getNewTime();
          this.timer.add(this.timeUntilOpen, this.updateDoorState, this);
        }
    }

    blink() {
      this.animations.play('trapdoor_blink', 10, false, false);
    }

    isOpen() {
      return this.isOpen;
    }

    update () {

    }
}