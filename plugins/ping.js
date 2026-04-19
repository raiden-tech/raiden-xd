module.exports = {
  command: "ping",
  category: "basic",

  run: async (sock, msg) => {

    const start = Date.now()
    const jid = msg.key.remoteJid

    await sock.sendMessage(jid, {
      text: "🏓 Checking speed..."
    })

    const end = Date.now()

    await sock.sendMessage(jid, {
      text:
`╭━━〔 ⚡ 𝐏𝐈𝐍𝐆 〕━━⬣
┃ Speed: ${end - start}ms
┃ Status: Stable
╰━━━━━━━━━━━━━━━━━━⬣`
    })
  }
}