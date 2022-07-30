import type { CommandStruct, CommandTriggerArgs } from '../../../../lib/commands/index';

export const Command = new class implements CommandStruct {
    constructor() {
        this.name = 'github';
        this.description = 'Github repository.';
        this.link = 'https://github.com/nicolito128/marine';
    }

    name: string;
    description: string;
    link: string;

    async trigger({ message }: CommandTriggerArgs) {
        message.send('**Github repository**: ' + this.link)
    }
}

export default Command;