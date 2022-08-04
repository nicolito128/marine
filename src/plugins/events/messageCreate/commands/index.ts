import type { KeywordEvent, Plugin } from '../../../../../lib/plugins/index';
import { CommandStruct } from '../../../../../lib/commands/index';
import CustomMessage from '../../../../../lib/messages/index';
import { Message } from '@biscuitland/core';
import client, { Client } from '../../../../client';

export const Event = new class implements Plugin {
    constructor() {
        this.name = 'Command Handler';
        this.type = 'messageCreate';
        client.loadCommands();
    }

    name: string;
    type: KeywordEvent;

    async trigger(client: Client, msg: Message) {
        const message = new CustomMessage(msg);
        if (message.hasPrefix()) {
            const args = msg.content.split(' ');
            const command = client.commands.get(args[0].replace(message.client.prefix, ''));

            if (command && !message.self.isBot) {
                (command as CommandStruct).trigger({
                    message,
                    client: message.client,
                    args: args.slice(1)
                });
            }
        }
    }
}

export default Event;