const mineflayer = require('mineflayer');
const express = require("express");

const app = express();

//
// 🌐 Web Server (for uptime monitors)
//
app.get("/", (req, res) => {
  res.send("Bot is alive!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

//
// 🤖 Bot Function
//
function createBot() {

  const bot = mineflayer.createBot({
    host: "vnxace.aternos.me", // 🔁 change to your server
    port: 61163,                  // 🔁 change if different
    username: "kundi"           // 🔁 bot name
  });

  //
  // ✅ When bot joins
  //
  bot.on("spawn", () => {
    console.log("Bot joined the server");

    antiAfkMovement(bot);
  });

  //
  // 🔄 Auto reconnect if kicked / restart
  //
  bot.on("end", () => {
    console.log("Bot disconnected — reconnecting in 10s...");
    setTimeout(createBot, 15000);
  });

  bot.on("error", (err) => {
    console.log("Bot error:", err);
  });
}

createBot();

//
// 🕹️ Anti-AFK Movement System
//
function antiAfkMovement(bot) {

  setInterval(() => {

    // Random movement duration
    const moveTime = Math.floor(Math.random() * 3000) + 2000;

    // Random direction
    const movements = [
      "forward",
      "back",
      "left",
      "right"
    ];

    const move = movements[Math.floor(Math.random() * movements.length)];

    bot.setControlState(move, true);

    // Random jump
    if (Math.random() > 0.7) {
      bot.setControlState("jump", true);
      setTimeout(() => bot.setControlState("jump", false), 500);
    }

    // Random camera turn
    const yaw = Math.random() * Math.PI * 2;
    const pitch = (Math.random() - 0.5) * Math.PI / 2;

    bot.look(yaw, pitch, true);

    // Stop movement after time
    setTimeout(() => {
      bot.setControlState(move, false);
    }, moveTime);

  }, 5000); // Every 5 sec new action
}
