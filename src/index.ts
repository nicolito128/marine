import Client from './client';

const bot: Client = new Client();

bot.on('ready', ({ user }) => {
    console.log('Logged in as:', user.username);
    console.log('Using prefix: ', bot.prefix);
});

bot.on('messageCreate', (message) => {
    if (message.content.startsWith(bot.prefix + 'ping')) {
        message.reply({ content: 'pong!' });
    }
});

try {
    bot.start();
} catch (err) {
    console.error(err);
    process.exit(1);
}