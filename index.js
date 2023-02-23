const { Client } = require('discord.js');
const runFeatures = require("./util/runFeatures");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildMessageReactions",
        "DirectMessages",
        "MessageContent",
        "GuildMembers"
    ],
});

client.on('ready', () => {
    console.log("Logged in as " + client.user.tag);
    runFeatures(client);
});

client.login(process.env.TOKEN);