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

        //this.healthBar = game.add.graphics(game);
    }

    update() {
        graphics.beginFill(0xff0000);
        graphics.drawCircle(50, 50, 100);
        graphics.endFill();
    }
}