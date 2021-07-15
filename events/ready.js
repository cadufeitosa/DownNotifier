module.exports = async (client) => {
    console.log(`Logged in with as ${client.user.tag}`);

    client.user.setStatus("dnd")

    client.user.setActivity("Checking Statuses!", {
        type: "PLAYING"
    });
}