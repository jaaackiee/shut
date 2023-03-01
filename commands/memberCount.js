const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mc")
        .setDescription("View the amount of members in the server."),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x2a2d31)
            .setDescription("we have **" + interaction.guild.memberCount + "** members ! <a:u_cat2:1077587565550510111>");

        return await interaction.reply({
            embeds: [embed]
        });
    }
}
