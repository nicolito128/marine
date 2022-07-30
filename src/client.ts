import { Session } from '@biscuitland/core';
import { GatewayIntents } from '@biscuitland/api-types';
import { GuildCache } from '../lib/cache/index';
import LoadEnv from '../lib/env/index';

const [ env ] = LoadEnv();
const intents = GatewayIntents.MessageContent | 
                GatewayIntents.Guilds | 
                GatewayIntents.GuildMessages | 
                GatewayIntents.GuildMembers | 
                GatewayIntents.Guilds |
                GatewayIntents.GuildScheduledEvents;

export class Client {    
    constructor() {
        this.session = new Session({ token: env.MARINE_TOKEN || "", intents });
        this.prefix = env.PREFIX || "m.";
        this.intents = intents;
        this.guilds = new GuildCache();
    }

    readonly session: Session
    readonly prefix: string;
    readonly intents: number;
    readonly guilds: GuildCache;
}

const client = new Client();
export default client;