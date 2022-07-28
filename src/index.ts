import Client from './client';
import Message from './../lib/messages/index';

const bot: Client = new Client();
//const aDay = 24 * 3600 * 1000; // milliseconds in a day
const guildId = '973427352560365658';


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

bot.on('guildCreate', async (guild) => {
    if (guild.id === guildId) {
        guild.edit({
            iconURL: 'https://i.imgur.com/zlCr3No.png'
        })

        console.log('Icon edited.');
    }
});

try {
    bot.start();
} catch (err) {
    console.error(err);
    process.exit(1);
}