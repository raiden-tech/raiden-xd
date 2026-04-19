module.exports = {
  command: "speed",
  category: "system",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const start = Date.now()

    await sock.sendMessage(jid, {
      text: "🏓 Testing speed..."
    })

    const end = Date.now()

    await sock.sendMessage(jid, {
      text:
`╭━━〔 ⚡ 𝐒𝐏𝐄𝐄𝐃 〕━━⬣
┃ ${end - start}ms
╰━━━━━━━━━━━━━━━━━━⬣`
    })
  }
}