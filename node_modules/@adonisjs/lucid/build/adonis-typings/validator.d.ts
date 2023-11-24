/// <reference types="@adonisjs/validator" />
declare module '@ioc:Adonis/Core/Validator' {
    import { Rule } from '@ioc:Adonis/Core/Validator';
    type DbRowCheckOptions = {
        table: string;
        column: string;
        dateFormat?: string;
        connection?: string;
        caseInsensitive?: boolean;
        constraints?: {
            [key: string]: any;
        };
        where?: {
            [key: string]: any;
        };
        whereNot?: {
            [key: string]: any;
        };
    };
    interface Rules {
        exists(options: DbRowCheckOptions): Rule;
        unique(options: DbRowCheckOptions): Rule;
    }
}
