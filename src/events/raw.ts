import { createEvent } from "seyfert";

export default createEvent({
  data: { name: "raw" },
  run: (data, client) => client.lavalink.sendRawData(data as any),
});