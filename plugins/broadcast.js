module.exports = {
  command: "broadcast",
  category: "owner",

  run: async (sock, msg) => {

    const jid = msg.key.remoteJid
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text

    const args = text.split(" ").slice(1).join(" ")

    if (!args) {
      return sock.sendMessage(jid, {
        text: "❌ 𝔼𝕟𝕥𝕖𝕣 𝕓𝕣𝕠𝕒𝕕𝕔𝕒𝕤𝕥 𝕞𝕖𝕤𝕤𝕒𝕘𝕖"
      })
    }

    try {

      const groups = await sock.groupFetchAllParticipating()
      const groupIds = Object.keys(groups)

      for (let id of groupIds) {
        await sock.sendMessage(id, {
          text: `
╭━━〔 📢 𝐋𝐘𝐍𝐗𝐆𝐎𝐃 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓 〕━━⬣
┃ 📩 ${args}
╰━━━━━━━━━━━━━━━━━━⬣
`
        })
      }

      await sock.sendMessage(jid, {
        text: `
✔ 𝐁𝐫𝐨𝐚𝐝𝐜𝐚𝐬𝐭 𝐒𝐞𝐧𝐭 𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲
📦 Groups: ${groupIds.length}
`
      })

    } catch (e) {
      await sock.sendMessage(jid, {
        text: "❌ Broadcast failed"
      })
    }
  }
}