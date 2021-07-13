const { BaseHandler } = require('../handler');

class Handler extends BaseHandler {
  constructor() {
    super('ping');
    this.command = '!ping';
  }

  onMessage(message) {
    if (message.body === this.command) {
      message.reply('pong');
    }
  }
}

module.exports = Handler;
