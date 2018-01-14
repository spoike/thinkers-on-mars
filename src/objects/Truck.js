import fx from 'wafxr';

const TRUCK_STATE_WAIT = 0;
const TRUCK_STATE_DRIVING = 1;
const TRUCK_STATE_HONKING = 2;
const TRUCK_SFX_SOUND = {"volume":-18,"attack":0.174,"decay":1,"sustain":1.76,"release":1,"sustainLevel":0.9,"frequency":168,"sweep":0.45,"source":"pulse","vibrato":0.3482,"vibratoFreq":8.473,"bandpass":1386,"bandpassSweep":7710};
const TRUCK_SFX_HONK = {"volume":-18,"attack":0.05,"decay":0.154,"sustain":0.17,"release":0.213,"sustainLevel":0.3,"frequency":238,"sweep":0.2785,"jumpAt1":0.1028,"source":"pulse","pulseWidth":0.36};

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
                this.state = TRUCK_STATE_HONKING;
                fx.play(TRUCK_SFX_HONK);
                setTimeout(() => {
                    fx.play(TRUCK_SFX_HONK);
                    setTimeout(() => {
                        this.state = TRUCK_STATE_DRIVING;
                        fx.play(TRUCK_SFX_SOUND);
                    }, 500);
                }, 250);
            }
        } else if (this.state == TRUCK_STATE_HONKING) {

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