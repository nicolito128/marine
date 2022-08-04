import type { KeywordEvent, Plugin } from '../../../../../lib/plugins';
import { Interaction } from '@biscuitland/core';
import client, { Client } from '../../../../client';

export const Event = new class implements Plugin {
    constructor() {
        this.name ='Load Slash Commands';
        this.type = 'interactionCreate';
        client.loadCommands();
    }
    
    name: string;
    type: KeywordEvent;

    async trigger(client: Client, interaction: Interaction) {
        if (interaction.isCommand()) {
            const cmd = client.commands.get(interaction.commandName);
            if (cmd) {
                if (cmd.interaction) {
                    cmd.interaction(client, interaction);
                }
            }
        }
    }
}

export default Event;