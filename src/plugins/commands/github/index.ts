import { CreateApplicationCommand, Interaction } from '@biscuitland/core';
import { Client } from '../../../client';
import type { CommandStruct, CommandTriggerArgs } from '../../../../lib/commands/index';

export const Command = new class implements CommandStruct {
    constructor() {
        this.name = 'github';
        this.description = 'Github repository.';
        this.link = 'https://github.com/nicolito128/marine';
        this.slash = {
            name: this.name,
            description: this.description,
        }
    }

    name: string;
    description: string;
    slash: CreateApplicationCommand;
    link: string;

    async trigger({ message }: CommandTriggerArgs) {
        message.send('**Github repository**: ' + this.link)
    }

    async interaction(_client: Client, int: Interaction) {
        int.respond({ with: { content: '**Github repository**: ' + this.link } })
    }
}

export default Command;