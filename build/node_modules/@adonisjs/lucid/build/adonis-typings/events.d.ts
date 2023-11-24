declare module '@ioc:Adonis/Core/Event' {
    import { DbQueryEventNode } from '@ioc:Adonis/Lucid/Database';
    interface EventsList {
        'db:query': DbQueryEventNode;
    }
}
