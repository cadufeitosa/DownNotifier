const Discord  = require("discord.js")
const axios = require('axios')
module.exports.run = async (client, message, args) => {
let newprefix = args[0]

    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You do not have Manage Guild permissions")

    if (!newprefix) {
        return message.channel.send("You must specify a prefix")
    }

    if (!isNaN(newprefix)) {
        return message.channel.send("Your prefix is a number. That is not allowed here!")
    }

    if (newprefix.length > 5) {
        return message.channel.send("Your prefix is too long. Please use up to 5 characters.")
    }

    axios.put(`${process.env.AXIOS_BASEURL}guild/changePrefix/${message.guild.id}`, {prefix: newprefix}).then(function (response) {
        if (response.status == 201) {
            message.channel.send(`Prefix successfully updated to ${newprefix}`)
        }
    }).catch(function (error) {
        if (error.response.status == 400) console.log("No guild exists")
        if (error.response.status == 500) console.log(error);
    });

}

module.exports.info = {
    name: "prefix"
}