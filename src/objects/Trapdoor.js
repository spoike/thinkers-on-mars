import fx from 'wafxr';

export default class Trapdoor extends Phaser.Sprite {
    constructor({game, x, y}) {
      super(game, x, y, "trapdoor", 0);

      this.initAnimations();
      this.scale.x = 2.0;
      this.scale.y = 2.0;
      
      this.anchor.setTo(0.5);
      this.smoothed = false;
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
      return Phaser.Math.random(5, 15) * 1000;
    }

    updateDoorState () {
        this.isOpen = !this.isOpen;
        this.animations.play(this.isOpen ? 'trapdoor_animate' : 'trapdoor_animate_close', 10, false, false);

        if (this.isOpen) {
          fx.play({"volume":-10,"attack":0.482,"decay":0.292,"sustain":0.0543,"release":0.0922,"source":"white noise","lowpass":2005,"lowpassSweep":-1192,"bandpass":535.9,"bandpassQ":3.705,"bandpassSweep":-131,"compressorThreshold":-37.17});
          this.timer.add(Phaser.Math.random(5000, 10000), this.updateDoorState, this);
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