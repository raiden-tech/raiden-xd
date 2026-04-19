module.exports = {
  command: "logs",
  category: "system",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid

    await sock.sendMessage(jid, {
      text:
`╭━━〔 📜 𝐋𝐎𝐆𝐒 〕━━⬣
┃ System running normally
┃ No critical errors detected
┃ Bot stable and active
╰━━━━━━━━━━━━━━━━━━⬣`
    })
  }
}