import config from '../../set.cjs';

const modeCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim().toLowerCase();

  if (cmd === 'mode') {
    if (!isCreator) return m.reply("*ᴛʜɪs ɪs ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ*");
    let responseMessage;

    if (text === 'public') {
      config.MODE = 'public';
      responseMessage = "Mode has been set to public.";
    } else if (text === 'private') {
      config.MODE = 'private';
      responseMessage = "Mode has been set to private.";
    } else {
      responseMessage = "Usage:\n- `mode public`: Set mode to public\n- `mode private`: Set mode to private";
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }
};

export default modeCommand;
