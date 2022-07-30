import CustomMessage from '../../lib/messages';
import { Client } from '../client';

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
};

export type ArgumentSchema = {
    name: string;
    description?: string;
    required?: boolean;
    type?: string;
};

export type CommandTriggerArgs = {
    message: CustomMessage;
    args: string[];
    client: Client;
}

export type CommandTrigger = (args: CommandTriggerArgs) => void | Promise<void>;

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
    abstract trigger(args: CommandTriggerArgs): void | Promise<void>;
}