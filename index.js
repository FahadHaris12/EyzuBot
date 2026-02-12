const mineflayer = require('mineflayer');
const express = require('express');

/* ---------------- WEB SERVER (for Render) ---------------- */

const app = express();

app.get('/', (req, res) => {
  res.send('AFK Bot is running ✅');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});

/* ---------------- BOT CODE ---------------- */

function createBot() {
  const bot = mineflayer.createBot({
    host: 'vnxace.aternos.me', // example: eyzu.aternos.me
    port: 61163,            // Java port
    username: 'AFK_Bot'
  });

  bot.on('login', () => {
    console.log('✅ Bot joined server');

    // Anti AFK jump
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('❌ Disconnected — reconnecting in 30s');
    setTimeout(createBot, 30000);
  });

  bot.on('error', err => {
    console.log('⚠️ Bot error:', err);
  });
}

createBot();
