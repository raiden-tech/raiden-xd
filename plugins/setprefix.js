const fs = require("fs")

module.exports = {
  command: "setprefix",
  category: "owner",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text

    const prefix = text.split(" ")[1]

    if (!prefix) {
      return sock.sendMessage(jid, {
        text:
`╭━━〔 ⚙️ 𝐒𝐄𝐓𝐏𝐑𝐄𝐅𝐈𝐗 〕━━⬣
┃ Usage: .setprefix .
┃ Example: .setprefix !
╰━━━━━━━━━━━━━━━━━━⬣`
      })
    }

    try {

      fs.writeFileSync("./lib/prefix.json", JSON.stringify({ prefix }))

      await sock.sendMessage(jid, {
        text:
`╭━━〔 ⚙️ 𝐏𝐑𝐄𝐅𝐈𝐗 𝐔𝐏𝐃𝐀𝐓𝐄𝐃 〕━━⬣
┃ New Prefix: ${prefix}
╰━━━━━━━━━━━━━━━━━━⬣`
      })

    } catch (e) {
      await sock.sendMessage(jid, {
        text: `❌ Error: ${e.message}`
      })
    }
  }
}