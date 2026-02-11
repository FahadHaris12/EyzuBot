const mineflayer = require("mineflayer");
const express = require("express");

// ================= WEB SERVER (24/7 KEEP ALIVE) =================
const app = express();

app.get("/", (req, res) => {
  res.send("EyzuBot is running 24/7 ✅");
});

app.listen(3000, () => {
  console.log("🌐 Web server running on port 3000");
});

// ================= BOT FUNCTION =================
function createBot() {

  const bot = mineflayer.createBot({
    host: "vnxace.aternos.me", // 🔁 CHANGE to your server IP
    port: 25565,               // 🔁 CHANGE if your Java port different
    username: "EyzuBot1"       // Bot name
  });

  // ===== When bot joins =====
  bot.on("spawn", () => {
    console.log("✅ Bot joined the server");

    // Anti-AFK Jump every 30 sec
    setInterval(() => {
      bot.setControlState("jump", true);

      setTimeout(() => {
        bot.setControlState("jump", false);
      }, 500);

    }, 30000);
  });

  // ===== Errors =====
  bot.on("error", (err) => {
    console.log("⚠️ Bot error:", err.message);
  });

  // ===== When disconnected =====
  bot.on("end", () => {
    console.log("❌ Bot disconnected");
    console.log("🔁 Reconnecting in 30 seconds...");

    setTimeout(() => {
      createBot();
    }, 30000);
  });
}

// Start bot first time
createBot();
