
import { IEntity } from './../domain-layer/IEntity';

export interface IRepository<K, T extends IEntity<K>> {
    create: (entity: T) => K;
    delete: (entity: T) => K;
    update: (entity: T) => void;
    findAll: (entity: T) => void;
    findOne: (entity: T) => void;
}

// tslint:disable-next-line: max-line-length
export type IRepositoryConstructor<T, K extends IEntity<T>> = new () => IRepository<T, K>;

// tslint:disable-next-line: max-line-length
export function createRepository<T, K extends IEntity<T>>(constructor: IRepositoryConstructor<T, K>): IRepository<T, K> {
  return new constructor();
}
