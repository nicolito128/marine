import type { KeywordEvent, Plugin } from '../../../../../lib/plugins';
import { CreateApplicationCommand, Guild } from '@biscuitland/core';
import { Client } from '../../../../client';

export const Event = new class implements Plugin {
    constructor() {
        this.name ='Load Slash Commands Into Guilds';
        this.type = 'guildCreate';
    }
    
    name: string;
    type: KeywordEvent;

    async trigger(client: Client, guild: Guild) {
        let arr: CreateApplicationCommand[] = [];
        for (const cmd of client.commands.values()) {
            if (cmd?.slash) {
                arr.push(cmd?.slash);
            }
        }

        await client.upsertApplicationCommands(arr, guild.id);
    }
}

export default Event;