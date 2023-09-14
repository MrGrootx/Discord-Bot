
const mongoose = require('mongoose') 
const mongodbURL = process.env.MONGODBURL;
const global = require('../events/global')
require('colors')

const { client, interaction} = require('discord.js')
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        global.error(`${client.user.tag}  GOOD TO GO`.white);

        if(!mongodbURL) {
            global.warn("No database URL found!".red)
        }

        if (!mongodbURL) return;

        await mongoose.connect(mongodbURL || '', {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        
       

        if (mongoose.connect) {
            global.info("database Connected".blue)
        }

        async function pickPresence () {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        },
                    
                    ],

                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }
    },
};