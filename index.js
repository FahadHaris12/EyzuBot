const mineflayer = require("mineflayer");
const express = require("express");

// ===== WEB SERVER (Render 24/7) =====
const app = express();

app.get("/", (req, res) => {
  res.send("EyzuBot is running 24/7 ✅");
});

app.listen(3000, () => {
  console.log("Web server running");
});

// ===== BOT FUNCTION =====
function createBot() {

  const bot = mineflayer.createBot({
    host: "vnxace.aternos.me", // Your Aternos IP
    port: 61163,               // Your Java port
    username: "EyzuBot"
  });

  // When bot joins
  bot.on("spawn", () => {
    console.log("✅ Bot joined server");

    // Anti-AFK jump
    setInterval(() => {
      bot.setControlState("jump", true);
      setTimeout(() => bot.setControlState("jump", false), 500);
    }, 30000);
  });

  // Errors
  bot.on("error", (err) => {
    console.log("⚠️ Bot error:", err.message);
  });

  // Reconnect when disconnected
  bot.on("end", () => {
    console.log("❌ Bot disconnected — Reconnecting in 30s...");
    setTimeout(createBot, 30000);
  });
}

// Start bot
createBot();

