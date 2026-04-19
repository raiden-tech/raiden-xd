const fs = require("fs")

function loadPlugins() {
  const files = fs.readdirSync("./plugins")

  let plugins = []

  for (let file of files) {
    if (!file.endsWith(".js")) continue

    const plugin = require(`../plugins/${file}`)

    if (plugin.command && plugin.category) {
      plugins.push(plugin)
    }
  }

  return plugins
}

module.exports = { loadPlugins }