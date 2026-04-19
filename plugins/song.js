const axios = require("axios")

module.exports = {
  command: "song",
  category: "download",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text
    const query = text.split(" ").slice(1).join(" ")

    if (!query) {
      return sock.sendMessage(jid, {
        text: "❌ Provide song name"
      })
    }

    try {
      const res = await axios.get(
        `https://apis.davidcyril.name.ng/endpoints/download/song-download?query=${query}`
      )

      const data = res.data

      await sock.sendMessage(jid, {
        image: { url: data.thumbnail },
        caption:
`╭━━〔 🎵 𝐒𝐎𝐍𝐆 〕━━⬣
┃ 🎧 ${data.title}
┃ 👤 Artist: ${data.artist || "Unknown"}
┃ ⏱ Duration: ${data.duration || "N/A"}
╰━━━━━━━━━━━━━━━━━━⬣`
      })

      await sock.sendMessage(jid, {
        audio: { url: data.download_url },
        mimetype: "audio/mp4"
      })

    } catch (e) {
      await sock.sendMessage(jid, {
        text: "❌ Song not found"
      })
    }
  }
}