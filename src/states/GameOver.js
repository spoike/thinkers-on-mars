import throttle from 'lodash.throttle';

/**
 * Setup and display the main game state.
 */
export default class GameOver extends Phaser.State {
  /**
   * Setup all objects, etc needed for the main game state.
   */
  create() {
    game.world.removeAll()
    var gameoverLabel = game.add.text(game.world.centerX, game.world.centerY - 48, 'ZOMBIES WON!', {font: '64px VT323', fill: '#F2F2F2', align: 'center'});
    gameoverLabel.anchor.setTo(0.5, 0.2);

    var surviveText = game.add.text(game.world.centerX, game.world.centerY + 72 - 48,
       'You survived ' + Math.round(Number(game.timer)) + ' seconds of the m.a.r.s zombie apocalypse.\n\nTap anywhere to restart!', {font: '24px VT323', fill: '#F2F2F2', align: 'center'});
    surviveText.anchor.setTo(0.5, 0.2);

    //the "click to restart" handler
  game.input.onTap.addOnce(function () {
    game.state.start("Main");
  }, this.start);
  }

}
