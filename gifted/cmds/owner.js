import setEnvCommand from '../giftke.js';
import config from '../../set.cjs';
const ownerContact = async (m, gss) => {
    const ownernumber = config.OWNER_NUMBER;
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    if (cmd === 'owner') {
        try {
            await gss.sendContact(m.from, [ownernumber], m);
            await m.React("✅");
        } catch (error) {
            console.error('Error sending owner contact:', error);
            m.reply('Error sending owner contact.');
            await m.React("❌");
        }
    } else if (cmd === 'setvar') {
        const args = text.split(' ');
        await setEnvCommand(m, args);
    }
};

export default ownerContact;


