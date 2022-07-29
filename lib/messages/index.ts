import * as biscuit from '@oasisjs/biscuit';
import client, { Client } from '../../src/client';

export class CustomMessage {
    constructor(message: biscuit.Message) {
        this.self = message;
        this.client = client;
        this.content = this.self.content;
    }

    readonly self: biscuit.Message;
    readonly client: Client;
    readonly content: string;

    get plainContent(): string {
        return this.content.replace(this.client.prefix, '').split(' ').shift() || '';
    }

    hasPrefix(content: string = this.content) {
        return content.startsWith(this.client.prefix);
    }

    async reply(options: biscuit.CreateMessage): Promise<CustomMessage> {
        return new CustomMessage(await this.self.reply(options));
    }

    send(str: string) {
        return this.self.reply({ content: str });
    }
}

export default CustomMessage;