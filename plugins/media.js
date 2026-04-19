const axios = require("axios")

module.exports = {
  command: "media",
  category: "download",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text

    const url = text.split(" ")[1]

    if (!url) {
      return sock.sendMessage(jid, {
        text:
`╭━━〔 ❌ 𝐄𝐑𝐑𝐎𝐑 〕━━⬣
┃ Provide MediaFire link
╰━━━━━━━━━━━━━━━━━━⬣`
      })
    }

    try {
      const res = await axios.get(
        `https://apis.davidcyril.name.ng/endpoints/download/mediafire-downloader?url=${url}`
      )

      const data = res.data

      if (!data.download_url) {
        return sock.sendMessage(jid, {
          text:
`╭━━〔 ❌ 𝐅𝐀𝐈𝐋𝐄𝐃 〕━━⬣
┃ Invalid or unsupported MediaFire link
╰━━━━━━━━━━━━━━━━━━⬣`
        })
      }

      await sock.sendMessage(jid, {
        document: { url: data.download_url },
        fileName: data.filename || "LYNXGOD_FILE",
        mimetype: data.mimetype || "application/octet-stream",
        caption:
`╭━━〔 📥 𝐌𝐄𝐃𝐈𝐀𝐅𝐈𝐑𝐄 〕━━⬣
┃ 📦 File Ready
┃ ⚡ Download Successful
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