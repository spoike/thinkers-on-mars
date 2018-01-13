export default class Trapdoor extends Phaser.Sprite {
    constructor({game, x, y}) {
      super(game, x, y, "trapdoor", 0);

      this.initAnimations();
      this.scale.x = 2.0;
      this.scale.y = 2.0;
      this.isOpen = false;
    }

    initAnimations ( ) {
        this.animations.add('trapdoor_animate', [0, 1, 2, 3, 4, 5], 15);
        this.animations.add('trapdoor_animate_close', [5, 4, 3, 2, 0], 15);
        this.animations.add('trapdoor_closed', [0], 15);
        this.animations.add('trapdoor_open', [5], 15);
        this.animations.add('trapdoor_blink', [6, 7, 8, 9, 10, 5], 15);

        this.animations.frame = 0;
        
        const timer = this.game.time.create(false);
        timer.loop(2000, this.updateDoorState, this);
        timer.start();
    }

    updateDoorState () {
        this.isOpen = !this.isOpen;
        this.animations.play(this.isOpen ? 'trapdoor_animate' : 'trapdoor_animate_close', 10, false, false);
    }

    update () {
    }
}