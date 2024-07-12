import yts from 'yt-search';
import ytdl from 'ytdl-core';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

const videoMap = new Map();
let videoIndex = 1; 
let audioIndex = 1001;

const song = async (m, Matrix) => {
  let selectedListId;
  const selectedButtonId = m?.message?.templateButtonReplyMessage?.selectedId;
  const interactiveResponseMessage = m?.message?.interactiveResponseMessage;

  if (interactiveResponseMessage) {
    const paramsJson = interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson;
    if (paramsJson) {
      const params = JSON.parse(paramsJson);
      selectedListId = params.id;
    }
  }

  const selectedId = selectedListId || selectedButtonId;

  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  
  const validCommands = ['yts', 'ytsearch'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a YouTube URL or search query');

    try {
      await m.React("🕘");

      // Search YouTube for the provided query
      const searchResult = await yts(text);
      const topVideos = searchResult.videos.slice(0, 10);

      if (topVideos.length === 0) {
        m.reply('No results found.');
        await m.React("❌");
        return;
      }

      const videoButtons = topVideos.map((video, index) => {
        const uniqueId = videoIndex + index;
        videoMap.set(uniqueId, { ...video, isAudio: false });
        return {
          "header": "",
          "title": video.title,
          "description": ``,
          "id": `🎦video_${uniqueId}` 
        };
      });

      const audioButtons = topVideos.map((video, index) => {
        const uniqueId = audioIndex + index;
        videoMap.set(uniqueId, { ...video, isAudio: true });
        return {
          "header": "",
          "title": video.title,
          "description": ``,
          "id": `🎵audio_${uniqueId}`
        };
      });

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑\n\n`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image: { url: `https://telegra.ph/file/bf3a4cac5fc11b3199b56.jpg` } }, { upload: Matrix.waUploadToServer })),
                title: ``,
                gifPlayback: true,
                subtitle: "",
                hasMediaAttachment: false 
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [
                  {
                    name: "single_select",
                    buttonParamsJson: JSON.stringify({
                      title: "🔖 sᴇʟᴇᴄᴛ ᴀ ᴠɪᴅᴇᴏ",
                      sections: [
                        {
                          title: "😎 Top 10 YouTube Results - Videos",
                          highlight_label: "🤩 Top 10",
                          rows: videoButtons
                        },
                      ]
                    })
                  },
                  {
                    name: "single_select",
                    buttonParamsJson: JSON.stringify({
                      title: "🎧 sᴇʟᴇᴄᴛ ᴀɴ ᴀᴜᴅɪᴏ",
                      sections: [
                        {
                          title: "🎶 Top 10 YouTube Results - Audios",
                          highlight_label: "🤩 Top 10",
                          rows: audioButtons
                        },
                      ]
                    })
                  },
                ],
              }),
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: false,
              }
            }),
          },
        },
      }, {});

      await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      });
      await m.React("✅");

 
      videoIndex += topVideos.length;
      audioIndex += topVideos.length;
    } catch (error) {
      console.error("Error processing your request:", error);
      m.reply('Error processing your request.');
      await m.React("❌");
    }
  } else if (selectedId) { 
    const isAudio = selectedId.startsWith('🎵audio_');
    const key = parseInt(selectedId.replace(isAudio ? '🎵audio_' : '🎦video_', ''));
    const selectedVideo = videoMap.get(key);

    if (selectedVideo) {
      try {
        const videoInfo = await ytdl.getBasicInfo(selectedVideo.videoId);
        const title = videoInfo.videoDetails.title;
        const author = videoInfo.videoDetails.author.name;
        const duration = videoInfo.videoDetails.lengthSeconds;
        const uploadDate = videoInfo.videoDetails.uploadDate;
        const videoUrl = `https://www.youtube.com/watch?v=${selectedVideo.videoId}`;
        const thumbnailUrl = selectedVideo.thumbnail; 

        if (selectedVideo.isAudio) {
 
          const audioStream = ytdl(videoUrl, { filter: 'audioonly', quality: 'highestaudio' });
          const finalAudioBuffer = await streamToBuffer(audioStream);
          
          await Matrix.sendMessage(m.from, { image: { url: thumbnailUrl }, caption: `Title: ${title}\nAuthor: ${author}\nDuration: ${duration}\n> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*`}, { quoted: m });

          await Matrix.sendMessage(m.from, { audio: finalAudioBuffer, mimetype: 'audio/mpeg' }, { quoted: m });
        } else {
 
          const videoStream = ytdl(videoUrl, { filter: 'audioandvideo', quality: 'highest' });
          const finalVideoBuffer = await streamToBuffer(videoStream);

          await Matrix.sendMessage(m.from, { video: finalVideoBuffer, mimetype: 'video/mp4', caption: `Title: ${title}\nAuthor: ${author}\nDuration: ${duration}\n\n> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*` }, { quoted: m });
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
        
      }
    } else {
      
    }
  }
};

const streamToBuffer = async (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
};

export default song;
