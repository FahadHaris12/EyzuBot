const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'vnxace.aternos.me', // example: eyzu.aternos.me
    port: 61163,            // your java port
    username: 'AFK_Kundi'
  });

  bot.on('login', () => {
    console.log('✅ Bot joined');

    // Anti AFK movement
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('❌ Disconnected — reconnecting in 30s');
    setTimeout(createBot, 30000);
  });

  bot.on('error', err => console.log('⚠️ Error:', err));
}

createBot();

