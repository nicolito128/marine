import * as fs from 'fs';

const cache = new Map<string, Plugin>();

export type Events = 'ready' | 'messageCreate' | 'messageUpdate' | 'messageDelete' | 'messageReactionAdd' | 'messageReactionRemove' | 'messageReactionRemoveAll' | 'messageReactionRemoveEmoji' | 'guildCreate' | 'guildDelete' | 'guildMemberAdd' | 'guildMemberUpdate' | 'guildMemberRemove' | 'guildBanAdd' | 'guildBanRemove' | 'guildEmojisUpdate' | 'guildRoleCreate' | 'guildRoleUpdate' | 'guildRoleDelete' | 'typingStart' | 'channelCreate' | 'channelUpdate' | 'channelDelete' | 'channelPinsUpdate' | 'threadCreate' | 'threadUpdate' | 'threadDelete' | 'threadListSync' | 'threadMemberUpdate' | 'threadMemberUpdate' | 'interactionCreate' | 'integrationCreate' | 'integrationUpdate' | 'integrationDelete' | 'inviteCreate' | 'inviteDelete' | 'autoModerationRuleCreate' | 'autoModerationRuleUpdate' | 'autoModerationRuleDelete' | 'autoModerationActionExecution' | 'stageInstanceCreate' | 'stageInstanceUpdate' | 'stageInstanceDelete' | 'guildScheduledEventCreate' | 'guildScheduledEventUpdate' | 'guildScheduledEventDelete' | 'guildScheduledEventUserAdd' | 'guildScheduledEventUserRemove' | 'raw' | 'webhooksUpdate' | 'userUpdate' | 'presenceUpdate' | 'debug';

export type PluginSchema = {
    name: string;
    description?: string;
};

// Function to be executed when an event is triggered.
export type Trigger<T extends TriggerArguments> = (...args: T) => unknown | Promise<unknown>;

// Arguments for triggered the function
export type TriggerArguments = [obj?: any, ddy?: any];

// Represents a Plugin that will be executed in some event of the library.
export abstract class Plugin implements PluginSchema{
    abstract name: string;
    abstract description?: string;
    abstract type: Events;
    abstract trigger: Trigger<TriggerArguments>;
}

// Load the events in the events folder into PluginCollection.
export function LoadEvents(event: Events) {
    cache.clear();

    fs.readdirSync(`src/plugins/events/${event}`)
        .forEach(folder => {
            fs.readdirSync(`src/plugins/events/${event}/${folder}`)
                .forEach(file => {
                    // Catch only .js files (because the loaded files are from the dist folder)
                    file = file.replace('.ts', '.js');

                    // Requiring the module 
                    const required: { default?: Plugin, Event?: Plugin } = require(__dirname + `/../../src/plugins/events/${event}/${folder}/${file}`);

                    // If the module has a default export, add it to the collection.
                    const plugin = required.Event as Plugin;

                    // Sets the new event.
                    cache.set(`${plugin.type}/${plugin.name}`, plugin);
                }
            )
        })
}

// Catch an event and execute the plugins that are listening to it.
export function TriggerEvents(event: Events, ...args: TriggerArguments) {
    cache.forEach((plugin) => {
        if (plugin.type === event) {
            plugin.trigger(...args);
        }
    })
}