const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'YOUR_SERVER_IP', // example.aternos.me
  port: 61163,            // your port
  username: 'AFK_Bot'
})

bot.on('spawn', () => {
  console.log('Bot joined server ✅')

  setInterval(() => {
    bot.setControlState('jump', true)
    setTimeout(() => bot.setControlState('jump', false), 500)
  }, 30000)
})
