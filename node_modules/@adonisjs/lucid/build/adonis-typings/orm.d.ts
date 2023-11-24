declare module '@ioc:Adonis/Lucid/Orm' {
    import { SimplePaginatorMetaKeys } from '@ioc:Adonis/Lucid/Database';
    const SnakeCaseNamingStrategy: {
        new (): NamingStrategyContract;
    };
    const scope: ScopeFn;
    const BaseModel: LucidModel;
    /**
     * Relationships
     */
    const hasOne: HasOneDecorator;
    const belongsTo: BelongsToDecorator;
    const hasMany: HasManyDecorator;
    const manyToMany: ManyToManyDecorator;
    const hasManyThrough: HasManyThroughDecorator;
    /**
     * Hooks
     */
    const beforeSave: HooksDecorator;
    const afterSave: HooksDecorator;
    const beforeCreate: HooksDecorator;
    const afterCreate: HooksDecorator;
    const beforeUpdate: HooksDecorator;
    const afterUpdate: HooksDecorator;
    const beforeDelete: HooksDecorator;
    const afterDelete: HooksDecorator;
    const beforeFind: HooksDecorator;
    const afterFind: HooksDecorator;
    const beforeFetch: HooksDecorator;
    const afterFetch: HooksDecorator;
    const beforePaginate: HooksDecorator;
    const afterPaginate: HooksDecorator;
    const ModelPaginator: {
        namingStrategy: {
            paginationMetaKeys(): SimplePaginatorMetaKeys;
        };
        new <Row extends LucidRow>(total: number, perPage: number, currentPage: number, ...rows: Row[]): ModelPaginatorContract<Row>;
    };
    /**
     * Columns and computed
     */
    const column: ColumnDecorator & {
        date: DateColumnDecorator;
        dateTime: DateTimeColumnDecorator;
    };
    const computed: ComputedDecorator;
}
