const config = require("../config")

function buildMenu({ user, uptime, pluginCount }) {
  return `
✦ ${config.botName} ✦
|────────────────────────|

| ⟡ User     : ${user}
| ⟡ Owner    : ${config.owner}
| ⟡ Status   : Online
| ⟡ Mode     : ${config.mode}
| ⟡ Plugins  : ${pluginCount}
| ⟡ Uptime   : ${uptime}

|────────────────────────|

| ⟡ SYSTEM
| Version    : 1.0
| Prefix     : ${config.prefix}
| Library    : Baileys
| Platform   : Web

|────────────────────────|

| ⟡ COMMANDS
|
| › menu
| › alive
| › update

|────────────────────────|
✦ ReaperTech 2026 ✦
`
}

module.exports = { buildMenu }