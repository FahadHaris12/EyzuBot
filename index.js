const mineflayer = require("mineflayer");
const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.send("Bot running");
});
app.listen(3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: "vnxace.aternos.me",
    port: 61163,
    username: "EyzuBot",
  });

  bot.on("spawn", () => {
    console.log("Bot joined");

    // Anti AFK
    setInterval(() => {
      bot.setControlState("jump", true);
      setTimeout(() => bot.setControlState("jump", false), 500);
    }, 30000);
  });

  bot.on("end", () => {
    console.log("Disconnected… reconnecting");
    setTimeout(createBot, 10000); // wait 10 sec
  });

  bot.on("error", (err) => {
    console.log("Bot error:", err.message);
  });
}

createBot();

