module.exports = {
  command: "jid",
  category: "user",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid

    await sock.sendMessage(jid, {
      text:
`╭━━〔 📍 𝐂𝐇𝐀𝐓 𝐉𝐈𝐃 〕━━⬣
┃ ${jid}
╰━━━━━━━━━━━━━━━━━━⬣`
    })
  }
}