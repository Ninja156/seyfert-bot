import { Declare, Command, type CommandContext, createIntegerOption, Options } from 'seyfert';

const options = {
  volume: createIntegerOption({
    description: "Enter the volume.",
    required: true,
    min_value: 0,
    max_value: 100,
  }),
};

@Declare({
  name: 'volume',
  description: 'Set the volume of the current playing music.'
})
@Options(options)
export default class VolumeCommand extends Command {
  async run(ctx: CommandContext<typeof options>) {
    const { client, guildId } = ctx;
    const { volume } = ctx.options;

    if (!guildId) return;

    const player = client.lavalink.getPlayer(guildId);
    if (!player) return;
    
    await player.setVolume(volume);
    await ctx.write({
      content: `Changed the volume to ${volume}`
    });
  }
}