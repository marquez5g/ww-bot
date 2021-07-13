const { BaseHandler } = require('../handler');

class Handler extends BaseHandler {
  constructor() {
    super('name-my-handler');
    this.command = '!echo';
  }

  onMessage(message) {
    if (message.body.startsWith(this.command)) {
      /** @type { String } */
      const text = message.body.slice(this.command.length, message.body.length);

      if (!text.trim()) {
        message.reply('¿Y el texto?');
        return;
      }

      message.reply(text);
    }
  }
}

module.exports = Handler;
