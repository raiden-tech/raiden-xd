module.exports = {
  command: "me",
  category: "user",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const sender = msg.pushName || "User"

    await sock.sendMessage(jid, {
      text:
`╭━━〔 👤 𝐌𝐘 𝐏𝐑𝐎𝐅𝐈𝐋𝐄 〕━━⬣
┃ Name: ${sender}
┃ ID: ${msg.key.participant || jid}
╰━━━━━━━━━━━━━━━━━━⬣`
    })
  }
}