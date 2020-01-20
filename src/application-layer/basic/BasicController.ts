import { IController } from '../IController';
import { Request, Response, NextFunction } from 'express';
import { createEntity } from './../../domain-layer/IEntity';
import { BasicEntity } from './../../domain-layer/BasicEntity/BasicEntity';
import { BasicEntityModel } from './../../domain-layer/BasicEntity/BasicEntityModel';
import { IEntity } from './../../domain-layer/IEntity';
import { BasicService } from './../basic/BasicService';
import { BasicRepository } from '../../infrastructure-layer/BasicRepository';

export class BasicController implements IController<BasicEntityModel, BasicEntity, BasicRepository, BasicService> {
    private basicService: BasicService;

    public constructor( basicService: BasicService) {
        this.basicService = basicService;
    }
    public create(req: Request, res: Response, next: NextFunction): void {
        const entity: IEntity<BasicEntityModel> = createEntity(BasicEntity, new BasicEntityModel());
        this.basicService.create(entity as BasicEntity);
        const entityModel: BasicEntityModel = entity.queryParam();

        throw new Error('Method not implemented.');
    }

    public delete(req: Request, res: Response, next: NextFunction): void {
        throw new Error('Method not implemented.');
    }

    public update(req: Request, res: Response, next: NextFunction): void {
        throw new Error('Method not implemented.');
    }

    public list(req: Request, res: Response, next: NextFunction): void {
        throw new Error('Method not implemented.');
    }

    public fetch(req: Request, res: Response, next: NextFunction): void {
        throw new Error('Method not implemented.');
    }
}


