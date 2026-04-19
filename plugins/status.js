module.exports = {
  command: "status",
  category: "system",

  run: async (sock, msg, { uptime }) => {

    const jid = msg.key.remoteJid

    await sock.sendMessage(jid, {
      text:
`╭━━〔 📊 𝐒𝐓𝐀𝐓𝐔𝐒 〕━━⬣
┃ 🤖 Bot: Online
┃ ⚡ Uptime: ${uptime}
┃ 📦 Mode: Active
┃ 🔌 Engine: Baileys
╰━━━━━━━━━━━━━━━━━━⬣`
    })
  }
}