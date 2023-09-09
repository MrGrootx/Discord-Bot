
const mongoose = require('mongoose') 
const mongodbURL = process.env.MONGODBURL;

const { client, interaction} = require('discord.js')
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log( '\x1b[32m', `Hey i am Ready to go`);

        if (!mongodbURL) return;

        await mongoose.connect(mongodbURL || '', {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        
        if (mongoose.connect) {
            console.log( '\x1b[33m', "The database is running!")
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