import ytdl from 'ytdl-core';
import ytSearch from 'yt-search';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

const searchResultsMap = new Map();
let searchIndex = 1; 

const playcommand = async (m, Matrix) => {
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

  const validCommands = ['play', 'play', 'sing', 'sing2', 'audio', 'audio2'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      return m.reply(`Hello *_${m.pushName}_* Please provide a song tittle eg *.play Spectre by Alan Walker*`);
    }
    
    try {
      await m.React("💥");

 
      const searchResults = await ytSearch(text);
      const videos = searchResults.videos.slice(0, 5); 

      if (videos.length === 0) {
        m.reply('No results found.');
        await m.React("❌");
        return;
      }


      videos.forEach((video, index) => {
        const uniqueId = searchIndex + index;
        searchResultsMap.set(uniqueId, video);
      });


      const currentResult = searchResultsMap.get(searchIndex);
      const buttons = [
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "🎧 ᴀᴜᴅɪᴏ",
            id: `media_audio_${searchIndex}`
          })
        },
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "🎵 ᴀᴜᴅɪᴏ ᴅᴏᴄᴜᴍᴇɴᴛ",
            id: `media_audiodoc_${searchIndex}`
          })
        },
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "⏩ sᴇᴀʀᴄʜ ɴᴇxᴛ",
            id: `next_${searchIndex + 1}`
          })
        }
      ];

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐒𝐎𝐍𝐆 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑\n\n*ᴛɪᴛᴛʟᴇ:* ${currentResult.title}\n*ᴀʀᴛɪsᴛ:* ${currentResult.author.name}\n*ᴠɪᴇᴡs:* ${currentResult.views}\n*ᴅᴜʀᴀᴛɪᴏᴍ:* ${currentResult.timestamp}\n*User:* _${m.pushName}_\n`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                 ...(await prepareWAMessageMedia({ image: { url: `https://telegra.ph/file/bf3a4cac5fc11b3199b56.jpg` } }, { upload: Matrix.waUploadToServer })),
                title: "",
                gifPlayback: true,
                subtitle: "",
                hasMediaAttachment: false 
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons
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

      searchIndex += 1; 
    } catch (error) {
      console.error("Error processing your request:", error);
      m.reply('Error processing your request.');
      await m.React("❌");
    }
  } else if (selectedId) { 
    if (selectedId.startsWith('next_')) {
      const nextIndex = parseInt(selectedId.replace('next_', ''));
      const currentResult = searchResultsMap.get(nextIndex);

      if (!currentResult) {
        return m.reply('No more results.');
      }
      const buttons = [
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "🎧 ᴀᴜᴅɪᴏ",
            id: `media_audio_${nextIndex}`
          })
        },
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "🎵 ᴀᴜᴅɪᴏ ᴅᴏᴄᴜᴍᴇɴᴛ",
            id: `media_audiodoc_${nextIndex}`
          })
        },
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "⏩ sᴇᴀʀᴄʜ ɴᴇxᴛ",
            id: `next_${nextIndex + 1}`
          })
        }
      ];

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐒𝐎𝐍𝐆 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑\n\n*ᴛɪᴛᴛʟᴇ:* ${currentResult.title}\n*ᴀʀᴛɪsᴛ:* ${currentResult.author.name}\n*ᴠɪᴇᴡs:* ${currentResult.views}\n*ᴅᴜʀᴀᴛɪᴏɴ:* ${currentResult.timestamp}\n*User:* _${m.pushName}_\n`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                 ...(await prepareWAMessageMedia({ image: { url: `https://telegra.ph/file/bf3a4cac5fc11b3199b56.jpg` } }, { upload: Matrix.waUploadToServer })),
                title: "",
                gifPlayback: true,
                subtitle: "",
                hasMediaAttachment: false 
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons
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
    } else if (selectedId.startsWith('media_')) {
      const parts = selectedId.split('_');
      const type = parts[1];
      const key = parseInt(parts[2]);
      const selectedMedia = searchResultsMap.get(key);

      if (selectedMedia) {
        try {
          const videoUrl = selectedMedia.url;
          let finalMediaBuffer, mimeType, content;

          const stream = ytdl(videoUrl, { filter: type === 'audio' || type === 'audiodoc' ? 'audioonly' : 'video' });

          if (type === 'audio' || type === 'audiodoc') {
            finalMediaBuffer = await getStreamBuffer(stream);
            mimeType = 'audio/mp3';
          } else {
            finalMediaBuffer = await getStreamBuffer(stream);
            mimeType = 'video/mp4';
          }

          const fileSizeInMB = finalMediaBuffer.length / (1024 * 1024);

          if (type === 'audio' && fileSizeInMB <= 500) {
            content = { audio: finalMediaBuffer, mimetype: 'audio/mpeg', caption: '> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*' };
          } else if (type === 'video' && fileSizeInMB <= 500) {
            content = { video: finalMediaBuffer, mimetype: 'video/mp4', caption: '> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*' };
          } else if (type === 'audiodoc') {
            content = { document: finalMediaBuffer, mimetype: 'audio/mp3', fileName: `${selectedMedia.title}.mp3` };
          } else if (type === 'videodoc') {
            content = { document: finalMediaBuffer, mimetype: 'video/mp4', fileName: `${selectedMedia.title}.mp4`, caption: `*𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐞𝐝 𝐕𝐢𝐝𝐞𝐨:*\n ${selectedMedia.title}` };
          }

          await Matrix.sendMessage(m.from, content, { quoted: m });
        } catch (error) {
          console.error("Error processing your request:", error);
          m.reply('Error processing your request.');
          await m.React("❌");
        }
      }
    }
  }
};

const getStreamBuffer = async (stream) => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', err => reject(err));
  });
};

export default playcommand;
