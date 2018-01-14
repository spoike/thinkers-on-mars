export default class UserInterface extends Phaser.Group {
    constructor(game) {
        super(game);

        const p1Text = game.add.text(16, game.height - 64, 'Sly', {
          font: 'normal 26px VT323',
          fill: 'white',
          align: 'right',
        });
        this.add(p1Text);

        const p2Text = game.add.text(game.width - 68, game.height - 64, 'Arnie', {
          font: 'normal 26px VT323',
          fill: 'white',
          align: 'left',
        });
        this.add(p2Text);

        this.healthBarGfx = game.add.graphics();

        this.players = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    update() {
        const fullBarWidth = (game.width / 2) - 64
        const p1Health = Phaser.Math.clamp(this.players[0].health, 0, 100);
        const p2Health = Phaser.Math.clamp(this.players[1].health, 0, 100);

        // player 1
        this.healthBarGfx.beginFill(0xEE2222);
        this.healthBarGfx.drawRect(16, game.height - 32, fullBarWidth, 32);
        this.healthBarGfx.beginFill(0x11ff11);
        const p1GreenBarWidth = fullBarWidth * (p1Health / 100);
        const p1GreenBarPos = fullBarWidth * (1 - (p1Health / 100));
        this.healthBarGfx.drawRect(16 + p1GreenBarPos, game.height - 32, p1GreenBarWidth, 32);
        // player 2
        this.healthBarGfx.beginFill(0xEE2222);
        this.healthBarGfx.drawRect(game.width - 16 - fullBarWidth, game.height - 32, fullBarWidth, 32);
        this.healthBarGfx.beginFill(0x11ff11);
        const p2GreenBarWidth = fullBarWidth * (p2Health / 100);
        const p2GreenBarPos = fullBarWidth * (1 - (p2Health / 100));
        this.healthBarGfx.drawRect(game.width - 16 - p2GreenBarWidth, game.height - 32, p2GreenBarWidth, 32);

        this.healthBarGfx.endFill();
    }
}