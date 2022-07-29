import Client from './client';
import Message from './../lib/messages/index';
import { LoadEvents, TriggerEvents } from './plugins/plugins';

const bot: Client = new Client();

bot.on('ready', async ({ user }) => {
    console.log('Logged in as:', user.username);
    console.log('Using prefix: ', bot.prefix);

    LoadEvents('guildCreate');
});

bot.on('messageCreate', (msg) => {
    const message = new Message({message: msg, bot});

    if (message.hasPrefix()) {
        if (message.plainContent === 'ping') {
            message.send('pong!');
        }
    }
});

bot.on('guildCreate', guild => TriggerEvents('guildCreate', guild));

try {
    bot.start();
} catch (err) {
    console.error(err);
    process.exit(1);
}
