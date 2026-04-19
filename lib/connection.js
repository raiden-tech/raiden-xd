const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const config = require("../config")

async function connectBot({ onPluginsLoad, getUptime }) {

  const { state, saveCreds } = await useMultiFileAuthState("auth")

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", async (update) => {
    const { connection } = update

    if (connection === "open") {

      console.log("✅ Bot Connected")

      // 🔔 PREMIUM OWNER MESSAGE
      await sock.sendMessage(config.ownerJid, {
        text: `
╭───〔 🤖 SYSTEM ONLINE 〕───⬣

✨ ${config.botName} is now ACTIVE

👤 Status     : Connected
⚡ Mode       : ${config.mode}
📡 Engine     : Baileys
⏱ Uptime     : ${getUptime()}

────────────────────

⚙️ QUICK ACTIONS
› Dashboard ready
› Plugins loaded
› System stable
› Awaiting commands

────────────────────
✔ All systems operational
╰────────────────────⬣
`
      })
    }
  })

  // load plugins externally
  onPluginsLoad(sock)

  return sock
}

module.exports = { connectBot }