import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import axios from 'axios'; // Import axios for HTTP requests

const handleRepoCommand = async (m, Matrix) => {
  const repoUrl = 'https://github.com/DeeCeeXxx/Queen_Anita-V3';
  try {
    const response = await axios.get(repoUrl);
    const repoData = response.data;

    const { full_name, name, forks_count, stargazers_count, created_at, updated_at, owner } = repoData;

    const messageText = `Hello *_${m.pushName}_,*\n *ǫᴜᴇᴇɴ ᴀɴɪᴛᴀ ᴠ3,* ᴀ sɪᴍᴘʟᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ᴍᴀᴅᴇ ʙʏ ᴅᴀᴠɪᴅ ᴄʏʀɪʟ.\n\n
    *❲❒❳ ɴᴀᴍᴇ:* ${name} \n
    *❲❒❳ sᴛᴀʀs:* ${stargazers_count} \n
    *❲❒❳ ғᴏʀᴋs:* ${forks_count} \n
    *❲❒❳ ᴄʀᴇᴀᴛᴇᴅ ᴏɴ:* ${new Date(created_at).toLocaleDateString()} \n
    *❲❒❳ ʟᴀsᴛ ᴜᴘᴅᴀᴛᴇᴅ:* ${new Date(updated_at).toLocaleDateString()} \n
    *❲❒❳ ᴏᴡɴᴇʀ:*ᴅᴀᴠɪᴅ ᴄʏʀɪʟ`;

    const repoMessage = generateWAMessageFromContent(m.from, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: messageText
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "*©𝟐𝟎𝟐𝟒 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯*"
            }),
            header: proto.Message.InteractiveMessage.Header.create({
             ...(await prepareWAMessageMedia({ image: { url: `https://telegra.ph/file/bf3a4cac5fc11b3199b56.jpg` } }, { upload: Matrix.waUploadToServer })),
              title: "",
              gifPlayback: true,
              subtitle: "",
              hasMediaAttachment: false 
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                    display_text: "ᴠɪᴇᴡ ᴍᴇɴᴜ",
                    id: ".menu"
                  })
                },
                {
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                    display_text: "ᴄᴏɴᴛᴀᴄᴛ ᴏᴡɴᴇʀ",
                    id: ".owner"
                  })
                },
                {
                  name: "cta_url",
                  buttonParamsJson: JSON.stringify({
                    display_text: "ᴠɪsɪᴛ & ғᴏʀᴋ ʀᴇᴘᴏ",
                    url: `https://github.com/DeeCeeXxx/Queen_Anita-V3fork`
                  })
                },
                {
                  name: "cta_url",
                  buttonParamsJson: JSON.stringify({
                    display_text: "ᴡʜᴀᴛsᴀᴘᴘ ᴄʜᴀɴɴᴇʟ",
                    url: `https://whatsapp.com/channel/0029VaeRru3ADTOEKPCPom0L`
                  })
                }
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

    await Matrix.relayMessage(repoMessage.key.remoteJid, repoMessage.message, {
      messageId: repoMessage.key.id
    });
    await m.React("✅");

  } catch (error) {
    console.error("Error processing your request:", error);
    m.reply('Error processing your request.');
    await m.React("❌");
  }
};

const searchRepo = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['repo', 'sc', 'script'];

  if (validCommands.includes(cmd)) {
    await handleRepoCommand(m, Matrix);
  }
};

export default searchRepo;
