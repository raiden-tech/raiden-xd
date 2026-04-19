module.exports = {
  command: "alive",
  category: "basic",

  run: async (sock, msg, { uptime }) => {

    const text = `
╭━━〔 🤖 𝐋𝐘𝐍𝐗𝐆𝐎𝐃 〕━━⬣
┃ ⚡ 𝐒𝐭𝐚𝐭𝐮𝐬 : 𝕆𝕟𝕝𝕚𝕟𝕖
┃ ⏱ 𝐔𝐩𝐭𝐢𝐦𝐞 : ${uptime}
┃ 🤖 𝐁𝐨𝐭 : 𝔸𝕔𝕥𝕚𝕧𝕖
╰━━━━━━━━━━━━━━⬣
`

    await sock.sendMessage(msg.key.remoteJid, { text })
  }
}