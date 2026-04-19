const axios = require("axios")

module.exports = {
  command: "insta",
  category: "download",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text
    const url = text.split(" ")[1]

    if (!url) {
      return sock.sendMessage(jid, {
        text:
`╭━━〔 ❌ 𝐄𝐑𝐑𝐎𝐑 〕━━⬣
┃ Provide Instagram URL
╰━━━━━━━━━━━━━━━━━━⬣`
      })
    }

    try {
      const res = await axios.get(
        `https://apis.davidcyril.name.ng/endpoints/download/instagram-downloader?url=${url}`
      )

      const data = res.data

      await sock.sendMessage(jid, {
        video: { url: data.download_url },
        caption:
`╭━━〔 📸 𝐈𝐍𝐒𝐓𝐀 𝐃𝐋 〕━━⬣
┃ ⚡ Downloaded Successfully
┃ 🌐 Source: Instagram
╰━━━━━━━━━━━━━━━━━━⬣`
      })

    } catch (e) {
      await sock.sendMessage(jid, {
        text:
`╭━━〔 ❌ 𝐄𝐑𝐑𝐎𝐑 〕━━⬣
┃ ${e.message}
╰━━━━━━━━━━━━━━━━━━⬣`
      })
    }
  }
}