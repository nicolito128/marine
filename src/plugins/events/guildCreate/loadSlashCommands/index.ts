import type { KeywordEvent, Plugin } from '../../../../../lib/plugins';
import { CreateApplicationCommand, Guild } from '@biscuitland/core';
import { Client } from '../../../../client';
import SlashEvent from '../../interactionCreate/loadSlashCommands/index';

export const Event = new class implements Plugin {
    constructor() {
        this.name ='Change Guild Icon';
        this.type = 'guildCreate';
    }
    
    name: string;
    type: KeywordEvent;

    async trigger(client: Client, guild: Guild) {
        let arr: CreateApplicationCommand[] = [];
        for (const cmd of SlashEvent.cache.values()) {
            if (cmd?.slash) {
                arr.push(cmd?.slash);
            }
        }

        await client.upsertApplicationCommands(arr, guild.id);
    }
}

export default Event;