import { createEvent } from "seyfert";

createEvent({
    data: { name: "raw" },
    run: (data, client) => 
      client.lavalink.sendRawData(data as any)
  });