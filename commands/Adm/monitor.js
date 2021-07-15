const axios = require('axios')

module.exports.run = async (client, message, args) => {

    if (!args[0]) {
        return message.channel.send("Hey! You must include an URL to be monitored!")
    }

    function isUrl(s) {
        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        return regexp.test(s);
    }

    if (!isUrl(args[0])){
        return message.channel.send("Oops! It appears you did not include a valid URL. Please  follow this format: **https://<URL>.<DOMAIN>**")
    }

    axios.post(`${process.env.AXIOS_BASEURL}check/addCheck`, {owner: message.author.id, reqUrl: args[0], channelSend: message.channel.id}).then(function (response) {
        if (response.status === 201) {
            message.channel.send(`That's the way to do it! I'll notify you if the state of ${args[0]} changes :)`)
        }
    }).catch(function (err) {
        if (err.response.status === 500) console.log("Fatal error")
        if (err.response.status === 400 && err.response.data.internal === 2) {
            message.channel.send("Sorry, but you can't have more than one check for the same website at the moment!")
            return
        }
        message.channel.send("Oh no! There was an error :(")
        console.log(err.status)
    })

}

module.exports.info = {
    name: "monitoring",
    aliases: ["url"]
}