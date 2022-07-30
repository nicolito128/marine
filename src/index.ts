import client from './client';
import { LoadEvents, TriggerEvents } from '../lib/plugins/index';
import { StatusTypes } from '@biscuitland/core';
import { ActivityTypes } from '@biscuitland/api-types';

client.events.on('ready', async ({ user }) => {
    console.log('Logged in as:', user.username);
    console.log('Using prefix: ', client.prefix);

    client.editStatus(0, {
        status: StatusTypes.online,
        activities: [
            {
                name: 'Hi!',
                type: ActivityTypes.Streaming,
                createdAt: Date.now()
            }
        ]
    })
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
