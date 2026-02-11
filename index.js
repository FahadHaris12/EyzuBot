const mineflayer = require("mineflayer");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Keep-alive web server
app.get("/", (req, res) => {
  res.send("Eyzu Bot is running 24/7");
});

app.listen(PORT, () => {
  console.log("Web server running");
});

// ===== BOT FUNCTION =====
function createBot() {
  console.log("Starting bot...");

  const bot = mineflayer.createBot({
    host: "vnxace.aternos.me",   // example: abc.aternos.me
    port: 61163,              // your port
    username: "EyzuBot"
  });

  bot.on("login", () => {
    console.log("✅ Bot connected");
  });

  bot.on("spawn", () => {
    console.log("📍 Bot spawned in server");
  });

  bot.on("end", () => {
    console.log("❌ Bot disconnected — Reconnecting in 30s...");
    setTimeout(createBot, 30000);
  });

  bot.on("error", (err) => {
    console.log("⚠️ Bot error:", err.code || err.message);
  });
}

// Start first time
createBot();
