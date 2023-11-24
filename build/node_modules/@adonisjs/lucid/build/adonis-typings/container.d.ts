declare module '@ioc:Adonis/Core/Application' {
    import * as Orm from '@ioc:Adonis/Lucid/Orm';
    import Migrator from '@ioc:Adonis/Lucid/Migrator';
    import { DatabaseContract } from '@ioc:Adonis/Lucid/Database';
    import { FactoryManagerContract } from '@ioc:Adonis/Lucid/Factory';
    import { SchemaConstructorContract } from '@ioc:Adonis/Lucid/Schema';
    import { SeederConstructorContract } from '@ioc:Adonis/Lucid/Seeder';
    interface ContainerBindings {
        'Adonis/Lucid/Database': DatabaseContract;
        'Adonis/Lucid/Factory': FactoryManagerContract;
        'Adonis/Lucid/Orm': typeof Orm;
        'Adonis/Lucid/Migrator': typeof Migrator;
        'Adonis/Lucid/Schema': SchemaConstructorContract;
        'Adonis/Lucid/Seeder': SeederConstructorContract;
    }
}
