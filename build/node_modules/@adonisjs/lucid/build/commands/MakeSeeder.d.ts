import { BaseCommand } from '@adonisjs/core/build/standalone';
export default class MakeSeeder extends BaseCommand {
    static commandName: string;
    static description: string;
    /**
     * The name of the seeder file.
     */
    name: string;
    /**
     * Execute command
     */
    run(): Promise<void>;
}
