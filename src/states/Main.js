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
    
    this.bulletGroup = game.add.group();
    this.zombieGroup = game.add.group();
    this.playerGroup = game.add.group();

    this.zombies = [];
    this.bullets = [];

    // Add a player to the game.
    this.player1 = new Player({
      game: this.game,
      pIndex: PLAYER1,
      x: this.game.world.centerX + 64,
      y: this.game.world.centerY,
    });
    this.playerGroup.add(this.player1);

    this.player2 = new Player({
      game: this.game,
      pIndex: PLAYER2,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
    });

    this.playerGroup.add(this.player2);

    game.Zero = new Phaser.Point(0, 0);

 
    this.zombieSpawnTime = 10;
    this.zombieTimer = 0;
    for (let i = 0; i < 10; i++) {
      this.spawnZombie();
    }

    // Setup listener for window resize.
    window.addEventListener('resize', throttle(this.resize.bind(this), 50), false);
  }

  spawnZombie() {
    if (this.zombies.length > 30)
      return;

    let spawn = this.getEnemySpawnPoint();
    var zombie = new Zombie({
      game: this.game,
      x: this.game.world.centerX+spawn.x,
      y: this.game.world.centerY+spawn.y,
      key: 'temp_sprites',
      frame: 'enemy',
      players: [this.player1, this.player2]
    });
    this.zombies.push(zombie);
    this.zombieGroup.add(zombie);
  }

  getEnemySpawnPoint() {
    let degree = Phaser.Math.random(0, Math.PI*2);
    return new Phaser.Point(Math.cos(degree) * 1000, Math.sin(degree) * 1000);
  }

  addBullet(bullet) {
    // Add the sprite to the game.
    this.game.add.existing(bullet);

    this.bullets.push(bullet);
    this.bulletGroup.add(bullet);
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
    // Collision
    //game.physics.arcade.collide(this.player1, this.player2);
    game.physics.arcade.collide(this.playerGroup);
    //game.physics.arcade.collide(this.zombieGroup,  this.playerGroup);
    game.physics.arcade.collide(this.zombieGroup);


    // Zombie Spawning
    let deltaTime = this.game.time.physicsElapsed;
    this.zombieTimer += deltaTime;
    if (this.zombieTimer >= this.zombieSpawnTime) {
      this.zombieTimer = 0;
      this.zombieSpawnTime = this.zombieSpawnTime / 2.0;
      this.spawnZombie();
      if (this.zombieSpawnTime < 0.2) {
        this.zombieSpawnTime = 0.2;
      }
    }


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
