import { GatewayIntents } from '@biscuitland/api-types';
import { DefaultRestAdapter } from '@biscuitland/rest';
import { GuildCache } from '../lib/cache/index';
import { CommandStruct } from '../lib/commands';
import { Biscuit } from '@biscuitland/core';
import * as process from 'process';
import Fastify from 'fastify';
import { join } from 'path';
import * as fs from 'fs';
import 'dotenv/config';

const intents = GatewayIntents.MessageContent |
    GatewayIntents.GuildMessages |
    GatewayIntents.Guilds;

const rest = new DefaultRestAdapter({
    url: `localhost:${process.env['REST_PORT']!}`,
    token: process.env['MARINE_TOKEN']!,
    version: 10,
});

const app = Fastify({});

app.all("*", async (req, reply) => {
    let response: unknown;

    switch (req.method) {
    case "GET":
        response = await rest.get(req.url, req.body);
    break;
    case "POST":
        response = await rest.post(req.url, req.body);
    break;
    case "PUT":
        response = await rest.put(req.url, req.body);
    break;
    case "PATCH":
        response = await rest.patch(req.url, req.body);
    break;
    case "DELETE":
        response = await rest.delete(req.url, req.body);
    break;
    }

    if (response) {
        reply.status(200).send({ status: 200, data: response });
    } else {
        reply.status(204).send({ status: 204, data: null });
    }
});

export class Client extends Biscuit {    
    constructor() {
        super({ token: process.env.MARINE_TOKEN || "", rest, intents })

        this.prefix = process.env.PREFIX || "m.";
        this.intents = intents;
        this.guilds = new GuildCache();
        this.commands = new Map<string, CommandStruct>();
        this.commandsLoaded = false;
    }

    readonly prefix: string;
    readonly intents: number;
    readonly guilds: GuildCache;
    readonly commands: Map<string, CommandStruct>;
    commandsLoaded: boolean;

    override async start() {
        console.log("Open rest on port %d", Number.parseInt(process.env['REST_PORT']!));
        app.listen({ port: Number.parseInt(process.env['REST_PORT']!) });

        this.loadCommands();

        super.start();
    }

    loadCommands() {
        if (!this.commandsLoaded) {
            fs.readdirSync(`src/plugins/commands/`)
            .forEach(folder => {
                    fs.readdirSync(`src/plugins/commands/${folder}`)
                    .forEach(file => {
                        // Catch only .js files (because the loaded files are from the dist folder)
                        file = file.replace('.ts', '.js');

                        // Requiring the module 
                        const required: { default?: CommandStruct, Command?: CommandStruct } = require(join(__dirname, `plugins/commands/${folder}/${file}`));

                        if (required?.Command) {
                            const command = required.Command as CommandStruct;
                            this.commands.set(command.name, command);
                            console.log('Command loaded: ', command.name);
                        }
                    }
                )
            });

            this.commandsLoaded = true;
        }
    }
}

const client = new Client();
export default client;