import  { Events } from '@biscuitland/core';
import { join } from 'path';
import * as fs from 'fs';

const cache = new Map<string, Plugin>();

export type KeywordEvent = keyof Events;

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
    abstract type: KeywordEvent;
    abstract trigger: Trigger<TriggerArguments>;
}

// Load the events in the events folder into PluginCollection.
export function loadEvents(event: KeywordEvent) {
    let loaded = false;

    return () => {
        if (!loaded) {
            cache.clear();
            
            fs.readdirSync(`src/plugins/events/${event}`).forEach(folder => {
                fs.readdirSync(`src/plugins/events/${event}/${folder}`)
                    .forEach(file => {
                        // Catch only .js files (because the loaded files are from the dist folder)
                        file = file.replace('.ts', '.js');

                        // Requiring the module 
                        const required: { default?: Plugin, Event?: Plugin } = require(join(__dirname, '..', '..', `src/plugins/events/${event}/${folder}/${file}`));

                        // If the module has a default export, add it to the collection.
                        const plugin = required.Event as Plugin;

                        // Sets the new event.
                        cache.set(`${plugin.type}/${plugin.name}`, plugin);
                    })
                });

            loaded = true;
        }
    }
}

// Catch an event and execute the plugins that are listening to it.
export function triggerEvents(event: KeywordEvent, ...args: TriggerArguments) {
    cache.forEach((plugin) => {
        if (plugin.type === event) {
            plugin.trigger(...args);
        }
    })
}