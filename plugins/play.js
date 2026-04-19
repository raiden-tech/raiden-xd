const axios = require("axios")

module.exports = {
  command: "play",
  category: "download",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text
    const query = text.split(" ").slice(1).join(" ")

    if (!query) {
      return sock.sendMessage(jid, {
        text:
`╭━━〔 ❌ 𝐄𝐑𝐑𝐎𝐑 〕━━⬣
┃ Provide song name
╰━━━━━━━━━━━━━━━━━━⬣`
      })
    }

    try {
      const res = await axios.get(
        `https://apis.davidcyril.name.ng/endpoints/download/song-download?query=${query}`
      )

      const data = res.data

      await sock.sendMessage(jid, {
        audio: { url: data.download_url },
        mimetype: "audio/mp4",
        caption:
`╭━━〔 🎵 𝐏𝐋𝐀𝐘 〕━━⬣
┃ 🎧 ${data.title}
┃ ⚡ Streaming now...
╰━━━━━━━━━━━━━━━━━━⬣`
      })

    } catch (e) {
      await sock.sendMessage(jid, {
        text: `❌ Failed to play song`
      })
    }
  }
}