const fs = require('fs');
const qrcode = require('qrcode-terminal');
const debug = require('debug')('ww-bot:core');
const { Client } = require('whatsapp-web.js');

/**
 * @typedef { import('./handler').BaseHandler } BaseHandler
 */

class WWBot {
  /**
   * Constructs a whatsapp web client bot.
   * @param { String } sessionFilename the session filename.
   */
  constructor(sessionFilename) {
    // Load the session data if it has been previously saved
    this.sessionFile = sessionFilename;
    this.sessionData = null;
    this.qrConfig = { small: true };

    if (fs.existsSync(this.sessionFile)) {
      // eslint-disable-next-line global-require
      this.sessionData = require(this.sessionFile);
      debug('loaded from file', this.sessionFile);
    } else {
      debug('the session file does not exist');
    }

    // Use the saved values
    this.client = new Client({ session: this.sessionData });

    // Save session values to the file upon successful auth
    this.client.on('authenticated', this.onAuthenticated);

    // Generate QR code
    this.client.on('qr', this.onQR);

    this.client.once('ready', () => {
      debug('client is ready!');
    });
  }

  /**
   * Listens the `authenticated` event and save the session data in file.
   * @param { Object } session The session object.
   */
  onAuthenticated(session) {
    fs.writeFile(this.sessionFile, JSON.stringify(session), (err) => {
      if (err) {
        console.error(err);
      } else {
        debug('session saved in file', this.sessionFile);
      }
    });
  }

  /**
   * Listens the `qr` event and generate a QR image on the terminal.
   * @param { String } qr Data string.
   */
  onQR(qr) {
    debug('will generate QR', qr);
    qrcode.generate(qr, this.qrConfig);
  }

  /**
   * Starts the client.
   */
  start() {
    debug('will start client');
    this.client.initialize();
  }

  /**
   * Adds new handler to listen the `message` event.
   * @param { BaseHandler } handler A handler.
   * @param { AddedHandlerCallback } cb A callback function.
   */
  addHandler(handler, cb) {
    this.client.on('message', handler.onMessage);
    if (cb) {
      debug('call the callback after adding handler');
      cb();
    }
  }
}

/**
 * This callback is called when a new handler is added.
 * @callback AddedHandlerCallback
 */

module.exports = { WWBot };
