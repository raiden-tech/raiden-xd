module.exports = {
  command: "info",
  category: "basic",

  run: async (sock, msg, { uptime }) => {

    const jid = msg.key.remoteJid

    await sock.sendMessage(jid, {
      text:
`╭━━〔 ℹ️ 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎 〕━━⬣
┃ 🤖 Name: LYNXGOD BOT
┃ ⚡ Status: Online
┃ ⏱ Uptime: ${uptime}
┃ 📦 Mode: Public
┃ 🔌 Engine: Baileys
╰━━━━━━━━━━━━━━━━━━⬣`
    })
  }
}