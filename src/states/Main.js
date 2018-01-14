import throttle from 'lodash.throttle';
import Player from '../objects/Player';
import Zombie from '../objects/Zombie';
import Trapdoor from '../objects/Trapdoor';
import Truck from '../objects/Truck';
import UserInterface from '../objects/UserInterface';
import fx from 'wafxr';

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
    
    //var music = this.game.add.audio('music', 1, true);
    //music.loop = true;
    //music.play();
    
    // Add background tile.
    this.game.add.tileSprite(-5000, -5000, 10000, 10000, 'bg2');
    // Add road
    const road = this.game.add.tileSprite(0, this.game.world.centerY - 32, 10000, 64, 'road');
    road.scale.x = 2.0;
    road.scale.y = 2.0;

    this.initTrapdoors();
    this.bulletGroup = game.add.group();
    this.zombieGroup = game.add.group();
    this.playerGroup = game.add.group();
    this.backgroundGroup = game.add.group();
    this.truckGroup = game.add.group();
    const ui = new UserInterface(game);

    //this.zombies = [];
    //this.bullets = [];

    
   
    // Add a player to the game.
    this.player1 = new Player({
      game: this.game,
      pIndex: PLAYER1,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
    });
    this.playerGroup.add(this.player1);
    ui.addPlayer(this.player1);

    this.player2 = new Player({
      game: this.game,
      pIndex: PLAYER2,
      x: this.game.world.centerX + 72,
      y: this.game.world.centerY,
    });
    ui.addPlayer(this.player2);

    this.playerGroup.add(this.player2);

    game.Zero = new Phaser.Point(0, 0);

    this.truckGroup.add(new Truck(game));
 
    this.zombieSpawnTime = 10;
    this.zombieTimer = 0;
    for (let i = 0; i < 10; i++) {
      this.spawnZombie();
    }

    // Setup listener for window resize.
    window.addEventListener('resize', throttle(this.resize.bind(this), 50), false);
  }

  initTrapdoors() {
    this.trapdoorGroup = this.game.add.group();
    this.trapdoorGroup.add(new Trapdoor({
      game: this.game, 
      x: 1280/2,
      y: 230
    }));
    this.trapdoorGroup.add(new Trapdoor({
      game: this.game, 
      x: 1280/2,
      y: 550
    }));
  }

  spawnZombie() {
    if (this.zombieGroup.length > 30)
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
    //this.zombies.push(zombie);
    this.zombieGroup.add(zombie);
  }

  getEnemySpawnPoint() {
    let degree = Phaser.Math.random(0, Math.PI*2);
    return new Phaser.Point(Math.cos(degree) * 1000, Math.sin(degree) * 1000);
  }

  addBullet(bullet) {
    // Add the sprite to the game.
    //this.game.add.existing(bullet);

    bullet.body.onCollide = new Phaser.Signal();
    bullet.body.onCollide.add(this.onZombieBulletHit, this);

    //this.bullets.push(bullet);
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
    //game.physics.arcade.collide(this.playerGroup);
    game.physics.arcade.collide(this.zombieGroup);
    game.physics.arcade.collide(this.zombieGroup, this.bulletGroup);

    game.physics.arcade.collide(this.truckGroup, this.zombieGroup, this.onTruckHit);
    game.physics.arcade.collide(this.truckGroup, this.playerGroup, this.onTruckHit);

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

    /* // Check dead players
    this.playerGroup.forEach(function(player) {
      if (player.isDead()) {
        player.destroy();
      }
    }); */

    // Trapdoor
    let pGroup = this.playerGroup;
    let zGroup = this.zombieGroup;
    this.trapdoorGroup.forEach(function (trap){
      if (trap.isOpen) {
        pGroup.forEach(function(player){
          let distance = player.position.distance(trap.position);
          if (distance <= 64) {
            player.damage(100);
            trap.blink();
            fx.play({"volume":-10,"sustain":0.076,"release":0.1405,"frequency":458.5,"sweep":-0.422,"source":"square","compressorThreshold":-32.11});
          }
        });
        zGroup.forEach(function(zombie) {
          let distance = zombie.position.distance(trap.position);
          if (distance <= 64) {
            zombie.damage(100);
            trap.blink();
            fx.play({"volume":-10,"sustain":0.0752,"release":0.1325,"frequency":579.1,"sweep":-0.4473,"source":"sawtooth","lowpass":1619,"lowpassSweep":-885.4,"compressorThreshold":-30.14});
          }
        });
      }
    });

    this.updateDeadEntities();

    // Disabled camera for now
    /*   var centerX = (this.player1.x + this.player2.x) / 2 - game.camera.bounds.x;
    var centerY = (this.player1.y + this.player2.y) / 2 ;
    game.camera.focusOnXY(centerX, centerY);

    var deltaDist = this.player1.position.distance(this.player2.position);
    var zoom = 1 - deltaDist / 5000; */
   // game.camera.scale.x = zoom;
    // game.camera.scale.y = zoom;
    
  }

  updateDeadEntities() {
    this.playerGroup.forEach(function(player){
      if (!player.alive)
        player.destroy();
    });
    this.zombieGroup.forEach(function(zombie) {
      if (!zombie.alive)
        zombie.destroy();
    });

    if (!this.player1.alive && !this.player2.alive) {
      game.state.start('GameOver');
    }
  }

  onZombieBulletHit(bullet, zombie) {
    zombie.damage(bullet.damage);
    bullet.destroy();
  }

  onTruckHit(truck, entity) {
    entity.body.velocity.y = Phaser.Math.random(-300, 300);
    entity.damage(1.2);
  }
}
