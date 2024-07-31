import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

// Get total memory and free memory in bytes
const totalMemoryBytes = os.totalmem();
const freeMemoryBytes = os.freemem();

// Define unit conversions
const byteToKB = 1 / 1024;
const byteToMB = byteToKB / 1024;
const byteToGB = byteToMB / 1024;

// Function to format bytes to a human-readable format
function formatBytes(bytes) {
  if (bytes >= Math.pow(1024, 3)) {
    return (bytes * byteToGB).toFixed(2) + ' GB';
  } else if (bytes >= Math.pow(1024, 2)) {
    return (bytes * byteToMB).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes * byteToKB).toFixed(2) + ' KB';
  } else {
    return bytes.toFixed(2) + ' bytes';
  }
}

// Bot Process Time
const uptime = process.uptime();
const day = Math.floor(uptime / (24 * 3600)); // Calculate days
const hours = Math.floor((uptime % (24 * 3600)) / 3600); // Calculate hours
const minutes = Math.floor((uptime % 3600) / 60); // Calculate minutes
const seconds = Math.floor(uptime % 60); // Calculate seconds

// Uptime
const uptimeMessage = `*I am alive since ${day}d ${hours}h ${minutes}m ${seconds}s*`;
const runMessage = `*☀️ ${day} Day*\n*🕐 ${hours} Hour*\n*⏰ ${minutes} Minutes*\n*⏱️ ${seconds} Seconds*\n`;

const xtime = moment.tz("Africa/Lagos").format("HH:mm:ss");
const xdate = moment.tz("Africa/Lagos").format("DD/MM/YYYY");
const time2 = moment().tz("Africa/Lagos").format("HH:mm:ss");
let pushwish = "";

if (time2 < "04:00:00") {
  pushwish = `𝐆𝐨𝐨𝐝 𝐌𝐨𝐫𝐧𝐢𝐧𝐠 🌄`;
} else if (time2 < "11:00:00") {
  pushwish = `𝐆𝐨𝐨𝐝 𝐌𝐨𝐫𝐧𝐢𝐧𝐠 🌄`;
} else if (time2 < "15:00:00") {
  pushwish = `𝐆𝐨𝐨𝐝 𝐀𝐟𝐭𝐞𝐫𝐧𝐨𝐨𝐧 🌅`;
} else if (time2 < "18:00:00") {
  pushwish = `𝐆𝐨𝐨𝐝 𝐄𝐯𝐞𝐧𝐢𝐧𝐠 🌃`;
} else if (time2 < "19:00:00") {
  pushwish = `𝐆𝐨𝐨𝐝 𝐄𝐯𝐞𝐧𝐢𝐧𝐠 🌃`;
} else {
  pushwish = `𝐆𝐨𝐨𝐝 𝐍𝐢𝐠𝐡𝐭 🌌`;
}

