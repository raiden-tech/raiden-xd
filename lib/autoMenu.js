const { loadPlugins } = require("./loader")

function buildMenu({ user, uptime }) {

  const plugins = loadPlugins()

  let grouped = {}

  // 🔥 GROUP COMMANDS BY CATEGORY
  for (let p of plugins) {
    if (!grouped[p.category]) grouped[p.category] = []
    grouped[p.category].push(p.command)
  }

  // 🔥 HEADER (PREMIUM STYLE)
  let text = `
╭────────────────────────╮
│ 🤖 REAPERTECH BOT      │
│ 👤 User : ${user}
│ ⏱ Uptime: ${uptime}
│ ⚡ Status: Online
│ 📦 System: Active
╰────────────────────────╯
`

  // 🔥 CATEGORY ICON MAP (makes it look premium)
  const icons = {
    basic: "📂 BASIC",
    system: "⚙️ SYSTEM",
    download: "📥 DOWNLOAD",
    tools: "🧰 TOOLS",
    user: "👤 USER",
    owner: "👑 OWNER"
  }

  // 🔥 BUILD CATEGORIES
  for (let cat in grouped) {

    text += `\n\n${icons[cat] || `📦 ${cat.toUpperCase()}`}\n`
    text += `────────────────────────\n`

    grouped[cat].forEach(cmd => {
      text += `› .${cmd}\n`
    })
  }

  // 🔥 FOOTER
  text += `
\n────────────────────────
⚡ Powered by ReaperTech⚡
`

  return text
}

module.exports = { buildMenu }