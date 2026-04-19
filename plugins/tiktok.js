const axios = require("axios")

module.exports = {
  command: "tiktok",
  category: "download",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text
    const url = text.split(" ")[1]

    if (!url) {
      return sock.sendMessage(jid, {
        text:
`╭━━〔 ❌ 𝐄𝐑𝐑𝐎𝐑 〕━━⬣
┃ Provide TikTok link
╰━━━━━━━━━━━━━━━━━━⬣`
      })
    }

    try {
      const res = await axios.get(
        `https://apis.davidcyril.name.ng/endpoints/download/tiktok-downloader?url=${url}`
      )

      const data = res.data

      await sock.sendMessage(jid, {
        video: { url: data.download_url },
        caption:
`╭━━〔 🎬 𝐓𝐈𝐊𝐓𝐎𝐊 〕━━⬣
┃ ⚡ Downloaded Successfully
┃ 🔥 LynxGod MediaEngine
╰━━━━━━━━━━━━━━━━━━⬣`
      })

    } catch (e) {
      await sock.sendMessage(jid, {
        text: "❌ Failed to download TikTok video"
      })
    }
  }
}