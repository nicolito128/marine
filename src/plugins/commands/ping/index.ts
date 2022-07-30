import type { CommandStruct, CommandTriggerArgs } from '../../../../lib/commands/index';

export const Command = new class implements CommandStruct {
    constructor() {
        this.name = 'ping';
        this.description = 'description';
    }

    name: string;
    description: string;

    trigger({ message }: CommandTriggerArgs) {
        message.send('Pong! :ping_pong:');
    }
}

export default Command;