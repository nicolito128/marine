import { Session, GatewayIntents, enableCache, SessionCache } from '@oasisjs/biscuit';
import LoadEnv from '../lib/env/index';

const [ env ] = LoadEnv();
const intents = GatewayIntents.MessageContent | 
                GatewayIntents.Guilds | 
                GatewayIntents.GuildMessages | 
                GatewayIntents.GuildMembers | 
                GatewayIntents.Guilds |
                GatewayIntents.GuildScheduledEvents;

export class Client extends Session {
    constructor() {
        super({ token: env.MARINE_TOKEN || "", intents });
        this.prefix = env.PREFIX || "m.";
        this.intents = intents;
        this.cache = enableCache(this);
    }

    readonly prefix: string;
    readonly intents: number;
    readonly cache: SessionCache;
}

const client = new Client();
export default client;