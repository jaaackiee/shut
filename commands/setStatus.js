const { SlashCommandBuilder, PermissionFlagsBits, ActivityType } = require("discord.js");
const Status = require("../schemas/statusSchema.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setstatus")
        .setDescription("Sets a new playing/watching/listening status for the bot.")
        .addStringOption((option) => 
            option.setName("type")
                .setDescription("Playing, Listening, or Watching")
                .setRequired(true)
                .addChoices(
                    { name: "Playing", value: "PLAYING" },
                    { name: "Listening", value: "LISTENING" },
                    { name: "Watching", value: "WATCHING" }
                )
        )
        .addStringOption((option) =>
                    option.setName("value")
                        .setDescription("What are you doing?")
                        .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const value = interaction.options.getString("value");
        let type = interaction.options.getString("type");

        switch (type) {
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

        interaction.client.user.setActivity(value, { type });

        await Status.findOneAndUpdate({
            _id: "status"
        }, {
            _id: "status",
            type: interaction.options.getString("type"),
            status: value
        }, {
            upsert: true,
            new: true,
            useFindAndModify: false
        });

        await interaction.reply({
            content: "Set bot status to: **" + interaction.options.getString("type") + " " + value + "**!",
            ephemeral: true
        });
    },
}