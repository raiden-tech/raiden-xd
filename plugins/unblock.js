module.exports = {
  command: "unblock",
  category: "user",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text
    const user = text.split(" ")[1]

    if (!user) {
      return sock.sendMessage(jid, {
        text: "❌ Provide user JID to unblock"
      })
    }

    try {
      await sock.updateBlockStatus(user, "unblock")

      await sock.sendMessage(jid, {
        text:
`╭━━〔 🔓 𝐔𝐍𝐁𝐋𝐎𝐂𝐊𝐄𝐃 〕━━⬣
┃ User unblocked successfully
╰━━━━━━━━━━━━━━━━━━⬣`
      })

    } catch (e) {
      await sock.sendMessage(jid, {
        text: `❌ Error: ${e.message}`
      })
    }
  }
}