import { IController } from '../IController';
import { Request, Response, NextFunction } from 'express';
import { createEntity } from '../../domain-layer/IEntity';
import { UserEntity } from '../../domain-layer/UserEntity/UserEntity';
import { UserEntityModel } from '../../domain-layer/UserEntity/UserEntityModel';
import { IEntity } from '../../domain-layer/IEntity';
import { UserService } from './UserService';
import { UserRepository } from '../../infrastructure-layer/UserRepository';

export class UserController implements IController<UserEntityModel, UserEntity, UserRepository, UserService> {
    private userService: UserService;

    public constructor( userService: UserService) {
        this.userService = userService;
    }
    public create(req: Request, res: Response, next: NextFunction): void {
        const entity: IEntity<UserEntityModel> = createEntity(UserEntity, new UserEntityModel());
        this.userService.create(entity as UserEntity);
        const entityModel: UserEntityModel = entity.queryParam();

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


