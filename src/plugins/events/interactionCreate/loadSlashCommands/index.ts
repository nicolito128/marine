import type { KeywordEvent, Plugin } from '../../../../../lib/plugins';
import { Interaction } from '@biscuitland/core';
import { Client } from '../../../../client';
import { CommandStruct } from '../../../../../lib/commands';
import * as fs from 'fs';
import { join } from 'path';

export const Event = new class implements Plugin {
    constructor() {
        this.name ='Load Slash Commands';
        this.type = 'interactionCreate';
        this.cache = new Map<string, CommandStruct>();
        this.loadCommands();
    }
    
    name: string;
    type: KeywordEvent;
    cache: Map<string, CommandStruct>;

    async trigger(client: Client, interaction: Interaction) {
        if (interaction.isCommand()) {
            const cmd = this.cache.get(interaction.commandName);
            if (cmd) {
                if (cmd.interaction) {
                    cmd.interaction(client, interaction);
                }
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
                        const required: { default?: CommandStruct, Command?: CommandStruct } = require(join(__dirname, '..', '..', '..', `commands/${folder}/${file}`));

                        if (required?.Command) {
                            if (required?.Command?.slash) {
                                const command = required.Command as CommandStruct;
                                this.cache.set(command.name, command);
                            }
                        }
                    }
                )
            })
    }
}

export default Event;