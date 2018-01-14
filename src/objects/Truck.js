
// Honk HONK!
export default class Truck extends Phaser.Sprite {
    constructor(game) {
        super(game, -128, game.world.centerY, 'truck', 0);
        this.anchor.setTo(0.5);

        // Physics body
        this.game.physics.arcade.enable(this);
        this.enableBody = true;
        this.body.immovable = false;

        this.scale.x = 3.0;
        this.scale.y = 3.0;
        this.smoothed = false;
    }

    update() {
        
    }
}