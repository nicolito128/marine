import type { KeywordEvent, Plugin } from '../../../../../lib/plugins/index';
import { CommandStruct } from '../../../../../lib/commands/index';
import CustomMessage from '../../../../../lib/messages/index';
import { Message } from '@biscuitland/core';
import * as path from 'path';
import * as fs from 'fs';

export const Event = new class implements Plugin {
    constructor() {
        this.name = 'Command Handler';
        this.type = 'messageCreate';
        this.loaded = false;
        this.cache = new Map<string, CommandStruct>();
    }

    name: string;
    type: KeywordEvent;
    loaded: boolean;
    cache: Map<string, CommandStruct>;

    async trigger(msg: Message) {
        if (!this.loaded) {
            this.loadCommands();
            this.loaded = true;
        }

        const message = new CustomMessage(msg);
        if (message.hasPrefix()) {
            const args = msg.content.split(' ');
            const command = this.cache.get(args[0].replace(message.client.prefix, ''));

            if (command && !message.self.isBot) {
                (command as CommandStruct).trigger({
                    message,
                    client: message.client,
                    args: args.slice(1)
                });
            }
        }
    }

    loadCommands() {
        fs.readdirSync(`src/plugins/commands/`)
            .forEach(folder => {
                    fs.readdirSync(`src/plugins/commands/${folder}`)
                    .forEach(file => {
                        // Catch only .js files (because the loaded files are from the dist folder)
                        file = file.replace('.ts', '.js');

                        // Requiring the module 
                        const required: { default?: CommandStruct, Command?: CommandStruct } = require(path.join(__dirname, '..', '..', '..', `commands/${folder}/${file}`));

                        // If the module has a default export, add it to the collection.
                        const command = required.Command as CommandStruct;
                        this.cache.set(command.name, command);
                        console.log('Command loaded: ', command.name);
                    }
                )
            })
    }
}

export default Event;