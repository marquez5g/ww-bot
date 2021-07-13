const express = require('express');
const morgan = require('morgan');

const fs = require('fs');
const qrcode = require('qrcode-terminal');
const debug = require('debug')('ww-bot:core');
const { Client } = require('whatsapp-web.js');

/**
 * @typedef { import('./handler').BaseHandler } BaseHandler
 */

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('tiny'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

class WWBot {
  /**
   * Constructs a whatsapp web client bot.
   * @param { String } sessionFilename the session filename.
   */
  constructor(sessionFilename) {
    // Load the session data if it has been previously saved
    this.sessionFilename = sessionFilename;
    this.sessionData = null;
    /** @type { [BaseHandler] } */
    this.handlers = [];
    this.qrConfig = { small: true };

    if (fs.existsSync(this.sessionFilename)) {
      // eslint-disable-next-line global-require
      this.sessionData = require(this.sessionFilename);
      debug('loaded from file', this.sessionFilename);
    } else {
      debug('the session file does not exist');
    }

    // Use the saved values
    this.client = new Client({
      session: this.sessionData,
      puppeteer: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--unhandled-rejections=strict',
        ],
      },
    });

    // Save session values to the file upon successful auth
    this.client.on('authenticated', this.onAuthenticated.bind(this));

    // Generate QR code
    this.client.on('qr', this.onQR.bind(this));

    this.client.once('ready', () => {
      debug('client is ready!');
    });

    this.client.on('message', (message) => {
      debug('receive new message');
      this.handlers.forEach((handler) => handler.emit('message', message));
    });
  }

  /**
   * Listens the `authenticated` event and save the session data in file.
   * @param { Object } session The session object.
   */
  onAuthenticated(session) {
    debug('authenticated');
    debug('save in file', this.sessionFilename);
    fs.writeFile(this.sessionFilename, JSON.stringify(session), (err) => {
      if (err) {
        console.error(err);
      } else {
        debug('session saved in file', this.sessionFilename);
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
    this.handlers.push(handler);
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

module.exports = { WWBot, app };
