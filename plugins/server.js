const os = require("os")

module.exports = {
  command: "server",
  category: "system",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid

    await sock.sendMessage(jid, {
      text:
`╭━━〔 🖥 𝐒𝐄𝐑𝐕𝐄𝐑 〕━━⬣
┃ Platform: ${os.platform()}
┃ CPU: ${os.cpus()[0].model}
┃ RAM: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
╰━━━━━━━━━━━━━━━━━━⬣`
    })
  }
}