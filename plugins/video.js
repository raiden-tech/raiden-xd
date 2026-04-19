const axios = require("axios")

module.exports = {
  command: "video",
  category: "download",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text
    const query = text.split(" ").slice(1).join(" ")

    if (!query) {
      return sock.sendMessage(jid, {
        text: "❌ Provide video name"
      })
    }

    try {
      const res = await axios.get(
        `https://apis.davidcyril.name.ng/endpoints/download/youtube-mp4?query=${query}`
      )

      const data = res.data

      await sock.sendMessage(jid, {
        video: { url: data.download_url },
        caption:
`╭━━〔 🎥 𝐕𝐈𝐃𝐄𝐎 〕━━⬣
┃ ${data.title}
┃ ⚡ Downloaded Successfully
╰━━━━━━━━━━━━━━━━━━⬣`
      })

    } catch (e) {
      await sock.sendMessage(jid, {
        text: "❌ Video not found"
      })
    }
  }
}