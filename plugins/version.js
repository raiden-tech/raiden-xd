module.exports = {
  command: "version",
  category: "system",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid

    await sock.sendMessage(jid, {
      text:
`╭━━〔 📦 𝐕𝐄𝐑𝐒𝐈𝐎𝐍 〕━━⬣
┃ 🤖 LYNXGOD BOT
┃ 🔢 Version: 1.0.0
┃ ⚡ Engine: Baileys
┃ 📡 Status: Stable
╰━━━━━━━━━━━━━━━━━━⬣`
    })
  }
}