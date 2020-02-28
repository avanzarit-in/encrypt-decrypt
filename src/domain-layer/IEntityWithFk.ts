export interface IEntityWithFk<T, Y> {
    getJson: () => string;
    getEntity: () => T;
    getFk: () => Y;
}

export type IEntityConstructor<T, Y> = new (entityModel: T, fk: Y) => IEntityWithFk<T, Y>;

export function createEntity<T, Y>(constructor: IEntityConstructor<T, Y>, entityModel: T, fk: Y): IEntityWithFk<T, Y> {
    return new constructor(entityModel, fk);
}

