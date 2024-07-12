import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import pkgg from 'nayan-media-downloader';
const { ndown } = pkgg;


const fbSearchResultsMap = new Map();
let fbSearchIndex = 1; 

const facebookCommand = async (m, Matrix) => {
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

  const validCommands = ['facebook', 'fb', 'fbdl'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      return m.reply('Please provide a Facebook video URL.');
    }

    try {
      await m.React("🕘");


      const fbData = await ndown(text);
      if (!fbData.status) {
        await m.reply('No results found.');
        await m.React("❌");
        return;
      }

      fbSearchResultsMap.set(fbSearchIndex, fbData);

      const sections = [{
        title: 'Video Qualities',
        rows: fbData.data.map((video, index) => ({
          header: '',
          title: `📥 ᴅᴏᴡɴʟᴏᴀᴅ ${video.resolution}`,
          description: '',
          id: `media_${index}_${fbSearchIndex}`
        }))
      }];

      const buttons = [{
        name: "single_select",
        buttonParamsJson: JSON.stringify({
          title: '♂️ sᴇʟᴇᴄᴛ ǫᴜᴀʟɪᴛʏ',
          sections: sections
        })
      }];

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐅𝐁 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑\n\n🔍 Select the desired video quality to download.\n\n📌 Choose an option to download.\n\n`
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

      fbSearchIndex += 1; 
    } catch (error) {
      console.error("Error processing your request:", error);
      await m.reply('Error processing your request.');
      await m.React("❌");
    }
  } else if (selectedId) { 
    if (selectedId.startsWith('media_')) {
      const parts = selectedId.split('_');
      const qualityIndex = parseInt(parts[1]);
      const key = parseInt(parts[2]);
      const selectedMedia = fbSearchResultsMap.get(key);

      if (selectedMedia) {
        try {
          const videoUrl = selectedMedia.data[qualityIndex].url;
          let finalMediaBuffer, mimeType, content;

          finalMediaBuffer = await getStreamBuffer(videoUrl);
          mimeType = 'video/mp4';

          const fileSizeInMB = finalMediaBuffer.length / (1024 * 1024);

          if (fileSizeInMB <= 300) {
            content = { video: finalMediaBuffer, mimetype: 'video/mp4', caption: '> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*' };
            await Matrix.sendMessage(m.from, content, { quoted: m });
          } else {
            await m.reply('The video file size exceeds 300MB.');
          }
        } catch (error) {
          console.error("Error processing your request:", error);
          await m.reply('Error processing your request.');
          await m.React("❌");
        }
      }
    }
  }
};

const getStreamBuffer = async (url) => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
};

export default facebookCommand;
