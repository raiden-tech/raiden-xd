const { exec } = require("child_process")

async function pullAndRestart(sock, jid) {
  
  try {
    await sock.sendMessage(jid, {
      text: "🔄 Updating from GitHub..."
    })

    exec("git pull origin main", (err, stdout, stderr) => {

      if (err) {
        sock.sendMessage(jid, {
          text: "❌ Update failed"
        })
        console.log(err)
        return
      }

      console.log(stdout)

      sock.sendMessage(jid, {
        text: "✅ Update complete\n♻ Restarting bot..."
      })

      // give message time to send
      setTimeout(() => {
        process.exit()
      }, 1500)
    })

  } catch (e) {
    console.log(e)
    await sock.sendMessage(jid, {
      text: "❌ Update error"
    })
  }
}

module.exports = { pullAndRestart }