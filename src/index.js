const { Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
  MessageManager,
  Embed,
  Collection,
  ActivityType,
  Status,
  Partials
} = require(`discord.js`);

const global = require('./events/global');

const fs = require('fs');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildPresences



  ],
  Partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction
  ]
});




client.commands = new Collection();
client.prefix = new Map()

require('dotenv').config();




const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/maincommands");
const prefixFolders = fs.readdirSync("./src/prefixcommands").filter((f) => f.endsWith(".js"));


for (arx of prefixFolders) {
  const Cmd = require('./prefixcommands/' + arx)
  client.prefix.set(Cmd.name, Cmd)
}


// error handling start

const process = require('node:process');

process.on('unhandledRejection', async (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught Expection:', err);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log('Uncaught Expection Monitor', err, origin);
});

// error handling end




(async () => {
  for (file of functions) {
    require(`./functions/${file}`)(client);
  }
  client.handleEvents(eventFiles, "./src/events");
  client.handleCommands(commandFolders, "./src/maincommands");
  client.login(process.env.token)
})();

client.on('messageCreate', async message => {

  const prefix = process.env.PREFIX;

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const prefixcmd = client.prefix.get(command);

  if (prefixcmd) {
    prefixcmd.run(client, message, args)
  }

});


// Activity start 

let rulestatus = [
  {
    name: "Name 1",
    type: ActivityType.Listening,
  },

  {
    name: "Name 2",
    type: ActivityType.Watching,
  },

  {
    name: "Name 3",
    type: ActivityType.Streaming,
    url: "https://www.twitch.tv/"
  }

]

client.on('ready', (c) => {
  // console.log(`${client.user.tag} is ready!`)


  setInterval(() => {
    let random = Math.floor(Math.random() * rulestatus.length)
    client.user.setActivity(rulestatus[random])
  }, 10000)
})
// Activity end






