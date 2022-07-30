import type { CommandStruct, CommandTriggerArgs } from '../../../../lib/commands/index';

export const Command = new class implements CommandStruct {
    constructor() {
        this.name = 'ping';
        this.description = 'Get latency of the bot.';
    }

    name: string;
    description: string;

    async trigger({ message, client }: CommandTriggerArgs) {
        const start = Date.now();

        await client.rest.get('/users/@me')

        const end = Date.now();

        message.send(`Pong! :ping_pong: \`${end - start}ms\``);
    }
}

export default Command;