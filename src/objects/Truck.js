
const TRUCK_STATE_WAIT = 0;
const TRUCK_STATE_DRIVING = 1;

// Honk HONK!
export default class Truck extends Phaser.Sprite {
    constructor(game) {
        super(game, -128, game.world.centerY, 'truck', 0);
        this.anchor.setTo(0.5);

        // Physics body
        this.game.physics.arcade.enable(this);
        this.enableBody = true;
        this.body.immovable = true;
        this.body.setCircle(32);
        this.body.offset = new Phaser.Point(55, 0);

        this.scale.x = 3.0;
        this.scale.y = 3.0;
        this.smoothed = false;

        this.state = TRUCK_STATE_WAIT;
        this.stateTime = 0;
    }

    update() {
        this.stateTime += this.game.time.physicsElapsed;

        if (this.state == TRUCK_STATE_WAIT) {
            if (this.x < -128) {
                this.x += 5;
            }
            if (this.stateTime > 3) {
                this.state = TRUCK_STATE_DRIVING;
            }
        } else {
            this.body.velocity.x = 500;
            if (this.position.x > this.game.world.bounds.width + 320) {
                this.state = TRUCK_STATE_WAIT;
                this.body.velocity.x = 0;
                this.x = -300;
                this.stateTime = 0;
            }
        }
    }
}