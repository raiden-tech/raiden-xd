const axios = require("axios")

module.exports = {
  command: "ytmp4",
  category: "download",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text
    const url = text.split(" ")[1]

    if (!url) {
      return sock.sendMessage(jid, {
        text:
`╭━━〔 ❌ 𝐄𝐑𝐑𝐎𝐑 〕━━⬣
┃ Provide YouTube link
╰━━━━━━━━━━━━━━━━━━⬣`
      })
    }

    try {
      const res = await axios.get(
        `https://apis.davidcyril.name.ng/endpoints/download/youtube-mp4?url=${url}`
      )

      const data = res.data

      await sock.sendMessage(jid, {
        image: { url: data.thumbnail },
        caption:
`╭━━〔 🎬 𝐘𝐓 𝐌𝐏𝟒 〕━━⬣
┃ 🎥 Title   : ${data.title}
┃ 👤 Channel : ${data.author || "Unknown"}
┃ ⏱ Duration : ${data.duration || "N/A"}
┃ 👁 Views   : ${data.views || "N/A"}
┃ 📥 Type    : Video
╰━━━━━━━━━━━━━━━━━━⬣`
      })

      await sock.sendMessage(jid, {
        video: { url: data.download_url },
        caption:
`╭━━〔 ✅ 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐃 〕━━⬣
┃ ${data.title}
╰━━━━━━━━━━━━━━━━━━⬣`
      })

    } catch (e) {
      await sock.sendMessage(jid, {
        text:
`╭━━〔 ❌ 𝐅𝐀𝐈𝐋𝐄𝐃 〕━━⬣
┃ ${e.message}
╰━━━━━━━━━━━━━━━━━━⬣`
      })
    }
  }
}