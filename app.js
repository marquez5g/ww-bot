const fs = require('fs');
const qrcode = require('qrcode-terminal');
const debug = require('debug')('ww-bot');
const { Client } = require('whatsapp-web.js');

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
  // eslint-disable-next-line global-require
  sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
  session: sessionData,
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
  sessionData = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  });
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  debug('Client is ready!');
});

client.on('message', (message) => {
  debug(message.body);
  if (message.body === '!ping') {
    message.reply('pong');
  } else if (message.body === '!hora') {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const dateTime = `${date} ${time}`;
    message.reply(dateTime);
  }
});

client.initialize();
