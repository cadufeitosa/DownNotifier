const dotenv = require('dotenv').config()

const Discord = require('discord.js');
const fs = require('fs')

const client = new Discord.Client;

const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')

const guildRouter = require('./routes/guild');
const checkRouter = require('./routes/check')
const cronRouter = require('./cron/five')

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

global.clint = client;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}
);

connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        client.commands.set(command.info.name.toLowerCase(), command);
    }
    ;
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
}
;



app.use('/guild', guildRouter);
app.use('/check', checkRouter);
app.use('/cron', cronRouter)

app.get('/', (req, res) => {
    res.send("Public Route. There is nothing to see here. Go away, shoo!")
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

client.login(process.env.BOT_TOKEN_TESTE)