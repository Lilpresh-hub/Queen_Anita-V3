import dotenv from 'dotenv';
dotenv.config();
import { makeWASocket, Browsers, jidDecode, makeInMemoryStore, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, DisconnectReason, useMultiFileAuthState, getAggregateVotesInPollMessage } from '@whiskeysockets/baileys';
import { Handler, Callupdate, GroupUpdate } from './funcs/giftedte.js';
import { Boom } from '@hapi/boom';
import express from 'express';
import pino from 'pino';
import fs from 'fs';
import NodeCache from 'node-cache';
import path from 'path';
import chalk from 'chalk';
import { writeFile } from 'fs/promises';
import moment from 'moment-timezone';
import axios from 'axios';
import fetch from 'node-fetch';
import * as os from 'os';
import config from '../set.cjs';  
import pkg from '../gift/giftke.cjs';
const { emojis, doReact } = pkg;

const sessionName = "session";
const app = express();
const orange = chalk.bold.hex("#FFA500");
const lime = chalk.bold.hex("#32CD32");
let useQR;
let isSessionPutted;
let initialConnection = true;
const PORT = process.env.PORT || 5000;

const MAIN_LOGGER = pino({
    timestamp: () => `,"time":"${new Date().toJSON()}"`
});
const logger = MAIN_LOGGER.child({});
logger.level = "trace";

const msgRetryCounterCache = new NodeCache();

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
});

// Baileys Connection Option
async function start() {
    if (!config.SESSION_ID) {
        useQR = false;
        isSessionPutted = false;
    } else {
        useQR = false;
        isSessionPutted = true;
    }

    let { state, saveCreds } = await useMultiFileAuthState(sessionName);
    let { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(chalk.red("QUEEN ANITA CONNECTING TO WHATSAPP"));
    console.log(chalk.green(`CHECKING WA VERSION v${version.join(".")}, isLatest: ${isLatest}`));

    const Device = (os.platform() === 'win32') ? 'Windows' : (os.platform() === 'darwin') ? 'MacOS' : 'Linux';
    const Matrix = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: useQR,
        browser: [Device, 'chrome', '121.0.6167.159'],
        patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(
                message.buttonsMessage ||
                message.templateMessage ||
                message.listMessage
            );
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            },
                            ...message,
                        },
                    },
                };
            }
            return message;
        },
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
        },
        getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id);
                return msg.message || undefined;
            }
            return {
                conversation: "✅WHATSAPP LOGIN SUCCESSFUL, 𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐕𝟓 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃!"
            };
        },
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        defaultQueryTimeoutMs: undefined,
        msgRetryCounterCache
    });
    store?.bind(Matrix.ev);

    // Manage Device Logging
    if (!Matrix.authState.creds.registered && isSessionPutted) {
        const sessionID = config.SESSION_ID.split('Anita~')[1];
        const pasteUrl = `https://pastebin.com/raw/${sessionID}`;
        const response = await fetch(pasteUrl);
        const text = await response.text();
        if (typeof text === 'string') {
            fs.writeFileSync('./session/creds.json', text);
            console.log('Session ID Converted to creds.json');
           console.log('Creds.json file saved in Session Folder');
            await start();
        }
    }

    // Response cmd pollMessage
    async function getMessage(key) {
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id);
            return msg?.message;
        }
        return {
            conversation: "✅WHATSAPP LOGIN SUCCESSFUL, 𝐆𝐈𝐅𝐓𝐄𝐃-𝐌𝐃 𝐕𝟓 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃!",
        };
    }

    // Handle Incomming Messages
    Matrix.ev.on("messages.upsert", async chatUpdate => await Handler(chatUpdate, Matrix, logger));
    Matrix.ev.on("call", async (json) => await Callupdate(json, Matrix));
    Matrix.ev.on("group-participants.update", async (messag) => await GroupUpdate(Matrix, messag));

    // Setting public or self mode based on config
    if (config.MODE === 'public') {
        Matrix.public = true;
    } else if (config.MODE === 'private') {
        Matrix.public = false;
    }


    // Check Baileys connections
Matrix.ev.on("connection.update", async update => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
        if (reason === DisconnectReason.connectionClosed) {
            console.log(chalk.red("[😩] Connection closed, reconnecting."));
            start();
        } else if (reason === DisconnectReason.connectionLost) {
            console.log(chalk.red("[🤕] Connection Lost from Server, reconnecting."));
            start();
        } else if (reason === DisconnectReason.loggedOut) {
            console.log(chalk.red("[😭] Device Logged Out, Please Delete Session and Link Again."));
            process.exit();
        } else if (reason === DisconnectReason.restartRequired) {
            console.log(chalk.blue("[♻️] Server Restarting."));
            start();
        } else if (reason === DisconnectReason.timedOut) {
            console.log(chalk.red("[⏳] Connection Timed Out, Trying to Reconnect."));
            start();
        }
    }

    if (connection === "open") {
        if (initialConnection) {
            console.log(chalk.green("✅WHATSAPP LOGIN SUCCESSFUL, 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝐕𝟯 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃"));
            Matrix.sendMessage(Matrix.user.id, { text: `𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝐕𝟯 𝗖𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃\n\n𝐃𝐚𝐭𝐚𝐛𝐚𝐬𝐞  : Cpanel \n𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦: Whatsapp \n𝐎𝐰𝐧𝐞𝐫    : t.me/DeeCee_x\n𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥 : https://whatsapp.com/channel/0029VaeRru3ADTOEKPCPom0L\n\n> 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝗗𝗔𝗩𝗜𝗗 𝗖𝗬𝗥𝗜𝗟` });
            initialConnection = false;
        } else {
            console.log(chalk.blue("♻️ Connection reestablished after restart."));
        }
    }
});

Matrix.ev.on('messages.upsert', async chatUpdate => {
  try {
    const mek = chatUpdate.messages[0];
    if (!mek.key.fromMe && config.AUTO_REACT) {
      console.log(mek);
      if (mek.message) {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        await doReact(randomEmoji, mek, Matrix);
      }
    }
  } catch (err) {
    console.error('Error during auto reaction:', err);
  }
});
}

start();
app.get('/', (req, res) => {
    res.send('✅WHATSAPP LOGIN SUCCESSFUL, 𝗤𝗨𝗘𝗘𝗡 𝗔𝗡𝗜𝗧𝗔 𝐕𝟯 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃!');
});

app.listen(PORT, () => {
    console.log(`Anita Server Live on Port ${PORT}`);
});
