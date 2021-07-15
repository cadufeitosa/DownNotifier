const Discord  = require("discord.js")
module.exports.run = async (client, message, args) => {

    const embed = new Discord.MessageEmbed()
        .setTitle("Help!")
        .setColor([136, 227, 150])
        .setDescription("Available Commands: " + await client.commands.map(a => a.info.name).join(", "))

    message.channel.send(embed)
}

module.exports.info = {
    name: "help"
}