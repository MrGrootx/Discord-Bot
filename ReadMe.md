# Moderation 
Kick
ban
timeout
embed-builder
server status



 1. Navigate to the `Bot` page on the [Discord Developer Portal](https://discord.com/developers/applications) and click `Reset Token`.
    2. Paste your bot token into the `token` variable inside the `.env` file.
    3. Paste your [MongoDB](https://www.mongodb.com) connection string into the `MONGODBURL` variable inside the `.env` file.
    4. Navigate to the `OAuth2` page and copy the `CLIENT ID`. 
    5. Paste your client ID into the `clientId` variable inside the `handleCommands.js` file.
    6. Navigate to your discord server, enable developer mode and right click the dropdown beside the server name. 
    7. Click `Copy Server ID` and paste it into the `guildId` variable inside the `handleCommands.js` file.
    8. Navigate to the `package.json` file and pay attention to the packages listed under `dependencies`.
    9. Open the terminal inside [Visual Studio Code](https://code.visualstudio.com/download) and install all the packages using `npm i <package-name>`. 
    for instance,
    ```js
    npm i discord.js
    ```
    10. Click the `run` button inside the terminal and type `node src/index.js` or `node .` to turn the bot online.