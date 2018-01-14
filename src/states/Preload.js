import WebpackLoader from 'phaser-webpack-loader';
import AssetManifest from '../AssetManifest';

import fx from 'wafxr';

/**
 * Preload the game and display the loading screen.
 */
export default class Preload extends Phaser.State {
  /**
   * Once loading is complete, switch to the main state.
   */
  create() {
    // Determine which postfix to use on the assets based on the DPI.
    let postfix = '';
    /*
    if (window.devicePixelRatio >= 3) {
      postfix = '@3x';
    } else if (window.devicePixelRatio > 1) {
      postfix = '@2x';
    }
    */

    // Fix CORS issues with the loader and allow for unlimited parallel downloads.
    this.game.load.crossOrigin = 'anonymous';
    this.game.load.maxParallelDownloads = Infinity;

    // Begin loading all of the assets.
    this.game.plugins.add(WebpackLoader, AssetManifest, postfix)
      .load()
      .then(() => {
        this.game.state.start('Main');
        fx.play({
          "volume": -10, "sustain": 0.1412, "release": 0.4533, "source": "white noise", "tremolo": 0.1773, "tremoloFreq": 32.01, "bandpass": 2988, "bandpassQ": 0.6386, "bandpassSweep": -1900, "compressorThreshold": -31.44
        });
      });
  }

  /**
   * Update the loading display with the progress.
   */
  update() {

  }
}
