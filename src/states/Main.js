import throttle from 'lodash.throttle';
import Player from '../objects/Player';
import Zombie from '../objects/Zombie';

const PLAYER1 = 0;
const PLAYER2 = 1;

/**
 * Setup and display the main game state.
 */
export default class Main extends Phaser.State {
  /**
   * Setup all objects, etc needed for the main game state.
   */
  create() {
    // Enable arcade physics.
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.scale.setGameSize(1280, 720);
    //game.world.setBounds(-100, -100);
    
    // Add background tile.
    this.game.add.tileSprite(-5000, -5000, 10000, 10000, 'bg2');

    // Add a player to the game.
    this.player1 = new Player({
      game: this.game,
      pIndex: PLAYER1,
      x: this.game.world.centerX + 64,
      y: this.game.world.centerY,
    });

    this.player2 = new Player({
      game: this.game,
      pIndex: PLAYER2,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
    });

  
    this.cursor = this.game.input.keyboard.createCursorKeys();
    //this.speed = 10;

    game.Zero = new Phaser.Point(0, 0);

    // ...
    this.zombie = new Zombie({
      game: this.game,
      x: this.game.world.centerX-100,
      y: this.game.world.centerY-100,
      key: 'temp_sprites',
      frame: 'enemy',
      players: [this.player1, this.player2]
    });
    
    this.zombies = [];
    for (let i = 0; i < 10; i++) {
      let spawn = this.getEnemySpawnPoint();
      this.zombies.push(new Zombie({
        game: this.game,
        x: this.game.world.centerX+spawn.x,
        y: this.game.world.centerY+spawn.y,
        key: 'temp_sprites',
        frame: 'enemy',
        players: [this.player1, this.player2]
      }))
    }

    // Setup listener for window resize.
    window.addEventListener('resize', throttle(this.resize.bind(this), 50), false);
  }

  getEnemySpawnPoint() {
    return new Phaser.Point(Phaser.Math.random(-100, 100), Phaser.Math.random(-100, 100));
  }

  /**
   * Resize the game to fit the window.
   */
  resize() {
    /* const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;

    this.scale.setGameSize(width, height); */
  }

  /**
   * Handle actions in the main game loop.
   */
  
  update() {
    game.physics.arcade.collide(this.player1, this.player2);

    // Disabled camera for now
    /*   var centerX = (this.player1.x + this.player2.x) / 2 - game.camera.bounds.x;
    var centerY = (this.player1.y + this.player2.y) / 2 ;
    game.camera.focusOnXY(centerX, centerY);

    var deltaDist = this.player1.position.distance(this.player2.position);
    var zoom = 1 - deltaDist / 5000; */
   // game.camera.scale.x = zoom;
    // game.camera.scale.y = zoom;
    
  }
}
