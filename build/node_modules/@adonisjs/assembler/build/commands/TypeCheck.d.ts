import { BaseCommand } from '@adonisjs/core/build/standalone';
/**
 * TypeCheck project without writing the compiled output to the disk
 */
export default class TypeCheck extends BaseCommand {
    static commandName: string;
    static description: string;
    /**
     * Path to the TypeScript project configuration file. Defaults to "tsconfig.json"
     */
    tsconfig: string;
    /**
     * Invoked automatically by ace
     */
    run(): Promise<void>;
}
