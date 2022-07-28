import { config, type DotenvConfigOptions, DotenvConfigOutput } from 'dotenv';
import * as process from 'process';

export type LoadEnvOutput = [typeof process.env, DotenvConfigOutput];

export function LoadEnv(options: DotenvConfigOptions = {
    debug: true,
    override: true
}): LoadEnvOutput {
    const configOutput = config(options);
    return [process.env, configOutput];
}
export default LoadEnv;