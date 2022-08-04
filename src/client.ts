import { GatewayIntents } from '@biscuitland/api-types';
import { GuildCache } from '../lib/cache/index';
import { Biscuit } from '@biscuitland/core';
import * as process from 'process';
import 'dotenv/config';

const intents = GatewayIntents.MessageContent |
    GatewayIntents.GuildMessages |
    GatewayIntents.Guilds;

export class Client extends Biscuit {    
    constructor() {
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