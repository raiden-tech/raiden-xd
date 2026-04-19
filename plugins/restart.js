module.exports = {
  command: "restart",
  category: "owner",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid

    await sock.sendMessage(jid, {
      text:
`╭━━〔 🔄 𝐑𝐄𝐒𝐓𝐀𝐑𝐓 〕━━⬣
┃ Bot restarting...
╰━━━━━━━━━━━━━━━━━━⬣`
    })

    process.exit(0)
  }
}