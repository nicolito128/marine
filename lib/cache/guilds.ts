import { MemoryCacheAdapter } from "@biscuitland/cache";
import { Guild } from '@biscuitland/core';

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