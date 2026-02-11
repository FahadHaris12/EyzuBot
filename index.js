const mineflayer = require("mineflayer");
const express = require("express");

// Web server (for Render 24/7)
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running 24/7");
});

app.listen(3000, () => {
  console.log("Web server running");
});

// Create bot
const bot = mineflayer.createBot({
  host: "vnxace.aternos.me", // Your server IP
  port: 61163,               // Your Java port
  username: "EyzuBot"       // Bot name
});

// When bot joins
bot.on("spawn", () => {
  console.log("Bot joined server");

  // Anti-AFK jump
  setInterval(() => {
    bot.setControlState("jump", true);
    setTimeout(() => bot.setControlState("jump", false), 500);
  }, 30000);
});

// If bot disconnects
bot.on("end", () => {
  console.log("Bot disconnected");
});

