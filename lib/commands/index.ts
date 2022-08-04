import { CreateApplicationCommand, Interaction } from '@biscuitland/core';
import CustomMessage from '../../lib/messages';
import { Client } from '../../src/client';

// Represents essential data for a command.
export type CommandSchema = {
    name: string;
    description: string;
    usage: string;
    aliases: string[];
    examples: string[];
    category: string;
    arguments: ArgumentSchema[];
    ownerOnly: boolean;
    permissions: number;
    cooldown: number;
    slash: CreateApplicationCommand;
};

// Represents the arguments of a command.
export type ArgumentSchema = {
    name: string;
    description?: string;
    required?: boolean;
    type?: string;
};

// Represents the arguments of a command trigger.
export type CommandTriggerArgs = {
    message: CustomMessage;
    args: string[];
    client: Client;
}

// Function to be called when a command is triggered.
export type CommandTrigger = (args: CommandTriggerArgs) => void | Promise<void>;
export type InteractionSlashTrigger = (client: Client, interaction: Interaction) => void | Promise<void>;

// Represents a command common implementation.
export abstract class CommandStruct implements Partial<CommandSchema> {
    abstract name: string;
    abstract description?: string;
    abstract usage?: string;
    abstract aliases?: string[];
    abstract examples?: string[];
    abstract category?: string;
    abstract arguments?: ArgumentSchema[];
    abstract ownerOnly?: boolean;
    abstract permissions?: number;
    abstract cooldown?: number;
    abstract slash?: CreateApplicationCommand;
    abstract trigger(args: CommandTriggerArgs): void | Promise<void>;
    abstract interaction?: (client: Client, int: Interaction) => void | Promise<void>;
}