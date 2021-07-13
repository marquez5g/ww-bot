const events = require('events');
const debug = require('debug')('ww-bot:handler');

/**
 * @typedef { import('whatsapp-web.js/src/structures/Message') } Message
 */

class BaseHandler extends events.EventEmitter {
  /**
   * This is the handler base class.
   */
  constructor() {
    super();
    /** @type { String } */
    this.name = null;
  }

  /**
   * Listens the `message` event.
   * @param { Message } message The message object.
   * @returns { BaseHandler }
   */
  onMessage(message) {
    debug(message);
    return this;
  }
}

module.exports = { BaseHandler };
