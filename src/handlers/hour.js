const { BaseHandler } = require('../handler');

class Handler extends BaseHandler {
  constructor() {
    super('hour');
    this.command = 'hora';
  }

  onMessage(message) {
    if (message.body === this.command) {
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      const dateTime = `${date} ${time}`;
      message.reply(dateTime);
    }
  }
}

module.exports = Handler;
