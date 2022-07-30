import client from './client';
import { LoadEvents, TriggerEvents } from '../lib/plugins/index';
import { StatusTypes } from '@biscuitland/core';
import { ActivityTypes } from '@biscuitland/api-types';

const events = {
    guildCreate: LoadEvents('guildCreate'),
    messageCreate: LoadEvents('messageCreate')
};

client.events.on('ready', async ({ user }) => {
    console.log('Logged in as:', user.username);
    console.log('Using prefix: ', client.prefix);

    for (const { id } of client.ws.agent.shards.values()) {
        client.editStatus(id, {
            status: StatusTypes.online,
            activities: [
                {
                    name: 'Marine says hi!',
                    type: ActivityTypes.Listening,
                    createdAt: Date.now(),
                }
            ],
        }, true)
    }
});

client.events.on('messageCreate', msg => {
    events.messageCreate();
    TriggerEvents('messageCreate', msg)
});

client.events.on('guildCreate', guild => {
    client.guilds.set(guild.id, guild);
    
    events.guildCreate();
    TriggerEvents('guildCreate', guild);
});

try {
    client.start();
} catch (err) {
    console.error(err);
    process.exit(1);
}
