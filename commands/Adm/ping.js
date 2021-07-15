module.exports.run = async (client, message, args) => {

    message.channel.send(`Ping = ${Math.floor(client.ws.ping)} ms`)
}

module.exports.info = {
    name: "ping"
}