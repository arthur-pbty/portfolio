/// <reference types="@adonisjs/validator" />
/// <reference types="@adonisjs/logger/build/adonis-typings/logger" />
import { LoggerContract } from '@ioc:Adonis/Core/Logger';
import { DatabaseContract } from '@ioc:Adonis/Lucid/Database';
import { validator as validatorStatic } from '@ioc:Adonis/Core/Validator';
/**
 * Extends the validator by adding `unique` and `exists`
 */
export declare function extendValidator(validator: typeof validatorStatic, database: DatabaseContract, logger: LoggerContract): void;
