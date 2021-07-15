const axios = require('axios')
const Discord = require('discord.js')

module.exports = async (client, message) => {

    let prefix = "!"

    await axios.get(`${process.env.AXIOS_BASEURL}guild/getGuild/${message.guild.id}`).then(function (response) {
        if (response.status === 200) {
            prefix = response.data.guildExists.prefix
        }
    }).catch(function (error) {
        if (error.response.status === 400) console.log("There is no guild registered with this ID");
        if (error.response.status === 500) console.log("Fatal error");
    });

    if (message.author.bot || message.channel.type === "dm") return;

    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {

        const embed = new Discord.MessageEmbed()
            .setDescription(`Hey there! My prefix in this server is ${prefix}`)
            .addField(`Join my support server if you have any questions or have any ideas by clicking [here](https://discord.com/api/oauth2/authorize?client_id=718223728231841843&permissions=8&scope=bot)`)
            .addField(`Like my features? Add me to your server! [Click here!](https://discord.com/api/oauth2/authorize?client_id=718223728231841843&permissions=8&scope=bot)`)
            .setFooter('Down Notifier')
            .setColor('#45007a')
            .setThumbnail(message.author.avatarURL);

        message.channel.send(embed)

    }

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.info.aliases && cmd.info.aliases.includes(command));



    if (cmd) {
        cmd.run(client, message, args)
    }
}