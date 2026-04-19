const { exec } = require("child_process")

module.exports = {
  command: "exec",
  category: "owner",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text

    const cmd = text.split(" ").slice(1).join(" ")

    if (!cmd) {
      return sock.sendMessage(jid, {
        text: "❌ Provide command to execute"
      })
    }

    exec(cmd, async (err, stdout, stderr) => {

      if (err) {
        return sock.sendMessage(jid, {
          text: `❌ Error:\n${err.message}`
        })
      }

      if (stderr) {
        return sock.sendMessage(jid, {
          text: `⚠️ Stderr:\n${stderr}`
        })
      }

      await sock.sendMessage(jid, {
        text: `
╭━━〔 🖥 𝐄𝐗𝐄𝐂 𝐎𝐔𝐓𝐏𝐔𝐓 〕━━⬣
┃ ${stdout}
╰━━━━━━━━━━━━━━━━━━⬣
`
      })
    })
  }
}