import { Message, CreateMessage } from '@biscuitland/core';
import client, { Client } from '../../src/client';

/**
 * Creates a custom message object to handle common requirements.
 * @see {@link Message}
*/
export class CustomMessage {
    constructor(message: Message) {
        this.self = message;
        this.client = client;
        this.content = this.self.content;
    }

    readonly self: Message;
    readonly client: Client;
    readonly content: string;

    /**
     * Get the message content without the prefix and the command.
     */
    get plainContent(): string {
        return this.content.replace(this.client.prefix, '').split(' ').shift() || '';
    }

    /**
     * If the content starts with the prefix, it returns true.
     * @param content The content of the message. Optional.
     */
    hasPrefix(content: string = this.content) {
        return content.startsWith(this.client.prefix);
    }

    /**
     * Replies a message to the channel.
     * @param options The options to be used when sending the message.
     */
    async reply(options: CreateMessage): Promise<CustomMessage> {
        return new CustomMessage(await this.self.reply(options));
    }

    /**
     * Sends a message to the channel.
     * @param str The string to be sent.
     */
    send(str: string) {
        return this.self.reply({ content: str });
    }
}

export default CustomMessage;