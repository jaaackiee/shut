const { EmbedBuilder } = require("@discordjs/builders");

module.exports = (client) => {
    client.on("guildMemberAdd", (member) => {
        const count = member.guild.memberCount;
        let suffix;
        switch (count.toString().substring(count.toString().length - 1, count.toString().length)) {
            case "1":
                suffix = "st"
                break;
            case "2":
                suffix = "nd"
                break;
            case "3":
                suffix = "rd"
                break;
            default:
                suffix = "th"
        }

        const embed = new EmbedBuilder()
            .setColor(0x2a2d31)
            .setTitle("heyy " + member.user.username)
            .setDescription("thank you for joining <a:3m_kiss:1077472269888143492>\n﹒you can get some roles [here](https://discord.com/channels/1077063223410446336/1077063223972466704)!")
            .setThumbnail("https://i.imgur.com/jU9LxTk.jpg")
            .setFooter({
                text: member.guild.memberCount + suffix + " member",
                iconURL: member.guild.iconURL()
            });

        const channel = client.channels.cache.get("1077063223972466707");
        channel.send({
            content: "<@" + member.user + ">",
            embeds: [embed]
        });
    });
}