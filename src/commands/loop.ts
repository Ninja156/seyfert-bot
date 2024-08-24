import { Declare, Command, type CommandContext, Options, createStringOption } from 'seyfert';

const options = {
    mode: createStringOption({
        description: "Select the loop mode.",
        required: true,
        choices: [
            {
                name: "Off",
                value: "off",
            },
            {
                name: "Track",
                value: "track",
            },
            {
                name: "Queue",
                value: "queue",
            },
        ],
    }),
};
@Options(options)
@Declare({
  name: 'loop',
  description: 'Loop the current playing music.'
})
export default class LoopCommand extends Command {

  async run(ctx: CommandContext<typeof options>) {
    const { client, options, guildId } = ctx;
    if (!guildId) return;
    const player = client.lavalink.getPlayer(guildId);
    if (!player) return;
    player.setRepeatMode(options.mode as "off" | "track" | "queue");
    await ctx.write({
      content: `Loop mode set to ${options.mode}`
    });
  }
}