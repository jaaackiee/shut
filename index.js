const { Client, ActivityType } = require('discord.js');
const runFeatures = require("./util/runFeatures");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Status = require("./schemas/statusSchema.js");
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

client.on('ready', async () => {
    mongoose.connect(process.env.MONGO_URI);
    const res = await Status.findById("status");
    let type;
    switch (res.type) {
        case "PLAYING":
            type = ActivityType.Playing;
            break;
        case "LISTENING":
            type = ActivityType.Listening;
            break;
        case "WATCHING":
            type = ActivityType.Watching
            break;
    }
    client.user.setActivity(res.status, { type })
    console.log("Logged in as " + client.user.tag);
    runFeatures(client);
});

client.login(process.env.TOKEN);