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

// Function to create the bot
function createBot() {
  const bot = mineflayer.createBot({
    host: "vnxace.aternos.me", // Java IP from Aternos
    port: 61163,               // Java port (check Aternos Java connect tab)
    username: "EyzuBot",
    timeout: 60000,            // 60 seconds timeout
    auth: "offline"            // optional if server allows offline/cracked
  });

  bot.on("spawn", () => {
    console.log("Bot joined server");

    // Anti-AFK jump
    setInterval(() => {
      bot.setControlState("jump", true);
      setTimeout(() => bot.setControlState("jump", false), 500);
    }, 30000);
  });

  // Reconnect if disconnected
  bot.on("end", () => {
    console.log("Bot disconnected, reconnecting...");
    setTimeout(createBot, 5000); // call the same function to reconnect
  });

  bot.on("error", err => console.log("Bot error:", err));
}

// Start bot
createBot();
