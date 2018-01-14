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

        this.players = [];
    }

    addPlayer(player) {
        const greenBar = this.game.add.sprite(0, 0, 'pixel');
        const redBar = this.game.add.sprite(0, 0, 'pixel');
        const y = game.height - 38;

        greenBar.tint = 0x11FF11;
        greenBar.height = 20;
        greenBar.y = y;

        redBar.tint = 0xEE2222;
        redBar.height = 20;
        redBar.y = y;

        this.players.push({
            player,
            greenBar,
            redBar,
        });
    }

    update() {
        const fullBarWidth = (game.width / 2) - 64
        const p1Health = Phaser.Math.clamp(this.players[0].health, 0, 100);
        const p2Health = Phaser.Math.clamp(this.players[1].health, 0, 100);

        const [p1, p2] = this.players;

        const p1GreenBarWidth = fullBarWidth * (p1Health / 100);
        const p1GreenBarPos = fullBarWidth * (1 - (p1Health / 100));
        p1.redBar.x = 16;
        p1.redBar.width = fullBarWidth;
        p1.greenBar.x = 16 + p1GreenBarPos;
        p1.greenBar.width = p1GreenBarWidth;

        const p2GreenBarWidth = fullBarWidth * (p2Health / 100);
        const p2GreenBarPos = fullBarWidth * (1 - (p2Health / 100));
        p2.redBar.x = game.width - 16 - fullBarWidth;
        p2.redBar.width = fullBarWidth;
        p2.greenBar.x = game.width - 16 - p2GreenBarWidth;
        p2.greenBar.y = p2GreenBarWidth;
        
    }
}