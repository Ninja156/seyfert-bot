// @ts-check is better
const { config } = require('seyfert');

const { GatewayIntentBits } = require('seyfert/lib/types/index.js');
module.exports = config.bot({
   token: process.env.BOT_TOKEN ?? "",
   intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
],
   locations: {
       base: "src",
       output: "dist", //If you are using bun, set "src" instead
       commands: "commands",
       events: "events"
   }
});