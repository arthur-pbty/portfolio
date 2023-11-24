export { table, logger, sticker, instructions, isInteractive, supportsColors, testingRenderer, tasks as tasksUi, } from '@poppinss/cliui';
import { PromptContract } from '@poppinss/prompts';
import './src/disableLogger';
/**
 * Returns a new instance of prompt. Also we lazy load the prompts
 */
declare function getPrompt(): PromptContract;
/**
 * Sharing the sink version, since sink is mainly passed as a reference by
 * the cli
 */
export declare const sinkVersion: string;
export { getPrompt };
export * as files from './src/Files';
export * as tasks from './src/Tasks';
export * as utils from './src/Utils';
