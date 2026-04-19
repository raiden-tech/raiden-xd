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

// ✅ OWNER FROM ENV
const owner = process.env.OWNER || "263785858294@s.whatsapp.net"

// ✅ NUMBER FOR PAIRING
const number = process.env.NUMBER

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

  // 🔥 PAIRING CODE SYSTEM (FOR RENDER)
  if (!sock.authState.creds.registered && number) {
    try {
      const code = await sock.requestPairingCode(number)
      console.log("🔗 Pairing Code:", code)
    } catch (e) {
      console.log("Pairing Error:", e)
    }
  }

  // 🔥 CONNECTION HANDLER
  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "close") {
      const code = lastDisconnect?.error?.output?.statusCode
      const shouldReconnect = code !== DisconnectReason.loggedOut

      console.log("❌ Disconnected:", code)

      if (shouldReconnect) {
        setTimeout(() => startBot(), 5000) // ⏳ prevent spam loop
      }
    }

    if (connection === "open") {
      console.log("✅ Bot Connected")
    }
  })

  // 🔥 MESSAGE HANDLER
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return
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

    let plugins = []
    try {
      plugins = loadPlugins()
    } catch (e) {
      console.log("Plugin load error:", e)
    }

    const plugin = plugins.find(p => p.command === cmd)
    if (!plugin) return

    // 🔐 PRIVATE MODE
    if (mode === "private" && sender !== owner) {
      return sock.sendMessage(jid, {
        text: "🔒 Bot is in PRIVATE mode"
      })
    }

    // 🔐 OWNER COMMAND
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

// ✅ SAFE START
startBot().catch(err => {
  console.log("Fatal Error:", err)
})