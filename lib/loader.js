const fs = require("fs")
const path = require("path")

function loadPlugins() {

  const pluginPath = path.join(__dirname, "../plugins")
  const files = fs.readdirSync(pluginPath)

  let plugins = []

  for (let file of files) {

    if (!file.endsWith(".js")) continue

    try {
      // 🔥 Clear cache so updates apply
      delete require.cache[require.resolve(`../plugins/${file}`)]

      const plugin = require(`../plugins/${file}`)

      if (plugin.command && plugin.category) {
        plugins.push(plugin)
      }

    } catch (err) {
      console.log(`❌ Plugin Error: ${file}`, err.message)
    }
  }

  return plugins
}

module.exports = { loadPlugins }