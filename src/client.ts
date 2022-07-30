import { GatewayIntents } from '@biscuitland/api-types';
import { GuildCache } from '../lib/cache/index';
import { Session } from '@biscuitland/core';
import * as process from 'process';
import { config } from 'dotenv';

const intents = GatewayIntents.MessageContent |
    GatewayIntents.GuildMessages |
    GatewayIntents.Guilds;

export class Client extends Session {    
    constructor() {
        if (!process.env.MARINE_TOKEN || !process.env.PREFIX) {
            config({ debug: true });
        }

        super({ token: process.env.MARINE_TOKEN || "", intents })

        this.prefix = process.env.PREFIX || "m.";
        this.intents = intents;
        this.guilds = new GuildCache();
    }

    readonly prefix: string;
    readonly intents: number;
    readonly guilds: GuildCache;
}

const client = new Client();
export default client;