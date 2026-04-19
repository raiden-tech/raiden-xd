module.exports = {
  command: "eval",
  category: "owner",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text

    const args = text.split(" ").slice(1).join(" ")

    if (!args) {
      return sock.sendMessage(jid, {
        text: "❌ Provide code to evaluate"
      })
    }

    try {
      let result = eval(args)

      if (typeof result !== "string") {
        result = require("util").inspect(result)
      }

      await sock.sendMessage(jid, {
        text: `
╭━━〔 ⚡ 𝐄𝐕𝐀𝐋 𝐎𝐔𝐓𝐏𝐔𝐓 〕━━⬣
┃ ${result}
╰━━━━━━━━━━━━━━━━━━⬣
`
      })

    } catch (e) {
      await sock.sendMessage(jid, {
        text: `❌ Error:\n${e.message}`
      })
    }
  }
}