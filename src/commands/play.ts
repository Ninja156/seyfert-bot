import {
    Command,
    Declare,
    Options,
    type CommandContext,
    createStringOption
  } from "seyfert";
  import { MessageFlags } from "seyfert/lib/types";
  
  const options = {
    query: createStringOption({
      description: "Enter a song name or url.",
      required: true
    })
  };
  
  @Declare({
    name: "play",
    description: "Play music."
  })
  @Options(options)
  export default class PlayCommand extends Command {
    async run(ctx: CommandContext<typeof options>) {
      const { options, client, guildId, channelId, member, author } = ctx;
      const { query } = options;
  
      if (!guildId || !member) return;
  
      const voice = client.cache?.voiceStates?.get(member.id, guildId);
      if (!voice)
        return ctx.write({
          content: "You need to be in a voice channel to play music.",
          flags: MessageFlags.Ephemeral
        });
  
      const botVoice = client.cache?.voiceStates?.get(member.id, guildId);
      if (botVoice && (await botVoice).channelId !== (await voice).channelId)
        return ctx.write({
          content: "You need to be in the same voice channel as me.",
          flags: MessageFlags.Ephemeral
        });
  
        const player = await client.lavalink.createPlayer({
        guildId: guildId,
        textChannelId: channelId,
        voiceChannelId: voice.channelId!,
        volume: 100
      });

      if (!player.connected) await player.connect();

      const result = await player.search({ query, source: "ytsearch" }, { requester: { id: author.id },  });
      if (!result.tracks.length)
        return ctx.write({ content: "No results found!" });
      
      console.debug(result.loadType)

      if (result.loadType === "playlist") player.queue.add(result.tracks);
      else player.queue.add(result.tracks[0]);

      console.log(result.tracks[0])
      await player.play({ track: result.tracks[0]} );
      
      console.info(player.playing, player.paused) //bruh
      return ctx.write({
        content:
          result.loadType === "playlist"
            ? `Queued ${result.tracks.length} from ${result.playlist?.title}`
            : `Queued ${result.tracks[0].info.title}`
      });
    }
    
  }