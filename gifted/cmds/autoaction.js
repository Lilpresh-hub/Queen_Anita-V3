import config from '../../set.cjs';

async function handleCommand(m, gss) {
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    if (!m.body.startsWith(prefix)) {
        return;
    }

    if (config.AUTO_TYPING && m.from) {
        gss.sendPresenceUpdate("composing", m.from);
    }

    if (config.AUTO_RECORDING && m.from) {
        gss.sendPresenceUpdate("recording", m.from);
    }

    if (m.from) {
        gss.sendPresenceUpdate(config.ALWAYS_ONLINE ? 'available' : 'unavailable', m.from);
    }

    if (config.AUTO_READ) {
        await gss.readMessages([m.key]);
    }

    if (config.AUTO_BLOCK && m.sender.startsWith('212')) {
        await gss.updateBlockStatus(m.sender, 'block');
    }
}

export default handleCommand;


    
