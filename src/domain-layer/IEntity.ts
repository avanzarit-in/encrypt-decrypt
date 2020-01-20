export interface IEntity<T> {
    updateParam: () => T;
    queryParam: () => T;
}

export type IEntityConstructor<T> = new (entityModel: T) => IEntity<T>;

export function createEntity<T>(constructor: IEntityConstructor<T>, entityModel: T): IEntity<T> {
    return new constructor(entityModel);
}

