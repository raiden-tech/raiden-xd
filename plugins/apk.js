const axios = require("axios")

module.exports = {
  command: "apk",
  category: "download",

  run: async (sock, msg) => {

    const text = msg.message?.conversation
    const query = text.split(" ")[1]

    if (!query) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❌ 𝔼𝕟𝕥𝕖𝕣 𝔸𝕡𝕡 ℕ𝕒𝕞𝕖"
      })
    }

    try {
      const res = await axios.get(
        `https://apis.davidcyril.name.ng/endpoints/download/apk-downloader?query=${query}`
      )

      const data = res.data

      await sock.sendMessage(msg.key.remoteJid, {
        document: { url: data.download_url },
        mimetype: "application/vnd.android.package-archive",
        fileName: `${data.name}.apk`,
        caption: `📦 𝐋𝐘𝐍𝐗𝐆𝐎𝐃 𝐀𝐏𝐊\n\n┃ Name: ${data.name}\n┃ Size: ${data.size}`
      })

    } catch {
      await sock.sendMessage(msg.key.remoteJid, {
        text: "❌ 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐅𝐚𝐢𝐥𝐞𝐝"
      })
    }
  }
}