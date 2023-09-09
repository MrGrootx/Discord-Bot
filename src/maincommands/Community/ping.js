const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pong'),
    devOnly : false, 
    async execute(interaction, client) {
        await interaction.reply({ content: 'pong' })
    }
}