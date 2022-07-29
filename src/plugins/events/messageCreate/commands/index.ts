import * as fs from 'fs';
import * as biscuit from '@oasisjs/biscuit/biscuit';
import CustomMessage from '../../../../../lib/messages/index';
import { CommandStruct } from '../../../commands';
import { Events, Plugin, PluginConfig } from '../../../plugins';

const CommandCollection = new Map<string, CommandStruct>();

export const Event = new class implements Plugin {
    constructor() {
        this.config = { name: 'Command Handler' };
        this.type = 'messageCreate';
        this.loaded = false;
    }

    config: PluginConfig;
    type: Events;
    loaded: boolean;

    async trigger(msg: biscuit.Message) {
        if (!this.loaded) {
            this.loadCommands();
            this.loaded = true;
        }

        const message = new CustomMessage(msg);
        if (message.hasPrefix()) {
            const args = msg.content.split(' ');
            const command = CommandCollection.get(args[0].replace(message.client.prefix, ''));

            if (command && !msg.isBot) {
                await command.trigger({
                    message: message,
                    args: args.slice(1),
                    client: message.client,
                    cache: message.client.cache
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
                        const required: { default?: CommandStruct, Command?: CommandStruct } = require(__dirname + `/../../../commands/${folder}/${file}`);

                        // If the module has a default export, add it to the collection.
                        const command = required.Command as CommandStruct;
                        CommandCollection.set(command.name, command);
                        console.log('Command loaded: ', command.name);
                    }
                )
            })
    }
}

export default Event;