module.exports = {
  command: "block",
  category: "user",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const text = msg.message?.conversation
    const target = text.split(" ")[1]

    if (!target) {
      return sock.sendMessage(jid, {
        text: "❌ 𝕋𝕒𝕘 𝕦𝕤𝕖𝕣 𝕥𝕠 𝕓𝕝𝕠𝕔𝕜"
      })
    }

    try {
      await sock.updateBlockStatus(target, "block")

      await sock.sendMessage(jid, {
        text: `
╭━━〔 👤 𝐁𝐋𝐎𝐂𝐊 𝐒𝐘𝐒𝐓𝐄𝐌 〕━━⬣
┃ ✔ User Blocked Successfully
┃ 🔒 Target: ${target}
╰━━━━━━━━━━━━━━━━━━⬣
`
      })

    } catch (e) {
      await sock.sendMessage(jid, {
        text: "❌ 𝔽𝕒𝕚𝕝𝕖𝕕 𝕥𝕠 𝕓𝕝𝕠𝕔𝕜 𝕦𝕤𝕖𝕣"
      })
    }
  }
}