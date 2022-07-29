import * as fs from "fs";

export const PluginCollection: Map<string, Plugin[]> = new Map();

export type Events = 'ready' | 'messageCreate' | 'messageUpdate' | 'messageDelete' | 'messageReactionAdd' | 'messageReactionRemove' | 'messageReactionRemoveAll' | 'messageReactionRemoveEmoji' | 'guildCreate' | 'guildDelete' | 'guildMemberAdd' | 'guildMemberUpdate' | 'guildMemberRemove' | 'guildBanAdd' | 'guildBanRemove' | 'guildEmojisUpdate' | 'guildRoleCreate' | 'guildRoleUpdate' | 'guildRoleDelete' | 'typingStart' | 'channelCreate' | 'channelUpdate' | 'channelDelete' | 'channelPinsUpdate' | 'threadCreate' | 'threadUpdate' | 'threadDelete' | 'threadListSync' | 'threadMemberUpdate' | 'threadMemberUpdate' | 'interactionCreate' | 'integrationCreate' | 'integrationUpdate' | 'integrationDelete' | 'inviteCreate' | 'inviteDelete' | 'autoModerationRuleCreate' | 'autoModerationRuleUpdate' | 'autoModerationRuleDelete' | 'autoModerationActionExecution' | 'stageInstanceCreate' | 'stageInstanceUpdate' | 'stageInstanceDelete' | 'guildScheduledEventCreate' | 'guildScheduledEventUpdate' | 'guildScheduledEventDelete' | 'guildScheduledEventUserAdd' | 'guildScheduledEventUserRemove' | 'raw' | 'webhooksUpdate' | 'userUpdate' | 'presenceUpdate' | 'debug';

export type PluginConfig = {
    name: string;
    description?: string;
};

// Function to be executed when an event is triggered.
export type Trigger<T extends TriggerArguments> = (...args: T) => unknown | Promise<unknown>;

// Arguments for triggered the function
export type TriggerArguments = [obj?: any, ddy?: any];

// Represents a Plugin that will be executed in some event of the library.
export abstract class Plugin {
    abstract config: PluginConfig;
    abstract type: Events;
    abstract trigger: Trigger<TriggerArguments>;
}

// Load the events in the events folder into PluginCollection.
export function LoadEvents(event: Events) {
    fs.readdirSync(`src/plugins/events/${event}`)
        .forEach(folder => {
            fs.readdirSync(`src/plugins/events/${event}/${folder}`)
                .forEach(async file => {
                    file = file.replace('.ts', '.js');

                    const required: { default?: Plugin, Event?: Plugin } = await import(__dirname + `/events/${event}/${folder}/${file}`);
                    const plugin = required.default as Plugin;

                    const arr = PluginCollection.get(event) || [];
                    arr.push(plugin)

                    PluginCollection.set(event || "", arr);
                }
            )
        })
}

// Catch an event and execute the plugins that are listening to it.
export function TriggerEvents(event: Events, ...args: TriggerArguments) {
    PluginCollection.get(event)?.forEach(plugin => plugin.trigger(...args))
}