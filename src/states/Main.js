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

    // Add background tile.
    this.game.add.tileSprite(-5000, -5000, 10000, 10000, 'bg2');

    // Add a player to the game.
    this.player1 = new Player({
      game: this.game,
      pIndex: PLAYER1,
      x: this.game.world.centerX + 64,
      y: this.game.world.centerY,
      key: 'temp_sprites',
      frame: 'player',
    });

    this.player2 = new Player({
      game: this.game,
      pIndex: PLAYER2,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      key: 'temp_sprites',
      frame: 'player',
    });

    this.cursor = this.game.input.keyboard.createCursorKeys();
    this.speed = 10;

    // ...
    this.zombie = new Zombie({
      game: this.game,
      x: this.game.world.centerX-100,
      y: this.game.world.centerY-100,
      key: 'temp_sprites',
      frame: 'enemy'
    });

    // Setup listener for window resize.
    window.addEventListener('resize', throttle(this.resize.bind(this), 50), false);
  }

  /**
   * Resize the game to fit the window.
   */
  resize() {
    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;

    this.scale.setGameSize(width, height);
  }

  /**
   * Handle actions in the main game loop.
   */
  
  update() {
   

  }
}
