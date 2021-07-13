module.exports = {
  apps: [
    {
      name: 'WWBot',
      script: './bin/ww-bot',
      watch: '.',
      env_production: {
        WWBOT_SESSION: '~/wwbot-session.json',
      },
    },
  ],
};
