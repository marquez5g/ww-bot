# WW-Bot

This is a WhatsApp Web bot customized. It uses the library [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) and is easy to run.

## Instalation

Clone this repository and do:
```bash
npm install
```

You have to consider that the session file is set in `~/wwbot-session.json` by default, but you can change this via environment variables `WWBOT_SESSION`.

After you can start easily with:
```bash
npm start
# Or
WWBOT_SESSION=/home/user/dir/to/session.json npm start
```

Or if you use [pm2](https://pm2.keymetrics.io/) then do:
```bash
pm2 start ecosystem.config.js
```

If you use **pm2** you can edit the environment variable and set your preferences. Edit the file `ecosystem.config.js`:
```js
{
  apps: [
    {
      ...
      env_production: {
        WWBOT_SESSION: '~/wwbot-session.json',
      },
    },
  ],
};
```

## Add new behaviors

In `src/handlers` you can add news modules to extend the behavior of the bot. For this, you must define a class that extends from `BaseHandler` (in `src/handler.js`) and override the method `onMessage(message)` where `message` is a [Message](https://pedroslopez.me/whatsapp-web.js/Message.html) object and export it. Example:

```js
const { BaseHandler } = require('../handler');

class Handler extends BaseHandler {
  constructor() {
    super('name-my-handler');
    this.command = '!echo';
  }

  onMessage(message) {
    if (message.body.startsWith(this.command)) {
      const text = message.body.slice(this.command.length, message.body.length);
      message.reply(text);
    }
  }
}

module.exports = Handler;
```