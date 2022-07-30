import { Session, Guild } from '@biscuitland/core';
import { GatewayIntents } from '@biscuitland/api-types';
import { MemoryCacheAdapter } from '@biscuitland/cache';
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

export class GuildCache extends MemoryCacheAdapter {
    constructor() {
        super();
    }

    override set(id: string, guild: Guild) {
        return super.set(id, guild);
    }

    override get<Guild>(id: string) {
        return super.get<Guild>(id);
    }
}

const client = new Client();
export default client;