import { Session, GatewayIntents } from '@oasisjs/biscuit';
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
        super({ token: env.TOKEN || "", intents });
        this.prefix = env.PREFIX || "!";
        this.intents = intents;
    }

    readonly prefix: string;
    readonly intents: number;
}

export default Client;