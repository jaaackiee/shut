const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("seticon")
        .setDescription("Change the bot's icon.")
        .addStringOption((option) =>
            option.setName("image")
                .setDescription("Image URL used for new icon")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        try {
            await interaction.client.user.setAvatar(interaction.options.getString("image"));
        } catch (error) {
            console.log(error);
            return await interaction.reply({
                content: "Invalid URL!",
                ephemeral: true
            });
        }

        return await interaction.reply({
            content: "Updated bot's icon. May take a few minutes to show.",
            ephemeral: true
        });
    }
}