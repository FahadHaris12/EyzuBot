// index.js
const mineflayer = require("mineflayer");

// =================== CONFIG ===================
const config = {
  host: "vnxace.aternos.me",
  port: 61163,
  username: "AFKBot_04", // change name if duplicate login happens
  version: false, // auto-detect version

  jumpInterval: 3000, // jump every 3s
  runInterval: 1000, // change random direction every 1s
  breakInterval: 6000, // attempt block break every 6s
  breakScanRadius: 4, // max block search distance
  breakOnly: ["dirt", "grass_block", "stone"], // safe blocks

  rejoinInterval: 30000, // leave + rejoin every 30s
};
// ===============================================

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version,
  });

  bot.on("login", () => {
    console.log(
      `[bot] spawned as ${bot.username} on ${config.host}:${config.port}`
    );
    console.log(`[bot] AFK behaviors started`);
    startAFK();
  });

  bot.on("end", () => {
    console.log("[bot] disconnected, waiting to rejoin...");
  });

  bot.on("kicked", (reason) => console.log("[bot] kicked:", reason));
