import fx from 'wafxr';

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
        this.truckTime = Phaser.Math.random(10, 15);
    }

    update() {
        this.stateTime += this.game.time.physicsElapsed;

        if (this.state == TRUCK_STATE_WAIT) {
            if (this.x < -128) {
                this.x += 5;
            }
            if (this.stateTime > this.truckTime) {
                this.state = TRUCK_STATE_DRIVING;
                fx.play({
                    "volume":-10,"attack":0.226,"decay":0.017,"sustain":0.27,"release":0.442,"sustainLevel":0.9,"frequency":206,"sweep":0.32,"jumpAt1":0.19,"jumpBy1":-0.25,"source":"pulse"
                });
            }
        } else {
            this.body.velocity.x = 500;
            if (this.position.x > this.game.world.bounds.width + 320) {
                this.state = TRUCK_STATE_WAIT;
                this.body.velocity.x = 0;
                this.x = -300;
                this.stateTime = 0;
                this.truckTime = Phaser.Math.random(10, 15);
            }
        }
    }
}