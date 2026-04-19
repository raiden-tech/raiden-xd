const axios = require("axios")

module.exports = {
  command: "twitter",
  category: "download",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text
    const url = text.split(" ")[1]

    if (!url) {
      return sock.sendMessage(jid, {
        text: "❌ Provide Twitter/X link"
      })
    }

    try {
      const res = await axios.get(
        `https://apis.davidcyril.name.ng/endpoints/download/twitter-downloader?url=${url}`
      )

      const data = res.data

      await sock.sendMessage(jid, {
        video: { url: data.download_url },
        caption:
`╭━━〔 🐦 𝐓𝐖𝐈𝐓𝐓𝐄𝐑 〕━━⬣
┃ ⚡ Download Complete
╰━━━━━━━━━━━━━━━━━━⬣`
      })

    } catch (e) {
      await sock.sendMessage(jid, {
        text: "❌ Twitter download failed"
      })
    }
  }
}