const fs = require("fs")
const { loadPlugins } = require("./lib/loader")
const P = require("pino")

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys")

const prefixFile = "./lib/prefix.json"
const modeFile = "./lib/mode.json"

let prefix = "."
let mode = "public"
const owner = "263785858294@s.whatsapp.net" // 🔥 PUT YOUR NUMBER

function loadConfig() {
  try {
    prefix = JSON.parse(fs.readFileSync(prefixFile)).prefix
  } catch {}

  try {
    mode = JSON.parse(fs.readFileSync(modeFile)).mode
  } catch {}
}

loadConfig()

async function startBot() {

  const { state, saveCreds } = await useMultiFileAuthState("./session")

  const sock = makeWASocket({
    auth: state,
    logger: P({ level: "silent" }),
    browser: ["LynxGod", "Chrome", "1.0"]
  })

  sock.ev.on("creds.update", saveCreds)

  console.log("🤖 LYNXGOD BOT STARTED")

  // 🔥 CONNECTION HANDLER
  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut

      console.log("❌ Disconnected. Reconnecting...", shouldReconnect)

      if (shouldReconnect) startBot()
    }

    if (connection === "open") {
      console.log("✅ Bot Connected")
    }
  })

  // 🔥 MESSAGE HANDLER
  sock.ev.on("messages.upsert", async ({ messages }) => {

    const msg = messages[0]
    if (!msg.message) return

    // ❌ ignore self messages
    if (msg.key.fromMe) return

    const jid = msg.key.remoteJid
    const sender = msg.key.participant || jid

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      ""

    if (!text.startsWith(prefix)) return

    const args = text.slice(prefix.length).trim().split(" ")
    const cmd = args.shift().toLowerCase()

    loadConfig()

    const plugins = loadPlugins()
    const plugin = plugins.find(p => p.command === cmd)

    if (!plugin) return

    // 🔐 PRIVATE MODE
    if (mode === "private" && sender !== owner) {
      return sock.sendMessage(jid, {
        text: "🔒 Bot is in PRIVATE mode"
      })
    }

    // 🔐 OWNER COMMAND PROTECTION
    if (plugin.category === "owner" && sender !== owner) {
      return sock.sendMessage(jid, {
        text: "🚫 Owner only command"
      })
    }

    try {
      await plugin.run(sock, msg, { args })
    } catch (e) {
      console.log("Command Error:", e)

      await sock.sendMessage(jid, {
        text: `❌ Error: ${cmd}`
      })
    }
  })
}

startBot()