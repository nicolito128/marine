import { config, type DotenvConfigOptions, DotenvConfigOutput } from 'dotenv';
import * as process from 'process';

export type LoadEnvOutput = [typeof process.env, (DotenvConfigOutput | undefined)];

export function LoadEnv(options: DotenvConfigOptions = {debug: true}): LoadEnvOutput {
    if (process.env.MARINE_TOKEN || process.env.PREFIX) {
        return [process.env, undefined];
    }

    const configOutput: DotenvConfigOutput = config(options);
    return [process.env, configOutput];
}
export default LoadEnv;