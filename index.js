const mineflayer = require("mineflayer");
const express = require("express");

// Create web server for 24/7
const app = express();
app.get("/", (req, res) => {
  res.send("Bot is running 24/7");
});
app.listen(3000, () => {
  console.log("Web server running");
});

// Create Minecraft bot
const bot = mineflayer.createBot({
  host: "vnxace.aternos.me", // Example: eyzuserver.aternos.me
  port: 61163, // Java port
  username: "EyzuBot", // Bot name
});

// Bot spawns
bot.on("spawn", () => {
  console.log("Bot joined server");

  // Anti-AFK jump
  setInterval(() => {
    bot.setControlState("jump", true);
    setTimeout(() => bot.setControlState("jump", false), 500);
  }, 30000);
});

// Reconnect if kicked
bot.on("end", () => {
  console.log("Bot disconnected, reconnecting...");
  setTimeout(() => {
    bot = mineflayer.createBot({
      host: "YOUR_SERVER_IP",
      port: 61163,
      username: "EyzuBot",
    });
  }, 5000);
});
