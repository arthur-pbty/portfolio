/// <reference types="@adonisjs/logger/build/adonis-typings/logger" />
import { LoggerContract } from '@ioc:Adonis/Core/Logger';
/**
 * Custom knex logger that uses adonisjs logger under the
 * hood.
 */
export declare class Logger {
    name: string;
    adonisLogger: LoggerContract;
    warn: any;
    error: any;
    deprecate: any;
    debug: any;
    constructor(name: string, adonisLogger: LoggerContract);
}
