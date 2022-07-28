import { Session, GatewayIntents, enableCache, SessionCache } from '@oasisjs/biscuit';
import LoadEnv from '../lib/env/index';

const [ env ] = LoadEnv();
const intents = GatewayIntents.MessageContent | GatewayIntents.Guilds | GatewayIntents.GuildMessages;

export class Client extends Session {

    constructor() {
        super({ token: env.TOKEN || "", intents });
        this.prefix = env.PREFIX || "!";
        this.intents = intents;
        this.cache = enableCache(this as Session);
    }

    readonly prefix: string;
    readonly intents: number;
    readonly cache: SessionCache;
}

export default Client;