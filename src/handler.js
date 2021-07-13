/* eslint-disable no-unused-vars */
const events = require('events');
const debug = require('debug')('ww-bot:handler');

/**
 * @typedef { import('whatsapp-web.js/src/structures/Message') } Message
 */

class BaseHandler extends events.EventEmitter {
  /**
   * This is the handler base class.
   */
  constructor(name) {
    super();
    /** @type { String } */
    this.name = name;

    this.on('message', this.onPreMessage.bind(this));
  }

  onPreMessage(message) {
    debug(message);
    this.onMessage(message);
  }

  /**
   * Listens the `message` event.
   * @param { Message } _message The message object.
   * @returns { BaseHandler }
   */
  onMessage(message) {
    return this;
  }
}

module.exports = { BaseHandler };
