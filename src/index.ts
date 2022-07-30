import client from './client';
import { LoadEvents, TriggerEvents } from '../lib/plugins/index';

client.events.on('ready', async ({ user }) => {
    console.log('Logged in as:', user.username);
    console.log('Using prefix: ', client.prefix);
});

client.events.on('messageCreate', msg => {
    LoadEvents('messageCreate');
    TriggerEvents('messageCreate', msg)
});

client.events.on('guildCreate', guild => {
    client.guilds.set(guild.id, guild);
    LoadEvents('guildCreate');
    TriggerEvents('guildCreate', guild);
});

try {
    client.start();
} catch (err) {
    console.error(err);
    process.exit(1);
}
