import { loadEvents, triggerEvents } from '../lib/plugins/index';
import { ActivityTypes } from '@biscuitland/api-types';
import { StatusTypes } from '@biscuitland/core';
import client from './client';

const events = {
    guildCreate: loadEvents('guildCreate'),
    messageCreate: loadEvents('messageCreate')
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
    triggerEvents('messageCreate', msg)
});

client.events.on('guildCreate', guild => {
    client.guilds.set(guild.id, guild);
    
    events.guildCreate();
    triggerEvents('guildCreate', guild);
});

try {
    client.start();
} catch (err) {
    console.error(err);
    process.exit(1);
}
