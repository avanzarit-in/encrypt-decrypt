import { IController } from '../IController';
import { Request, Response, NextFunction } from 'express';
import { createEntity } from '../../domain-layer/IEntity';
import { UserEntity } from '../../domain-layer/UserEntity';
import { Users } from '../../infrastructure-layer/models/Users';
import { IEntity } from '../../domain-layer/IEntity';
import { UserService } from './UserService';
import { UserRepository } from '../../infrastructure-layer/UserRepository';
import CryptoUtils from './../../utils/CryptoUtils';
import { UpdateResult, DeleteResult, InsertResult } from 'typeorm';

export class UserController implements IController<Users, UserEntity, UserRepository, UserService> {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }


    public create(req: Request, res: Response, next: NextFunction): void {
        const model: Users = new Users();
        model.nuid = req.body.nuid;
        model.pin = CryptoUtils.encrypt(req.body.pin.toString());
        const entity: IEntity<Users> = createEntity(UserEntity, model);

        const dataListener = (result: InsertResult) => {
            this.userService.emit('CLEANUP');
            res.status(200).json(result);
        };

        const errorListener = (error: Error) => {
            this.userService.emit('CLEANUP');
            res.status(500).json({ error });
        };

        this.userService.once('CREATE_SUCCESS', dataListener).once('ERROR', errorListener).once('CLEANUP', () => {
            this.userService.removeListener('CREATE_SUCCESS', dataListener);
            this.userService.removeListener('ERROR', errorListener);
        });

        this.userService.create(entity as UserEntity);
    }


    public update(req: Request, res: Response, next: NextFunction): void {
        const model: Users = new Users();
        model.nuid = parseInt(req.params.nuid, 10);
        model.pin = CryptoUtils.encrypt(req.body.pin.toString());
        const entity: IEntity<Users> = createEntity(UserEntity, model);

        const dataListener = (result: UpdateResult) => {
            this.userService.emit('CLEANUP');
            res.status(200).json(result);
        }

        const errorListener = (error: Error) => {
            this.userService.emit('CLEANUP');
            res.status(500).json({ error });
        }

        this.userService.on('UPDATE_SUCCESS', dataListener).on('ERROR', errorListener).once('CLEANUP', () => {
            this.userService.removeListener('UPDATE_SUCCESS', dataListener);
            this.userService.removeListener('ERROR', errorListener);
        });

        this.userService.update(entity as UserEntity);
    }


    public list(req: Request, res: Response, next: NextFunction): void {

        const dataListener = (result: Users[]) => {
            const data = result.map((item: Users) => {
                item.pin = CryptoUtils.decrypt(item.pin);
                return item;
            });
            this.userService.emit('CLEANUP');
            res.status(200).json(data);
        };

        const errorListener = (error: Error) => {
            this.userService.emit('CLEANUP');
            res.status(500).json({ error });
        };

        this.userService.on('FIND_SUCCESS', dataListener).on('ERROR', errorListener).once('CLEANUP', () => {
            this.userService.removeListener('FIND_SUCCESS', dataListener);
            this.userService.removeListener('ERROR', errorListener);
        });
        this.userService.findAll();

    }

    public fetch(req: Request, res: Response, next: NextFunction): void {
        const model: Users = new Users();
        model.nuid = parseInt(req.params.nuid, 10);
        const entity: IEntity<Users> = createEntity(UserEntity, model);

        const dataListener = (result: Users) => {
            result.pin = CryptoUtils.decrypt(result.pin);
            this.userService.emit('CLEANUP');
            res.status(200).json(result);
        };

        const errorListener = (error: Error) => {
            this.userService.emit('CLEANUP');
            res.status(500).json({ error });
        };

        this.userService.on('FETCH_SUCCESS', dataListener).once('ERROR', errorListener).once('CLEANUP', () => {
            this.userService.removeListener('FETCH_SUCCESS', dataListener);
            this.userService.removeListener('ERROR', errorListener);
        });

        this.userService.fetch(entity as UserEntity);
    }

    public delete(req: Request, res: Response, next: NextFunction): void {
        const model: Users = new Users();
        model.nuid = parseInt(req.params.nuid, 10);
        const entity: IEntity<Users> = createEntity(UserEntity, model);

        const dataListener = (result: DeleteResult) => {
            this.userService.emit('CLEANUP');
            res.status(200).json(result);
        }

        const errorListener = (error: Error) => {
            this.userService.emit('CLEANUP');
            res.status(500).json({ error });
        }

        this.userService.on('DELETE_SUCCESS', dataListener).on('ERROR', errorListener).once('CLEANUP', () => {
            this.userService.removeListener('DELETE_SUCCESS', dataListener);
            this.userService.removeListener('ERROR', errorListener);
        });

        this.userService.delete(entity as UserEntity);
    }

}


