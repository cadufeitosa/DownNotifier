const Discord = require("discord.js");
const axios = require('axios');
module.exports = (client, guild) => {

    axios.delete(`${process.env.AXIOS_BASEURL}guild/deleteGuild/${guild.id}`).then(function (response) {
        if (response.status === 201) return console.log("Guild removed");
    }).catch(function (error) {
        if (error.response.status === 400) console.log("There is no guild registered with this ID");
        if (error.response.status === 500) console.log("Fatal error");
    });

    const exitEmbed = new Discord.MessageEmbed()
        .setTitle("● Saiu do servidor")
        .setColor([255, 102, 102])
        .setDescription(`
    ➜ Nome: ${guild.name}
    ➜ ID: ${guild.id}
    ➜ Membros: ${guild.memberCount}`)
        .setTimestamp();

    client.channels.cache.get("855992549671567360").send(exitEmbed);
};