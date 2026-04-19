const axios = require("axios")

module.exports = {
  command: "fb",
  category: "download",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text
    const url = text.split(" ")[1]

    if (!url) {
      return sock.sendMessage(jid, {
        text:
`╭━━〔 ❌ 𝐄𝐑𝐑𝐎𝐑 〕━━⬣
┃ Please provide Facebook URL
╰━━━━━━━━━━━━━━━━━━⬣`
      })
    }

    try {
      const res = await axios.get(
        `https://apis.davidcyril.name.ng/endpoints/download/facebook-downloader?url=${url}`
      )

      const data = res.data

      if (!data.download_url) {
        return sock.sendMessage(jid, {
          text:
`╭━━〔 ❌ 𝐅𝐀𝐈𝐋𝐄𝐃 〕━━⬣
┃ Video not found or unsupported link
╰━━━━━━━━━━━━━━━━━━⬣`
        })
      }

      // 🎬 SEND VIDEO FIRST
      await sock.sendMessage(jid, {
        video: { url: data.download_url },
        caption:
`╭━━〔 📥 𝐅𝐁 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 〕━━⬣
┃ 🎬 Title : ${data.title || "Unknown"}
┃ 🌐 Source: Facebook
┃ ⚡ Status: Downloaded
╰━━━━━━━━━━━━━━━━━━⬣`
      })

    } catch (e) {
      await sock.sendMessage(jid, {
        text:
`╭━━〔 ⚠️ 𝐄𝐑𝐑𝐎𝐑 〕━━⬣
┃ ${e.message}
╰━━━━━━━━━━━━━━━━━━⬣`
      })
    }
  }
}