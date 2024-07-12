import fetch from 'node-fetch';
import config from '../../set.cjs';

const downloadAndSendMedia = async (m, Matrix) => {
  if (!config.AUTO_DOWNLOAD) return;  // Exit early if AUTO_DL is false

  const text = m.body.trim();

  if (!/^https?:\/\//.test(text)) {
    return;
  }

  try {
    const supportedDomains = ['youtube.com', 'telegra.ph', 'imgur.com', 'i.imgur.com', 'youtu.be', 'instagram.com', 'facebook.com', 'tiktok.com', 'drive.google.com', 'x.com', 'twitter.com', 'giftedtechnexus.co.ke', 'snapchat.com', 'likee.com', 'github.com'];
    const urlObj = new URL(text);
    const domain = urlObj.hostname.replace('www.', '');

    if (supportedDomains.some(d => domain.includes(d))) {
      const apiUrl = `https://aiodownloader.onrender.com/download?url=${encodeURIComponent(text)}`;
      const res = await fetch(apiUrl);
      const result = await res.json();

      if (result.status) {
        const mediaData = result.data;
        const caption = `Hello *_${m.pushName},_*\nHere we Go!\n\n> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*`;

        if (mediaData.low) {
          const mediaUrl = mediaData.low;
          const extension = mediaUrl.split('.').pop().toLowerCase();

          await Matrix.sendMedia(m.from, mediaUrl, extension, caption, m);
          await m.React('✅');
        } else {
        }
      } else {
      }
    } else {
    }
  } catch (error) {
    console.error('Error downloading and sending media:', error.message);
    m.reply('Error downloading and sending media.');
    await m.React('❌');
  }
};

export default downloadAndSendMedia;
