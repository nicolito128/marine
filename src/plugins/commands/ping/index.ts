import { CreateApplicationCommand, Interaction } from '@biscuitland/core';
import { Client } from 'src/client';
import type { CommandStruct, CommandTriggerArgs } from '../../../../lib/commands/index';

export const Command = new class implements CommandStruct {
    constructor() {
        this.name = 'ping';
        this.description = 'Get latency of the bot.';
        this.slash = {
            name: this.name,
            description: this.description,
        };
    }

    name: string;
    description: string;
    slash: CreateApplicationCommand;

    async trigger({ message, client}: CommandTriggerArgs) {
        const latency = await this.getLatency(client);
        message.send(`Pong! :ping_pong: \`${latency}\``);
    }

    async getLatency(client: Client): Promise<number> {
        const start = Date.now();

        await client.rest.get('/users/@me')

        const end = Date.now();

        return end - start;
    }

    async interaction(client: Client, int: Interaction) {
        const latency = await this.getLatency(client);
        int.respond({ with: { content: `Pong! :ping_pong: \`${latency}\`` } })
    };
}

export default Command;