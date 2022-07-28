import * as biscuit from '@oasisjs/biscuit';
import Client from '../../src/client';

export class Message {
    constructor(msg: biscuit.Message, bot: Client) {
        this.self = msg;
        this.content = msg.content;
        this.client = bot;
    }

    readonly self: biscuit.Message;
    readonly client: Client;
    readonly content: string;

    get plainContent(): string {
        return this.content.replace(this.client.prefix, '').split(" ").shift() || "";
    }

    hasPrefix(content: string = this.content) {
        return content.startsWith(this.client.prefix);
    }

    reply(options: biscuit.CreateMessage): Promise<biscuit.Message> {
        return this.self.reply(options);
    }

    send(str: string) {
        return this.self.reply({ content: str })
    }

}

export default Message;