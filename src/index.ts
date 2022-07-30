import client from './client';
import { LoadEvents, TriggerEvents } from '../lib/plugins/index';

client.session.events.on('ready', async ({ user }) => {
    console.log('Logged in as:', user.username);
    console.log('Using prefix: ', client.prefix);
});

client.session.events.on('messageCreate', msg => {
    LoadEvents('messageCreate');
    TriggerEvents('messageCreate', msg)
});

client.session.events.on('guildCreate', guild => {
    client.guilds.set(guild.id, guild);
    LoadEvents('guildCreate');
    TriggerEvents('guildCreate', guild);
});

try {
    client.session.start();
} catch (err) {
    console.error(err);
    process.exit(1);
}
