/// <reference types="@adonisjs/application/build/adonis-typings" />
import { ReplContract } from '@ioc:Adonis/Addons/Repl';
import { ApplicationContract } from '@ioc:Adonis/Core/Application';
/**
 * Define REPL bindings
 */
export declare function defineReplBindings(app: ApplicationContract, Repl: ReplContract): void;
