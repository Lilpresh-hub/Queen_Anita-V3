import ytdl from 'ytdl-core'
import yts from 'yt-search'


const startTime = new Date();
const song = async (m, Matrix) => {
const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  
  const validCommands = ['test'];

   if (validCommands.includes(cmd)) {
  
   try {
    await m.React("🕘");

    // Check if the input is a valid YouTube URL
   const text = `AlanWalker-OnMyWay(Clean-Lyrics)ft.SabrinaCarpenter&Farruko`;
   const isUrl = ytdl.validateURL(text);

    if (isUrl) {
      // If it's a URL, directly use ytdl-core
      const audioStream = ytdl(text, { filter: 'audioonly', quality: 'highestaudio' });
      const audioBuffer = [];

      audioStream.on('data', (chunk) => {
        audioBuffer.push(chunk);
      });

      audioStream.on('end', async () => {
        try {
          const finalAudioBuffer = Buffer.concat(audioBuffer);

          const videoInfo = await yts({ videoId: ytdl.getURLVideoID(text) });
          const thumbnailMessage = {
  image: {
    url: `https://telegra.ph/file/ff599473b88fd6005d4af.jpg`,
  },
  caption: `
*•═❮ ✨𝐆𝐈𝐅𝐓𝐄𝐃 𝐈𝐒 𝐓𝐄𝐒𝐓𝐈𝐍𝐆...✨ ❯═•*

 *𝑻𝒆𝒔𝒕𝒊𝒏𝒈 𝑺𝒑𝒆𝒆𝒅: ${new Date() - startTime} 𝒎𝒔*
 *ʟᴏᴀᴅɪɴɢ ᴛᴇsᴛ👇👇...*
`, 
};
          await Matrix.sendMessage(m.from, thumbnailMessage, { quoted: m });
          await Matrix.sendMessage(m.from, { audio: finalAudioBuffer, mimetype: 'audio/mpeg' }, { quoted: m });
          await m.React("✅");
        } catch (err) {
          console.error('Error sending audio:', err);
          m.reply('Error sending audio.');
          await m.React("❌");
        }
      });
    } else {
      // If it's a search query, use yt-search
      const searchResult = await yts(text);
      const firstVideo = searchResult.videos[0];

      if (!firstVideo) {
        m.reply('Audio not found.');
        await m.React("❌");
        return;
      }

      const audioStream = ytdl(firstVideo.url, { filter: 'audioonly', quality: 'highestaudio' });
      const audioBuffer = [];

      audioStream.on('data', (chunk) => {
        audioBuffer.push(chunk);
      });

      audioStream.on('end', async () => {
        try {
          const finalAudioBuffer = Buffer.concat(audioBuffer);
          const thumbnailMsg = {
  image: {
    url: `https://telegra.ph/file/ff599473b88fd6005d4af.jpg`,
  },
  caption: `
*•═❮ ✨𝐆𝐈𝐅𝐓𝐄𝐃 𝐈𝐒 𝐓𝐄𝐒𝐓𝐈𝐍𝐆...✨ ❯═•*

 *𝑻𝒆𝒔𝒕𝒊𝒏𝒈 𝑺𝒑𝒆𝒆𝒅: ${new Date() - startTime} 𝒎𝒔*
 *ʟᴏᴀᴅɪɴɢ ᴛᴇsᴛ👇👇...*
`, 
};
          await Matrix.sendMessage(m.from, thumbnailMsg, { quoted: m });
          //await Matrix.sendMessage(m.from, doc, { quoted: m })
        let doc = {
        audio: finalAudioBuffer,
        mimetype: 'audio/mpeg',
        ptt: true,
        waveform:  [100, 0, 100, 0, 100, 0, 100],
        fileName: "Gifted.mp3",

        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            title: "𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐕𝟓 𝐈𝐒 𝐀𝐂𝐓𝐈𝐕𝐄",
            body: `💜ᴍᴀᴅᴇ ʙʏ ɢɪғᴛᴇᴅ ᴛᴇᴄʜ💜`,
            thumbnailUrl: `https://telegra.ph/file/ff599473b88fd6005d4af.jpg`,
            sourceUrl: `https://whatsapp.com/channel/0029VaYauR9ISTkHTj4xvi1l`,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
    };

    await Matrix.sendMessage(m.from, doc, { quoted: m });
          await m.React("✅");
        } catch (err) {
          console.error('Error sending audio:', err);
          m.reply('Error sending audio.');
          await m.React("❌");
        }
      });
    }
} catch (error) {
        console.error("Error generating response:", error);
    }
}
}

export default song;
