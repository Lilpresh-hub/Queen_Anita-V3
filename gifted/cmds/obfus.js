import JavaScriptObfuscator from 'javascript-obfuscator';

const Obfuscator = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['enc', 'encrypt', 'obfus', 'obfuscate', 'cobfuse'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      return m.reply(`Hello *_${m.pushName}_,*\n Gifted Js Obfuscator.\n Please Provide a Js Code to Encrypt. ie  .enc *_paste your js code_*`);
    }

    try {
      let obfuscatedText = JavaScriptObfuscator.obfuscate(text, {
        compact: true,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75,
        transformObjectKeys: true,
        unicodeEscapeSequence: false
      }).getObfuscatedCode();
        
      await Matrix.sendMessage(m.chat, { obfuscatedText }, { quoted: m });
    } catch (error) {
      console.error('Error getting encrypted code:', error);  // Enhanced logging
      m.reply('Error Encrypting Your js Code.');
      await m.React('❌');
    }
  }
};

export default Obfuscator;
