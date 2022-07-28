import Client from './client';
import Message from './../lib/messages/index';

const bot: Client = new Client();

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

try {
    bot.start();
} catch (err) {
    console.error(err);
    process.exit(1);
}