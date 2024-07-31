import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

const alive = async (m, Matrix) => {
  const uptimeSeconds = process.uptime();
  const days = Math.floor(uptimeSeconds / (24 * 3600));
  const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);
  
  const prefix = /^[\\/!#.]/gi.test(m.body) ? m.body.match(/^[\\/!#.]/gi)[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';
    if (['uptime'].includes(cmd)) {

  const uptimeMessage = `
*Hello _${m.pushName}_*\n
*QUEEN ANITA IS RUNNING!!*
*BOT UPTIME INFO:* ${readmore}
*╭═════════════════⊷*
*┃❍ ${days} Day(s)*
*┃❍ ${hours} Hour(s)*
*┃❍ ${minutes} Minute(s)*
*┃❍ ${seconds} Second(s)*
*╰═════════════════⊷*
`;

  const buttons = [
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "BOT OWNER",
            id: `.owner`
          })
        },
       {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "BOT SCRIPT",
            id: `.repo`
          })
        },
       {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "MAIN MENU",
            id: `.menu`
          })
        },
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "TEST MESG",
            id: `.test`
          })
        },
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "BOT SPEED",
            id: `.ping`
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
            text: uptimeMessage
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "> *©𝟐𝟎𝟐𝟒 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝗩𝟯"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
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
                  forwardingScore: 999,
                  isForwarded: false,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363249960769123@newsletter',
                  newsletterName: "David",
                  serverMessageId: 143
                }
              }
        }),
      },
    },
  }, {});

  await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id
  });
    }
};

export default alive;
