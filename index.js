const { Client } = require('discord.js');
const runFeatures = require("./util/runFeatures");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
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
    mongoose.connect(process.env.MONGO_URI);
    console.log("Logged in as " + client.user.tag);
    runFeatures(client);
});

client.login(process.env.TOKEN);