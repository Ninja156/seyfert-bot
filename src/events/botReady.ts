import { createEvent } from "seyfert";
import { ActivityType, PresenceUpdateStatus } from "seyfert/lib/types";
export default createEvent({
  data: { once: true, name: "botReady" },
  run(user, client) {
    client.logger.info(`${user.username} is ready`);
    client.lavalink.init({ id: user.id }); 
    client.gateway.setPresence({
      since: null,
      status: PresenceUpdateStatus.Idle,
      afk: false,
      activities: [
        {
          name: `Music`,
          type: ActivityType.Listening,
          state: null,
        }
      ]
    })
  }
})