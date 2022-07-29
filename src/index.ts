import client from './client';
import { LoadEvents, TriggerEvents } from './plugins/plugins';

client.on('ready', async ({ user }) => {
    console.log('Logged in as:', user.username);
    console.log('Using prefix: ', client.prefix);

    LoadEvents('guildCreate');
    LoadEvents('messageCreate');
});

client.on('messageCreate', msg => TriggerEvents('messageCreate', msg));
client.on('guildCreate', guild => TriggerEvents('guildCreate', guild));

try {
    client.start();
} catch (err) {
    console.error(err);
    process.exit(1);
}
