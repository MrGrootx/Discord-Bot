const { Client} = require("discord.js");
module.exports = {
    name: "test",
    description: "testdes",
    
    run : async  (client , interaction) => {

        await interaction.reply({ content: 'test' });
    }
    
}