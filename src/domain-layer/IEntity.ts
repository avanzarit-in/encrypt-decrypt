export interface IEntity<T> {
    getJson: () => string;
    getEntity: () => T;
}

export type IEntityConstructor<T> = new (entityModel: T) => IEntity<T>;

export function createEntity<T>(constructor: IEntityConstructor<T>, entityModel: T): IEntity<T> {
    return new constructor(entityModel);
}

