
import { Client, ParseClient } from "seyfert";

import { LavalinkManager } from "lavalink-client";
import { HandleCommand } from "seyfert/lib/commands/handle";
import { Yuna } from "yunaforseyfert";

const client = new Client({
  commands: {
    prefix: () => {
        return ['!']
    }
}
}) as Client & { lavalink: LavalinkManager }; 


client.lavalink = new LavalinkManager({
  nodes: [
      { 
          authorization: "jompo",
          host: "lavalink.jompo.cloud",
          port: 2333,
          id: "Node"
      }
  ],
  autoSkipOnResolveError: true,
  sendToShard: (guildId, payload) =>
    client.gateway.send(client.gateway.calculateShardId(guildId), payload)

  })
  // client.lavalink.nodeManager.on("raw", (json) => console.info(json))
  client.lavalink.on("trackError", (_player, track, payload) => {
    console.log("trackError", "track", track, "payload", payload);
  });
  client.lavalink.on("trackStuck", (_player, track, payload) => {
    console.log("trackStuck", "track", track, "payload", payload);
  });
  client.lavalink.on("trackStart", (_player, track, payload) => {
    console.log("trackStart", "track", track, "payload", payload);
  });

class YourHandleCommand extends HandleCommand {
  argsParser = Yuna.parser(); // Here are the settings, but that will be explained below
}

client.setServices({
  handleCommand: YourHandleCommand,
});

declare module "seyfert" {
  interface UsingClient extends ParseClient<Client<true>> { lavalink: LavalinkManager }
  interface InternalOptions {
    withPrefix: true;
  }
}

client.start().then(() => client.uploadCommands());