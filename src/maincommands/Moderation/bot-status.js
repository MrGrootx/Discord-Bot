const {
  SlashCommandBuilder,
  PermissionsBitField,
  ActivityType,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bot-status")
    .setDescription("change the bots status")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("activity")
        .setDescription("change the bots activity")
        .addStringOption((option) =>
          option
            .setName("type")
            .setDescription("choose an activity")
            .setRequired(true)
            .addChoices(
              { name: "Playing", value: "Playing" },
              { name: "Streaming", value: "Streaming" },
              { name: "Listening", value: "Listening" },
              { name: "Watching", value: "Watching" },
              { name: "Competing", value: "Competing" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("activity")
            .setDescription("Set your current activity.")
            .setRequired(true)
            .setMinLength(4)
            .setMaxLength(15)
        )
    ),
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return interaction.reply({
        content: "You don't have permission to use this command!",
        ephemeral: true,
      });

    const { options } = interaction;

    const sub = options.getSubcommand(["activity"]);
    const type = options.getString("type");
    const activity = options.getString("activity");

    try {
      switch (sub) {
        case "activity":
          switch (type) {
            case "Playing":
              client.user.setActivity(activity, { type: ActivityType.Playing });
              break;
            case "Streaming":
              client.user.setActivity(activity, {
                type: ActivityType.Streaming,
              });
              break;
            case "Listening":
              client.user.setActivity(activity, {
                type: ActivityType.Listening,
              });
              break;
            case "Watching":
              client.user.setActivity(activity, {
                type: ActivityType.Watching,
              });
              break;
            case "Competing":
              client.user.setActivity(activity, {
                type: ActivityType.Competing,
              });
              break;
          }

        case "status":
          client.user.setPresence({ status: type });
          break;
      }
    } catch (e) {
      return;
    }

    const embed = new EmbedBuilder();
    return interaction.reply({
      embeds: [
        embed
          .setColor("NotQuiteBlack")
          .setDescription(`Status Sucessfully Changed\n* Status : ${type} \n* Changed Name : ${activity}`)
          .setThumbnail(interaction.user.displayAvatarURL())
          .setFooter({ text: `Changed by ${interaction.user.username}` })
          .setTimestamp(),
      ],
    });
  },
};



/**  
 *Coded By : Mr Groot#9862
*/