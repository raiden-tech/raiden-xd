module.exports = {
  command: "shutdown",
  category: "owner",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid

    await sock.sendMessage(jid, {
      text:
`╭━━〔 ⚠️ 𝐒𝐇𝐔𝐓𝐃𝐎𝐖𝐍 〕━━⬣
┃ Bot is shutting down...
╰━━━━━━━━━━━━━━━━━━⬣`
    })

    process.exit(0)
  }
}