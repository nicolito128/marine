import client from './client';
import { LoadEvents, TriggerEvents } from './plugins/plugins';

client.session.events.on('ready', async ({ user }) => {
    console.log('Logged in as:', user.username);
    console.log('Using prefix: ', client.prefix);

    LoadEvents('guildCreate');
    LoadEvents('messageCreate');
});

client.session.events.on('messageCreate', msg => TriggerEvents('messageCreate', msg));
client.session.events.on('guildCreate', guild => {
    client.guilds.set(guild.id, guild);
    TriggerEvents('guildCreate', guild);
});

try {
    client.session.start();
} catch (err) {
    console.error(err);
    process.exit(1);
}
