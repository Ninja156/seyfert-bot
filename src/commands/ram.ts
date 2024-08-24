import { Declare, Command, type CommandContext } from 'seyfert';

@Declare({
  name: 'ram',
  description: 'Show the ram usage of the me'
})
export default class RamCommand extends Command {

  async run(ctx: CommandContext) {
    // average latency between shards
    const ram = (process.memoryUsage().rss / 1024 / 1024).toFixed(2)

    await ctx.write({
      content: `My ram usage is ${ram} MB`
    });
  }
}