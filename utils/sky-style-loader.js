/*jshint node: true*/

'use strict';

require('style-loader!@blackbaud/skyux/dist/css/sky.css');

var FontFaceObserver = require('fontfaceobserver');

var stylesAreLoaded = false;

var LOAD_TIMEOUT = 30000;

module.exports = {
  loadStyles: function () {
    var fontAwesome = new FontFaceObserver('FontAwesome');
    var blackbaudSans = new FontFaceObserver('Blackbaud Sans');
    var promise;

    promise = Promise.all(
      [
        // Specify a character for FontAwesome since some browsers will fail to detect
        // when the font is loaded unless a known character with a different width
        // than the default is not specified.
        fontAwesome.load('\uf0fc', LOAD_TIMEOUT),
        blackbaudSans.load(null, LOAD_TIMEOUT)
      ]
    );

    promise.then(function () {
      stylesAreLoaded = true;
    });

    return promise;
  },

  stylesAreLoaded: function () {
    return stylesAreLoaded;
  }
};
