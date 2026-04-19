module.exports = {
  command: "runtime",
  category: "system",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const uptime = process.uptime()

    await sock.sendMessage(jid, {
      text:
`╭━━〔 ⏱ 𝐑𝐔𝐍𝐓𝐈𝐌𝐄 〕━━⬣
┃ ${Math.floor(uptime)} seconds
╰━━━━━━━━━━━━━━━━━━⬣`
    })
  }
}