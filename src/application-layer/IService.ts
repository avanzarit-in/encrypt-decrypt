import { IEntity } from './../domain-layer/IEntity';
import { IRepository } from './../infrastructure-layer/IReposiroty';

export interface IService<T, K extends IEntity<T>, Z extends IRepository<T, K>> {
    create: (entity: K) => void;
    update: (entity: K) => void;
    delete: (entity: K) => void;
    findAll: () => void;
    fetch: (entity: K) => void;
}

// tslint:disable-next-line: max-line-length
export type IServiceConstructor<T, K extends IEntity<T>, Z extends IRepository<T, K>> = new (repository: Z) => IService<T, K, Z>;

// tslint:disable-next-line: max-line-length
export function createService<T, K extends IEntity<T>, Z extends IRepository<T, K>>(constructor: IServiceConstructor<T, K, Z>, repository: Z): IService<T, K, Z> {
    return new constructor(repository);
}
