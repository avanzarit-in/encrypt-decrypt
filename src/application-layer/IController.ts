import { Request, Response, NextFunction } from 'express';
import { IService } from './../application-layer/IService';
import { IEntity } from './../domain-layer/IEntity';
import { IRepository } from './../infrastructure-layer/IReposiroty';

export interface IController<T, Z, Y, K> {
    create(req: Request, res: Response, next: NextFunction): void;
    delete(req: Request, res: Response, next: NextFunction): void;
    update(req: Request, res: Response, next: NextFunction): void;
    list(req: Request, res: Response, next: NextFunction): void;
    fetch(req: Request, res: Response, next: NextFunction): void;
}


// tslint:disable-next-line: max-line-length
export type IControllerConstructor<T, Z extends IEntity<T>, Y extends IRepository<T, Z>, K extends IService<T, Z, Y>> = new (service: K) => IController<T, Z, Y, K>;

// tslint:disable-next-line: max-line-length
export function createController<T, Z extends IEntity<T>, Y extends IRepository<T, Z>, K extends IService<T, Z, Y>>(constructor: IControllerConstructor<T, Z, Y, K>, service: K): IController<T, Z, Y, K> {
    return new constructor(service);
}

