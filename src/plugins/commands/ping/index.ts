import type { CommandStruct, CommandTriggerArgs } from '../../../../lib/commands/index';

export const Command = new class implements CommandStruct {
    constructor() {
        this.name = 'ping';
        this.description = 'description';
    }

    name: string;
    description: string;

    async trigger({ message, client }: CommandTriggerArgs) {
        const start = Date.now();

        await client.rest.get('/users/@me')

        const end = Date.now();

        message.send(`Pong! \`${end - start}ms\` :ping_pong:`);
    }
}

export default Command;