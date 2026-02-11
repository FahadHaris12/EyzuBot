const mineflayer = require("mineflayer");
const express = require("express");

// Web server
const app = express();
app.get("/", (req, res) => {
  res.send("Bot is running 24/7");
});
app.listen(3000);

// Function to create bot
function createBot() {
  const bot = mineflayer.createBot({
    host: "vnxace.aternos.me",
    port: 61163,
    username: "EyzuBot",
  });

  bot.on("spawn", () => {
    console.log("Bot joined server");

    setInterval(() => {
      bot.setControlState("jump", true);
      setTimeout(() => bot.setControlState("jump", false), 500);
    }, 30000);
  });

  bot.on("end", () => {
    console.log("Bot disconnected, reconnecting...");
    setTimeout(createBot, 5000);
  });

  bot.on("error", console.log);
}

createBot();

