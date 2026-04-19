const fs = require("fs")

module.exports = {
  command: "setmode",
  category: "owner",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text

    const mode = text.split(" ")[1]

    if (!mode || (mode !== "public" && mode !== "private")) {
      return sock.sendMessage(jid, {
        text:
`╭━━〔 ⚙️ 𝐒𝐄𝐓𝐌𝐎𝐃𝐄 〕━━⬣
┃ Usage: .setmode public / private
╰━━━━━━━━━━━━━━━━━━⬣`
      })
    }

    try {

      // Save mode to file (persistent)
      fs.writeFileSync("./lib/mode.json", JSON.stringify({ mode }))

      await sock.sendMessage(jid, {
        text:
`╭━━〔 ⚙️ 𝐌𝐎𝐃𝐄 𝐔𝐏𝐃𝐀𝐓𝐄𝐃 〕━━⬣
┃ Mode set to: ${mode.toUpperCase()}
╰━━━━━━━━━━━━━━━━━━⬣`
      })

    } catch (e) {
      await sock.sendMessage(jid, {
        text: `❌ Error: ${e.message}`
      })
    }
  }
}