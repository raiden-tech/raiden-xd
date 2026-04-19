const os = require("os")

module.exports = {
  command: "system",
  category: "system",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid

    await sock.sendMessage(jid, {
      text:
`╭━━〔 🖥 𝐒𝐘𝐒𝐓𝐄𝐌 〕━━⬣
┃ Platform: ${os.platform()}
┃ Arch: ${os.arch()}
┃ CPU: ${os.cpus()[0].model}
┃ RAM: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
╰━━━━━━━━━━━━━━━━━━⬣`
    })
  }
}