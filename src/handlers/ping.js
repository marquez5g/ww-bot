const debug = require('debug')('ww-bot:ping');
const { BaseHandler } = require('../handler');

class Handler extends BaseHandler {
  constructor() {
    super();
    this.name = 'ping';
    this.command = '!ping';
  }

  onMessage(message) {
    debug(message.body);
    if (message.body === this.command) {
      message.reply('pong');
    }
  }
}

module.exports = Handler;
