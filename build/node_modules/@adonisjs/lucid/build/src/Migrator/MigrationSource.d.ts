/// <reference path="../../adonis-typings/index.d.ts" />
/// <reference types="@adonisjs/application/build/adonis-typings" />
import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import { ConnectionConfig, FileNode } from '@ioc:Adonis/Lucid/Database';
/**
 * Migration source exposes the API to read the migration files
 * from disk for a given connection.
 */
export declare class MigrationSource {
    private config;
    private app;
    constructor(config: ConnectionConfig, app: ApplicationContract);
    /**
     * Returns an array of files inside a given directory. Relative
     * paths are resolved from the project root
     */
    private getDirectoryFiles;
    /**
     * Returns an array of migrations paths for a given connection. If paths
     * are not defined, then `database/migrations` fallback is used
     */
    private getMigrationsPath;
    /**
     * Returns an array of files for all defined directories
     */
    getMigrations(): Promise<FileNode<unknown>[]>;
}
