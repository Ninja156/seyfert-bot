
import { Declare, Command, type CommandContext } from 'seyfert';

@Declare({
  name: 'stop',
  description: 'Stop the current playing music.'
})
export default class StopCommand extends Command {

  async run(ctx: CommandContext) {
    const { client, guildId } = ctx;
    if (!guildId) return;

    const player = client.lavalink.getPlayer(guildId);
    if (!player) return ctx.write({
      content: "There is no music playing."
    })
    await player.destroy(`${ctx.author.username} stopped the Player`);
    await ctx.write({
      content: "The music has been stopped."
    });
  }
}