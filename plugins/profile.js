module.exports = {
  command: "profile",
  category: "user",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const name = msg.pushName || "User"

    await sock.sendMessage(jid, {
      text:
`╭━━〔 👤 𝐏𝐑𝐎𝐅𝐈𝐋𝐄 〕━━⬣
┃ Name: ${name}
┃ Chat: ${jid}
┃ Status: Active
╰━━━━━━━━━━━━━━━━━━⬣`
    })
  }
}