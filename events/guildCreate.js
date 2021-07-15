const Discord = require("discord.js"); // Dc library
const axios = require('axios');
module.exports = async (client, guild) => {

axios.post(`${process.env.AXIOS_BASEURL}guild/newGuild`, {guild_id: guild.id}).then(function (response) {
    if (response.status == 201) {
        console.log("New guild added")
    }
}).catch(function (error) {
    if (error.response.status == 400) console.log("Guild already saved or ")
    if (error.response.status == 500) console.log(error);
});

    const joinEmbed = new Discord.MessageEmbed()
        .setTitle("● Novo servidor")
        .setColor([136, 227, 150])
        .setDescription(`
    ➜ Nome: ${guild.name}
    ➜ ID: ${guild.id}
    ➜ Membros: ${guild.memberCount}`)
        .setTimestamp();

    client.channels.cache.get("855987472969236501").send(joinEmbed);

}