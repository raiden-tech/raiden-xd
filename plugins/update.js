const axios = require("axios")

module.exports = {
  command: "update",
  category: "system",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid

    try {
      await sock.sendMessage(jid, {
        text:
`╭━━〔 🔄 𝐔𝐏𝐃𝐀𝐓𝐈𝐍𝐆 〕━━⬣
┃ Checking GitHub repo...
╰━━━━━━━━━━━━━━━━━━⬣`
      })

      // 🔥 Fetch latest version file from GitHub
      const res = await axios.get(
        "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/version.json"
      )

      const remoteVersion = res.data.version

      await sock.sendMessage(jid, {
        text:
`╭━━〔 📦 𝐕𝐄𝐑𝐒𝐈𝐎𝐍 〕━━⬣
┃ Latest Version: ${remoteVersion}
┃ Update System: GitHub Sync
╰━━━━━━━━━━━━━━━━━━⬣`
      })

      // ⚠️ Trigger restart (your deployer handles reload)
      setTimeout(() => {
        process.exit(0)
      }, 2000)

    } catch (e) {
      await sock.sendMessage(jid, {
        text:
`╭━━〔 ❌ 𝐔𝐏𝐃𝐀𝐓𝐄 𝐅𝐀𝐈𝐋𝐄𝐃 〕━━⬣
┃ ${e.message}
╰━━━━━━━━━━━━━━━━━━⬣`
      })
    }
  }
}