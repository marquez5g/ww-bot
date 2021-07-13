const events = require('events');
const debug = require('debug')('ww-bot:handler');

class BaseHandler extends events.EventEmitter {
  /**
   * This is the handler base class.
   */
  constructor() {
    super();
    /** @type { String } */
    this.name = null;
  }

  // TODO: document this method
  onMessage(message) {
    debug(message);
    return this;
  }
}

module.exports = { BaseHandler };
