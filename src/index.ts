
process.loadEnvFile();

import { Client, ParseClient } from "seyfert";

import { LavalinkManager } from "lavalink-client";
import { HandleCommand } from "seyfert/lib/commands/handle";
import { Yuna } from "yunaforseyfert";

//Use a custom client to make the types work
class CustomClient extends Client<true> {
  readonly lavalink: LavalinkManager;

  constructor() {
    super({
      commands: {
        prefix: () => ["arle"]
      }
    });

    this.lavalink = new LavalinkManager({
      sendToShard: (guildId, payload) => this.gateway.send(this.gateway.calculateShardId(guildId), payload),
      nodes: [
        {
          authorization: "ganyuontopuwu",
          host: "localhost",
          port: 2333,
          id: "Node"
        }
      ],
    })
  }
}
const client = new CustomClient();

//client.lavalink.nodeManager.on("raw", (json) => console.info(json))
client.lavalink.nodeManager.on("connect", (node) => console.info(`The node ${node.id} is connected`))
client.lavalink.nodeManager.on("disconnect", (node) => console.info(`The node ${node.id} is disconnected`))

client.lavalink.on("trackError", (_player, track, payload) => {
  console.log("trackError", { track, payload });
});
client.lavalink.on("trackStuck", (_player, track, payload) => {
  console.log("trackStuck", { track, payload });
});
client.lavalink.on("trackStart", (_player, track, payload) => {
  console.log("trackStart", { track, payload });
});

client.setServices({
  handleCommand: class extends HandleCommand {
    argsParser = Yuna.parser(); // Here are the settings, but that will be explained below
  },
});

declare module "seyfert" {
  interface UsingClient extends ParseClient<CustomClient> { }
  interface InternalOptions {
    withPrefix: true;
  }
}

client.start().then(() => client.uploadCommands());