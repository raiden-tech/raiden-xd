module.exports = {
  command: "id",
  category: "user",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const sender = msg.key.participant || jid

    await sock.sendMessage(jid, {
      text:
`╭━━〔 🆔 𝐔𝐒𝐄𝐑 𝐈𝐃 〕━━⬣
┃ ${sender}
╰━━━━━━━━━━━━━━━━━━⬣`
    })
  }
}