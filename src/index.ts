import { urlToBase64 } from '@oasisjs/biscuit/biscuit'; 
import Client from './client';
import Message from './../lib/messages/index';

const bot: Client = new Client();
const A_DAY = 24 * 3600 * 1000; // milliseconds in a day
const guildId = '973427352560365658';
const images = [
    'https://i.imgur.com/fHWZEZK.png',
    'https://i.imgur.com/nQHBa3I.png',
    'https://i.imgur.com/5pEGDXx.png',
    'https://i.imgur.com/ntOpVpP.png',
    'https://i.imgur.com/tPS4DAg.png',
    'https://i.imgur.com/HYT7Ouv.png',
    'https://i.imgur.com/odzUSfQ.png',
    'https://i.imgur.com/zlCr3No.png',
    'https://i.imgur.com/agZ4vZW.jpeg'
];

function selectImage(): () => string {
    let i: number = 0;

    return function(){
        i++;
        if (i == images.length ) {
            i = 0;
        }

        return images[i];
    }
}

bot.on('ready', ({ user }) => {
    console.log('Logged in as:', user.username);
    console.log('Using prefix: ', bot.prefix);
});

bot.on('messageCreate', (msg) => {
    const message = new Message(msg, bot);

    if (message.hasPrefix()) {
        if (message.plainContent === 'ping') {
            message.send('pong!');
        }
    }
});

bot.on('guildCreate', (guild) => {
    if (guild.id === guildId) {
        setInterval(async () => {
            const url = selectImage()();
            await urlToBase64(url).then(icon => guild.edit({ icon }))
        }, A_DAY);
    }
});

try {
    bot.start();
} catch (err) {
    console.error(err);
    process.exit(1);
}