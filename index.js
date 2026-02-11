const mineflayer = require("mineflayer");
const express = require("express");

// ================= WEB SERVER (for Render 24/7) =================
const app = express();

app.get("/", (req, res) => {
res.send("EyzuBot is running 24/7 ✅");
});

app.listen(3000, () => {
console.log("Web server running");
});

// ================= BOT FUNCTION =================
function createBot() {

const bot = mineflayer.createBot({
host: "vnxace.aternos.me", // Your Aternos address
port: 61163,               // Your Java port
username: "EyzuBot"       // Bot name
});

// When bot joins
bot.on("spawn", () => {
console.log("✅ Bot joined server");

```
// Anti-AFK jump
setInterval(() => {
  bot.setControlState("jump", true);
  setTimeout(() => bot.setControlState("jump", false), 500);
}, 30000);
```

});

// If bot kicked / server restart
bot.on("end", () => {
console.log("❌ Bot disconnected — Reconnecting in 30s...");
setTimeout(createBot, 30000);
});

// If error happens
bot.on("error", (err) => {
console.log("⚠️ Bot error:", err.message);
});
}

// Start bot first time
createBot();
