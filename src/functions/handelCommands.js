const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { get } = require("http");
require('colors')
const global = require('../events/global');

const clientId = process.env.BOT_ID; 
const guildId = process.env.GUILD_ID; 


module.exports = (client) => {

    

    client.handleCommands = async (commandFolders, path) => {

        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../maincommands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
                global.warn(`${command.data.name} Command Loaded!  `.yellow); 
            }
            
        }

        const rest = new REST({
            version: '9'
        }).setToken(process.env.token);

        (async () => {
            try {
                await rest.put(
                    Routes.applicationCommands(clientId), {
                        body: client.commandArray
                    },
                );
                global.success('Application are Sucessfully  Reloaded'.red)
            } catch (error) {
                console.error(error);
            }
        })();
    };
};