const test = async (m, Matrix) => {
  let selectedListId;
  const selectedButtonId = m?.message?.templateButtonReplyMessage?.selectedId;
  const interactiveResponseMessage = m?.message?.interactiveResponseMessage;
  if (interactiveResponseMessage) {
    const paramsJson = interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson;
    if (paramsJson) {
      const params = JSON.parse(paramsJson);
      selectedListId = params.id;
     // console.log(selectedListId);
    }
  }
  const selectedId = selectedListId || selectedButtonId;
  
  const prefix = /^[\\/!#.]/gi.test(m.body) ? m.body.match(/^[\\/!#.]/gi)[0] : '.';
        const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';
        const mode = process.env.MODE;
        const validCommands = ['menu', 'menus', 'listmenu', 'allmenu', 'botmenu', 'help', 'list'];

  if (validCommands.includes(cmd)) {
    let msg = generateWAMessageFromContent(m.from, {
      viewOnceMessage: {
        message: {
          "messageContextInfo": {
            "deviceListMetadata": {},
            "deviceListMetadataVersion": 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _3.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "> *©𝟐𝟎𝟐𝟒 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯* \n> *ᴍᴀᴅᴇ ʙʏ ᴅᴀᴠɪᴅ ᴄʏʀɪʟ*"
            }),
            header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image : fs.readFileSync('./gifted/img/gifted.jpg')}, { upload: Matrix.waUploadToServer})), 
                  title: ``,
                  gifPlayback: true,
                  subtitle: "",
                  hasMediaAttachment: false  
                }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                 {
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                    display_text: "𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑",
                    id: ".owner"
                  })
                },
                {
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                    display_text: "𝐁𝐎𝐓 𝐒𝐂𝐑𝐈𝐏𝐓",
                    id: ".repo"
                  })
                },
                {
                  name: "cta_url",
                  buttonParamsJson: JSON.stringify({
                    display_text: "𝐁𝐎𝐓 𝐂𝐇𝐀𝐍𝐍𝐄𝐋",
                    url: `https://whatsapp.com/channel/0029VaeRru3ADTOEKPCPom0L`
                  })
                },
                {
                  "name": "single_select",
                  "buttonParamsJson": `{"title":"🕳 𝐎𝐏𝐄𝐍 𝐁𝐎𝐓 𝐌𝐄𝐍𝐔 🕳",
                 "sections":
                   [{
                    "title":"🛸 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯𝐀𝐋𝐋 𝐌𝐄𝐍𝐔𝐒 𝐋𝐈𝐒𝐓 🛸",
                    "highlight_label":"💿 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯💿",
                    "rows":[
                      {
                       "header":"",
                       "title":"𝐀𝐋𝐋 𝐌𝐄𝐍𝐔",
                       "description":"sʜᴏᴡ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ ᴀʟʟ ᴍᴇɴᴜ",
                       "id":"All Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ᴍᴇɴᴜ ᴄᴍᴅs",
                        "id":"Downloader Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ ɢʀᴏᴜᴘ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Group Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐓𝐎𝐎𝐋 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ ᴛᴏᴏʟ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Tools Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐆𝐄𝐍𝐄𝐑𝐀𝐋 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ ɢᴇɴᴇʀᴀʟ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"General Menu"
                      },
                     {
                        "header":"",
                        "title":"𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ ᴀᴡᴇsᴏᴍᴇ ᴏᴡɴᴇʀ ᴍᴇɴᴜ ᴄᴍᴅs",
                        "id":"Owner Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐀𝐈 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ ᴀɪ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Ai Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐒𝐄𝐀𝐑𝐂𝐇 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ sᴇᴀʀᴄʜ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Search Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐋𝐎𝐆𝐎 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ ʟᴏɢᴏ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Logo Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐒𝐓𝐀𝐋𝐊𝐄𝐑 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ sᴛᴀʟᴋᴇʀ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Stalker Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐑𝐄𝐀𝐂𝐓𝐈𝐎𝐍𝐒 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ ʀᴇᴀᴄᴛɪᴏɴs ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Reactions Menu"
                      },
                      {
                        "header":"",
                        "title":"𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐄𝐑 𝐌𝐄𝐍𝐔",
                        "description":"sʜᴏᴡ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ ᴄᴏɴᴠᴇʀᴛᴇʀ ᴍᴇɴᴜ ᴄᴏᴍᴍᴀɴᴅs",
                        "id":"Converter Menu"
                      }
                    ]}
                  ]}`
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
  }
      if (selectedId == "All Menu") {
        const mode = process.env.MODE;
        const str = `
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐀𝐋𝐋 𝐌𝐄𝐍𝐔*
${readmore}
╭━❍ *ᴅᴏᴡɴʟᴏᴀᴅᴇʀ* ❍⊷
┃◇ ${prefix}ᴀᴘᴋ
┃◇ ${prefix}ᴀᴘᴘ
┃◇ ${prefix}ғʙ
┃◇ ${prefix}ᴀᴜᴛᴏᴅʟ
┃◇ ${prefix}ғʙᴅʟ
┃◇ ${prefix}ғᴀᴄᴇʙᴏᴏᴋ
┃◇ ${prefix}ᴍᴇᴅɪᴀғɪʀᴇ
┃◇ ${prefix}ᴍғɪʀᴇᴅʟ
┃◇ ${prefix}ᴍғɪʀᴇ
┃◇ ${prefix}ᴘɪɴᴛ
┃◇ ${prefix}ᴘɪɴᴛᴅʟ
┃◇ ${prefix}ᴘɪɴᴛᴇʀᴇsᴛ
┃◇ ${prefix}ɢɪᴛᴄʟᴏɴᴇ
┃◇ ${prefix}ɢᴅʀɪᴠᴇ
┃◇ ${prefix}ɪɴsᴛᴀ
┃◇ ${prefix}ɪɢᴅʟ
┃◇ ${prefix}ɪɴsᴛᴀᴅʟ
┃◇ ${prefix}ɪɢ
┃◇ ${prefix}ʏᴛᴍᴘ3
┃◇ ${prefix}ʏᴛᴍᴘ4
┃◇ ${prefix}ᴘʟᴀʏ
┃◇ ${prefix}ᴘʟᴀʏ2
┃◇ ${prefix}sᴏɴɢ
┃◇ ${prefix}ꜱɪɴɢ
┃◇ ${prefix}ᴠɪᴅᴇᴏ
┃◇ ${prefix}ᴠɪᴅᴇᴏ2
┃◇ ${prefix}ʏᴛᴍᴘ3ᴅᴏᴄ
┃◇ ${prefix}ʏᴛᴍᴘ4ᴅᴏᴄ
┃◇ ${prefix}ᴛɪᴋᴛᴏᴋ
┃◇ ${prefix}ᴛɪᴋᴛᴏᴋᴅʟ
┃◇ ${prefix}ᴛɪᴋᴅʟ
╰━━━━━━━━━━━━━━━⊷

╭━❍ *ᴄᴏɴᴠᴇʀᴛᴇʀ* ❍⊷
┃◇ ${prefix}ᴀᴛᴛᴘ
┃◇ ${prefix}ᴀᴛᴛᴘ2
┃◇ ${prefix}ᴀᴛᴛᴘ3
┃◇ ${prefix}ᴇɴᴄᴏᴅᴇ
┃◇ ${prefix}ᴇʙɪɴᴀʀʏ
┃◇ ${prefix}ᴅᴇᴄᴏᴅᴇ
┃◇ ${prefix}ᴅᴇʙɪɴᴀʀʏ
┃◇ ${prefix}ᴇᴍᴏᴊɪᴍɪx
┃◇ ${prefix}ᴍᴘ3
┃◇ ${prefix}ᴛᴏᴍᴘ3
╰━━━━━━━━━━━━━━━⊷
╭━❍ *ᴀɪ* ❍⊷
┃◇ ${prefix}ᴀɪ
┃◇ ${prefix}ʙᴜɢ
┃◇ ${prefix}ʀᴇᴘᴏʀᴛ
┃◇ ${prefix}ɢᴘᴛ
┃◇ ${prefix}ɢᴘᴛ4
┃◇ ${prefix}ᴛᴇxᴛᴅᴇᴛᴇᴄᴛ
┃◇ ${prefix}ᴀɪᴅᴇᴛᴇᴄᴛ
┃◇ ${prefix}ʙʟᴀᴄᴋʙᴏx
┃◇ ${prefix}ᴅᴀʟʟᴇ
┃◇ ${prefix}ʀᴇᴍɪɴɪ
┃◇ ${prefix}ɢᴇᴍɪɴɪ
╰━━━━━━━━━━━━━━━⊷

╭━❍ *ɢʀᴏᴜᴘ* ❍⊷
┃◇ ${prefix}ɪɴᴠɪᴛᴇ
┃◇ ${prefix}ʟɪɴᴋɢᴄ
┃◇ ${prefix}sᴇᴛᴘᴘɢᴄ
┃◇ ${prefix}sᴇᴛɴᴀᴍᴇ
┃◇ ${prefix}sᴇᴛᴅᴇsᴄ
┃◇ ${prefix}ɢʀᴏᴜᴘ
┃◇ ${prefix}ᴡᴇʟᴄᴏᴍᴇ
┃◇ ${prefix}ᴀᴅᴅ
┃◇ ${prefix}ᴋɪᴄᴋ
┃◇ ${prefix}ʜɪᴅᴇᴛᴀɢ
┃◇ ${prefix}ᴛᴀɢᴀʟʟ
┃◇ ${prefix}ᴀɴᴛɪʟɪɴᴋ
┃◇ ${prefix}ᴀɴᴛɪᴛᴏxɪᴄ
┃◇ ${prefix}ᴘʀᴏᴍᴋᴛᴇ
┃◇ ${prefix}ᴅᴇᴍᴏᴛᴇ
┃◇ ${prefix}ɢᴇᴛʙɪᴏ
╰━━━━━━━━━━━━━━━⊷
${readmore}
╭━❍ *ᴛᴏᴏʟs* ❍⊷
┃◇ ${prefix}ᴄᴀʟᴄ
┃◇ ${prefix}ᴛᴇᴍᴘᴍᴀɪʟ
┃◇ ${prefix}ᴄʜᴇᴄᴋᴍᴀɪʟ
┃◇ ${prefix}ɪɴғᴏ
┃◇ ${prefix}ᴛʀᴛ
┃◇ ${prefix}ᴛᴛs
╰━━━━━━━━━━━━━━━⊷

╭━❍ *sᴇᴀʀᴄʜ* ❍⊷
┃◇ ${prefix}ᴘʟᴀʏ
┃◇ ${prefix}sᴏɴɢ
┃◇ ${prefix}ʏᴛs
┃◇ ${prefix}ɪᴍᴅʙ
┃◇ ${prefix}ᴍᴏᴠɪᴇ
┃◇ ${prefix}ɪᴍᴀɢᴇ
┃◇ ${prefix}ɢᴏᴏɢʟᴇ
┃◇ ${prefix}ɪᴍɢ
┃◇ ${prefix}ᴘɪɴᴛ
┃◇ ${prefix}ᴘɪɴᴛᴇʀᴇsᴛ
┃◇ ${prefix}ᴡᴀʟʟᴘᴀᴘᴇʀ
┃◇ ${prefix}ᴡɪᴋɪᴍᴇᴅɪᴀ
┃◇ ${prefix}ʏᴛs
┃◇ ${prefix}ʀɪɴɢᴛᴏɴᴇ
┃◇ ${prefix}ʟʏʀɪᴄs
╰━━━━━━━━━━━━━━━⊷

╭━❍ *ɢᴇɴᴇʀᴀʟ* ❍⊷
┃◇ ${prefix}ᴘɪɴɢ
┃◇ ${prefix}ᴛᴇsᴛ
┃◇ ${prefix}ᴀʟɪᴠᴇ
┃◇ ${prefix}ᴏᴡɴᴇʀ
┃◇ ${prefix}ʀᴇᴘᴏ
┃◇ ${prefix}ᴍᴇɴᴜ
┃◇ ${prefix}ᴛQᴜᴏᴛᴇᴅ
┃◇ ${prefix}ɪɴғᴏʙᴏᴛ
┃◇ ${prefix}ᴀᴜᴛᴏᴅʟ
┃◇ ${prefix}ɢᴇᴛᴘᴘ
╰━━━━━━━━━━━━━━━⊷

╭━❍ *ᴏᴡɴᴇʀ* ❍⊷
┃◇ ${prefix}ᴊᴏɪɴ
┃◇ ${prefix}sᴇᴛᴘᴘʙᴏᴛ
┃◇ ${prefix}ғᴜʟʟᴘᴘ
┃◇ ${prefix}ʟᴇᴀᴠᴇ
┃◇ ${prefix}ʙʟᴏᴄᴋ
┃◇ ${prefix}ᴜɴʙʟᴏᴄᴋ
┃◇ ${prefix}ʙᴄɢʀᴏᴜᴘ
┃◇ ${prefix}ʙᴄᴀʟʟ
┃◇ ${prefix}sᴇᴛᴘᴘ
┃◇ ${prefix}ᴀɴᴛɪᴄᴀʟʟ
┃◇ ${prefix}sᴇᴛsᴛᴀᴛᴜs
┃◇ ${prefix}sᴇᴛɴᴀᴍᴇʙᴏᴛ
┃◇ ${prefix}ᴀᴜᴛᴏᴛʏᴘɪɴɢ
┃◇ ${prefix}ᴏɴʟɪɴᴇ
┃◇ ${prefix}ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ
┃◇ ${prefix}ᴀᴜᴛᴏʀᴇᴀᴅ
┃◇ ${prefix}ᴀᴜᴛᴏsᴠɪᴇᴡ
╰━━━━━━━━━━━━━━━⊷

╭━❍ *ʀᴇᴀᴄᴛɪᴏɴs* ❍⊷
┃◇ .ᴄʀʏ
┃◇ .ᴡɪɴᴋ
┃◇ .ᴋɪss
┃◇ .ᴘᴏᴋᴇ
┃◇ .ᴋɪᴄᴋ
┃◇ .sʟᴀᴘ
┃◇ .ʜᴜɢ
┃◇ .sᴍɪʟᴇ
┃◇ .ᴘᴀᴛ
┃◇ .ᴡᴀᴠᴇ
┃◇ .ʟɪᴄᴋ
┃◇ .ᴀᴡᴏᴏ
┃◇ .ʙɪᴛᴇ
┃◇ .ʏᴇᴇᴛ
┃◇ .ʙʟᴜsʜ
┃◇ .ʙᴜʟʟʏ
┃◇ .sᴍᴜɢ
┃◇ .ʙᴏɴᴋ
┃◇ .ᴅᴀɴᴄᴇ
┃◇ .ʜᴀᴘᴘʏ
┃◇ .sᴀᴅ
┃◇ .ᴄʀʏɴɢᴇ
┃◇ .ᴄᴜᴅᴅʟᴇ
┃◇ .sʜɪɴᴏʙᴜ
┃◇ .ʜᴀɴᴅʜᴏʟᴅ
┃◇ .ɢʟᴏᴍᴘ
┃◇ .ʜɪɢʜғɪᴠᴇ
╰━━━━━━━━━━━━━━━⊷

╭━❍ *sᴛᴀʟᴋᴇʀ* ❍⊷
┃◇ ${prefix}ᴛʀᴜᴇᴄᴀʟʟᴇʀ
┃◇ ${prefix}ɪɢsᴛᴀʟᴋ
┃◇ ${prefix}ɪɴsᴛᴀsᴛᴀʟᴋ
┃◇ ${prefix}ɢɪᴛsᴛᴀʟᴋ
┃◇ ${prefix}ɢɪᴛʜᴜʙ
┃◇ ${prefix}ɢɪᴛʜᴜʙsᴛᴀʟᴋ
╰━━━━━━━━━━━━━━━⊷

╭━❍ *ʟᴏɢᴏ* ❍⊷
┃◇ ᴄᴏᴍɪɴɢ sᴏᴏɴ, sᴛᴀʏ ᴘᴜᴛ!
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯*
> *ᴍᴀᴅᴇ ʙʏ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_*
   `;
        let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: fgg
});
}
   if ( selectedId == "Downloader Menu") {
     const str = `
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ᴀᴘᴋ
┃◇ ${prefix}ᴀᴘᴘ
┃◇ ${prefix}ғʙ
┃◇ ${prefix}ᴀᴜᴛᴏᴅʟ
┃◇ ${prefix}ғʙᴅʟ
┃◇ ${prefix}ғᴀᴄᴇʙᴏᴏᴋ
┃◇ ${prefix}ᴍᴇᴅɪᴀғɪʀᴇ
┃◇ ${prefix}ᴍғɪʀᴇᴅʟ
┃◇ ${prefix}ᴍғɪʀᴇ
┃◇ ${prefix}ᴘɪɴᴛ
┃◇ ${prefix}ᴘɪɴᴛᴅʟ
┃◇ ${prefix}ᴘɪɴᴛᴇʀᴇsᴛ
┃◇ ${prefix}ɢɪᴛᴄʟᴏɴᴇ
┃◇ ${prefix}ɢᴅʀɪᴠᴇ
┃◇ ${prefix}ɪɴsᴛᴀ
┃◇ ${prefix}ɪɢᴅʟ
┃◇ ${prefix}ɪɴsᴛᴀᴅʟ
┃◇ ${prefix}ɪɢ
┃◇ ${prefix}ʏᴛᴍᴘ3
┃◇ ${prefix}ʏᴛᴍᴘ4
┃◇ ${prefix}ᴘʟᴀʏ
┃◇ ${prefix}ᴘʟᴀʏ2
┃◇ ${prefix}sᴏɴɢ
┃◇ ${prefix}ꜱɪɴɢ
┃◇ ${prefix}ᴠɪᴅᴇᴏ
┃◇ ${prefix}ᴠɪᴅᴇᴏ2
┃◇ ${prefix}ʏᴛᴍᴘ3ᴅᴏᴄ
┃◇ ${prefix}ʏᴛᴍᴘ4ᴅᴏᴄ
┃◇ ${prefix}ᴛɪᴋᴛᴏᴋ
┃◇ ${prefix}ᴛɪᴋᴛᴏᴋᴅʟ
┃◇ ${prefix}ᴛɪᴋᴅʟ
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯*
> *ᴍᴀᴅᴇ ʙʏ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: fgg
});
   }
   
   if ( selectedId == "Group Menu") {
     const str = `
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ɪɴᴠɪᴛᴇ
┃◇ ${prefix}ʟɪɴᴋɢᴄ
┃◇ ${prefix}sᴇᴛᴘᴘɢᴄ
┃◇ ${prefix}sᴇᴛɴᴀᴍᴇ
┃◇ ${prefix}sᴇᴛᴅᴇsᴄ
┃◇ ${prefix}ɢʀᴏᴜᴘ
┃◇ ${prefix}ᴡᴇʟᴄᴏᴍᴇ
┃◇ ${prefix}ᴀᴅᴅ
┃◇ ${prefix}ᴋɪᴄᴋ
┃◇ ${prefix}ʜɪᴅᴇᴛᴀɢ
┃◇ ${prefix}ᴛᴀɢᴀʟʟ
┃◇ ${prefix}ᴀɴᴛɪʟɪɴᴋ
┃◇ ${prefix}ᴀɴᴛɪᴛᴏxɪᴄ
┃◇ ${prefix}ᴘʀᴏᴍᴋᴛᴇ
┃◇ ${prefix}ᴅᴇᴍᴏᴛᴇ
┃◇ ${prefix}ɢᴇᴛʙɪᴏ
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯*
> *ᴍᴀᴅᴇ ʙʏ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: fgg
});
   }
   
   if (selectedId == "General Menu") {
     const str =`
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐆𝐄𝐍𝐄𝐑𝐀𝐋 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ᴘɪɴɢ
┃◇ ${prefix}ᴛᴇsᴛ
┃◇ ${prefix}ᴀʟɪᴠᴇ
┃◇ ${prefix}ᴏᴡɴᴇʀ
┃◇ ${prefix}ʀᴇᴘᴏ
┃◇ ${prefix}ᴍᴇɴᴜ
┃◇ ${prefix}ɪɴғᴏʙᴏᴛ
┃◇ ${prefix}ᴀᴜᴛᴏᴅʟ
┃◇ ${prefix}ɢᴇᴛᴘᴘ
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯*
> *ᴍᴀᴅᴇ ʙʏ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: fgg
});
   }
   
   if (selectedId == "Owner Menu") {
     const str = `
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ᴊᴏɪɴ
┃◇ ${prefix}sᴇᴛᴘᴘʙᴏᴛ
┃◇ ${prefix}ғᴜʟʟᴘᴘ
┃◇ ${prefix}ʟᴇᴀᴠᴇ
┃◇ ${prefix}ʙʟᴏᴄᴋ
┃◇ ${prefix}ᴜɴʙʟᴏᴄᴋ
┃◇ ${prefix}ʙᴄɢʀᴏᴜᴘ
┃◇ ${prefix}ʙᴄᴀʟʟ
┃◇ ${prefix}sᴇᴛᴘᴘ
┃◇ ${prefix}ᴀɴᴛɪᴄᴀʟʟ
┃◇ ${prefix}sᴇᴛsᴛᴀᴛᴜs
┃◇ ${prefix}sᴇᴛɴᴀᴍᴇʙᴏᴛ
┃◇ ${prefix}ᴀᴜᴛᴏᴛʏᴘɪɴɢ
┃◇ ${prefix}ᴏɴʟɪɴᴇ
┃◇ ${prefix}ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ
┃◇ ${prefix}ᴀᴜᴛᴏʀᴇᴀᴅ
┃◇ ${prefix}ᴀᴜᴛᴏsᴠɪᴇᴡ
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯*
> *ᴍᴀᴅᴇ ʙʏ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: fgg
});
}
   
   if (selectedId == "Search Menu") {
     const str =`
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐒𝐄𝐀𝐑𝐂𝐇 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ᴘʟᴀʏ
┃◇ ${prefix}ᴘʟᴀʏ2
┃◇ ${prefix}sᴏɴɢ
┃◇ ${prefix}ꜱɪɴɢ
┃◇ ${prefix}ʏᴛs
┃◇ ${prefix}ɪᴍᴅʙ
┃◇ ${prefix}ᴍᴏᴠɪᴇ
┃◇ ${prefix}ɪᴍᴀɢᴇ
┃◇ ${prefix}ɢᴏᴏɢʟᴇ
┃◇ ${prefix}ɪᴍɢ
┃◇ ${prefix}ᴘɪɴᴛ
┃◇ ${prefix}ᴘɪɴᴛᴇʀᴇsᴛ
┃◇ ${prefix}ᴡᴀʟʟᴘᴀᴘᴇʀ
┃◇ ${prefix}ᴡɪᴋɪᴍᴇᴅɪᴀ
┃◇ ${prefix}ʏᴛs
┃◇ ${prefix}ʀɪɴɢᴛᴏɴᴇ
┃◇ ${prefix}ʟʏʀɪᴄs
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯*
> *ᴍᴀᴅᴇ ʙʏ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: fgg
});
   }
   if (selectedId == "Stalker Menu") {
     const str =`
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐒𝐓𝐀𝐋𝐊𝐄𝐑 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ᴛʀᴜᴇᴄᴀʟʟᴇʀ
┃◇ ${prefix}ɪɴsᴛᴀsᴛᴀʟᴋ
┃◇ ${prefix}ɴᴏᴡᴀ
┃◇ ${prefix}ɢɪᴛsᴛᴀʟᴋ
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯*
> *ᴍᴀᴅᴇ ʙʏ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: fgg
});
   }

     if (selectedId == "Reactions Menu") {
     const str =`
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐑𝐄𝐀𝐂𝐓𝐈𝐎𝐍𝐒 𝐌𝐄𝐍𝐔*
${readmore}
╭━❍ *ʀᴇᴀᴄᴛɪᴏɴs* ❍⊷
┃◇ .ᴄʀʏ
┃◇ .ᴡɪɴᴋ
┃◇ .ᴋɪss
┃◇ .ᴘᴏᴋᴇ
┃◇ .ᴋɪᴄᴋ
┃◇ .sʟᴀᴘ
┃◇ .ʜᴜɢ
┃◇ .sᴍɪʟᴇ
┃◇ .ᴘᴀᴛ
┃◇ .ᴡᴀᴠᴇ
┃◇ .ʟɪᴄᴋ
┃◇ .ᴀᴡᴏᴏ
┃◇ .ʙɪᴛᴇ
┃◇ .ʏᴇᴇᴛ
┃◇ .ʙʟᴜsʜ
┃◇ .ʙᴜʟʟʏ
┃◇ .sᴍᴜɢ
┃◇ .ʙᴏɴᴋ
┃◇ .ᴅᴀɴᴄᴇ
┃◇ .ʜᴀᴘᴘʏ
┃◇ .sᴀᴅ
┃◇ .ᴄʀʏɴɢᴇ
┃◇ .ᴄᴜᴅᴅʟᴇ
┃◇ .sʜɪɴᴏʙᴜ
┃◇ .ʜᴀɴᴅʜᴏʟᴅ
┃◇ .ɢʟᴏᴍᴘ
┃◇ .ʜɪɢʜғɪᴠᴇ
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯*
> *ᴍᴀᴅᴇ ʙʏ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: fgg
});
     }
   
   if (selectedId == "Tools Menu") {
     const str =`
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐓𝐎𝐎𝐋 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ᴄᴀʟᴄ
┃◇ ${prefix}ᴛᴇᴍᴘᴍᴀɪʟ
┃◇ ${prefix}ᴄʜᴇᴄᴋᴍᴀɪʟ
┃◇ ${prefix}ɪɴғᴏ
┃◇ ${prefix}ᴛʀᴛ
┃◇ ${prefix}ᴛᴛs
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯*
> *ᴍᴀᴅᴇ ʙʏ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: fgg
});
   }

     if (selectedId == "Logo Menu") {
     const str =`
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* __ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐋𝐎𝐆𝐎  𝐌𝐄𝐍𝐔*
${readmore}
╭━❍ *ʟᴏɢᴏ* ❍⊷
┃◇ ᴄᴏᴍɪɴɢ sᴏᴏɴ, sᴛᴀʏ ᴘᴜᴛ!
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯*
> *ᴍᴀᴅᴇ ʙʏ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: fgg
});
     }
   
   if (selectedId == "Ai Menu") {
     const str =`
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* __ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐀𝐈 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ᴀɪ
┃◇ ${prefix}ʙᴜɢ
┃◇ ${prefix}ʀᴇᴘᴏʀᴛ
┃◇ ${prefix}ɢᴘᴛ
┃◇ ${prefix}ɢᴘᴛ4
┃◇ ${prefix}ᴛᴇxᴛᴅᴇᴛᴇᴄᴛ
┃◇ ${prefix}ᴀɪᴅᴇᴛᴇᴄᴛ
┃◇ ${prefix}ʙʟᴀᴄᴋʙᴏx
┃◇ ${prefix}ᴅᴀʟʟᴇ
┃◇ ${prefix}ʀᴇᴍɪɴɪ
┃◇ ${prefix}ɢᴇᴍɪɴɪ
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯*
> *ᴍᴀᴅᴇ ʙʏ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ*
`;
         let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `𝐆𝐈𝐅𝐓𝐄𝐃 𝐓𝐄𝐂𝐇`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'MATRIX'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: fgg
});
   }
   
   if (selectedId == "Converter Menu") {
     const str =`
> *${pushwish}* _${m.pushName}_
╭══ *〘〘 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯 〙〙* ═⊷
┃❍ *ᴍᴏᴅᴇ:* _${mode}_
┃❍ *ᴘʀᴇғɪx:* [ ${prefix} ]
┃❍ *ᴏᴡɴᴇʀ:* __ᴅᴀᴠɪᴅ ᴄʏʀɪʟ_
┃❍ *ᴜsᴇʀ:* _${m.pushName}_
┃❍ *ᴠᴇʀꜱɪᴏɴ:* _5.0.0_      
┃❍ *ᴅᴀᴛᴀʙᴀsᴇ:* _ᴄᵖᵃⁿᵉˡ_
┃❍ *ᴛᴏᴛᴀʟ ʀᴀᴍ:* _${formatBytes(totalMemoryBytes)}_
┃❍ *ғʀᴇᴇ ʀᴀᴍ:* _${formatBytes(freeMemoryBytes)}_
┃❍ *ᴘʟᴀᴛғᴏʀᴍ:* _ᴡʜᴀᴛsᴀᴘᴘ_
╰═════════════════⊷

> *𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐄𝐑 𝐌𝐄𝐍𝐔*
${readmore}
╭━━━━━━━━━━━━━━━⊷
┃◇ ${prefix}ᴀᴛᴛᴘ
┃◇ ${prefix}ᴀᴛᴛᴘ2
┃◇ ${prefix}ᴀᴛᴛᴘ3
┃◇ ${prefix}ᴇɴᴄᴏᴅᴇ
┃◇ ${prefix}ᴇʙɪɴᴀʀʏ
┃◇ ${prefix}ᴅᴇᴄᴏᴅᴇ
┃◇ ${prefix}ᴅᴇʙɪɴᴀʀʏ
┃◇ ${prefix}ᴇᴍᴏᴊɪᴍɪx
┃◇ ${prefix}ᴍᴘ3
┃◇ ${prefix}ᴛᴏᴍᴘ3
╰━━━━━━━━━━━━━━━⊷
${readmore}
> *©𝟐𝟎𝟐𝟒 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯*
> *ᴍᴀᴅᴇ ʙʏ _ᴅᴀᴠɪᴅ ᴄʏʀɪʟ*
`
     await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./gifted/img/gifted.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: false,
  }
}, {
  quoted: m
});
}
};

export default test;
