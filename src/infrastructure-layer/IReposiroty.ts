
import { IEntity } from './../domain-layer/IEntity';

export interface IRepository<K, T extends IEntity<K>> {
    create: (entity: T) => void;
    delete: (entity: T) => void;
    update: (entity: T) => void;
    findAll: () => Promise<K[]>;
    findOne: (entity: T) => Promise<K>;
}

// tslint:disable-next-line: max-line-length
export type IRepositoryConstructor<T, K extends IEntity<T>> = new () => IRepository<T, K>;

// tslint:disable-next-line: max-line-length
export function createRepository<T, K extends IEntity<T>>(constructor: IRepositoryConstructor<T, K>): IRepository<T, K> {
  return new constructor();
}
