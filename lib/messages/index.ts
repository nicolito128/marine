import * as biscuit from '@oasisjs/biscuit';
import Client from '../../src/client';

export type CustomMessageOptions = { bot: Client, message: biscuit.Message }

export class CustomMessage {
    constructor(options: CustomMessageOptions) {
        this.self = options.message;
        this.client = options.bot;
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
        return new CustomMessage({ bot: this.client, message: await this.self.reply(options) })
    }

    send(str: string) {
        return this.self.reply({ content: str })
    }
}

export default CustomMessage;