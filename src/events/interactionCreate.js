

const { Interaction } = require("discord.js");

const allowid = ['dev_id_here'];

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        if (command.devOnly && !allowid.includes(interaction.user.id)) {
            return interaction.reply({
                content: ':warning: This command is only for developers',
                ephemeral: true
            });
        }
        
        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'Something went wrong', 
                ephemeral: true
            });

        }


    },
};


/**  
 *Coded By : Mr Groot#9862
*/