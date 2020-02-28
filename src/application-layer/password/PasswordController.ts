import { IController } from '../IController';
import { Request, Response, NextFunction } from 'express';
import { createEntity } from '../../domain-layer/IEntity';
import { PasswordEntity } from '../../domain-layer/PasswordEntity';
import { Passwords } from '../../infrastructure-layer/models/Passwords';
import { IEntity } from '../../domain-layer/IEntity';
import { PasswordService } from './PasswordService';
import { PasswordRepository } from '../../infrastructure-layer/PasswordRepository';
import CryptoUtils from './../../utils/CryptoUtils';
import { UpdateResult, DeleteResult } from 'typeorm';

export class PasswordController implements IController<Passwords, PasswordEntity, PasswordRepository, PasswordService> {
    private passwordService: PasswordService;

    public constructor(passwordService: PasswordService) {
        this.passwordService = passwordService;
    }
    public create(req: Request, res: Response, next: NextFunction): void {
        const model: Passwords = new Passwords();
        model.nuid = req.body.nuid;
        model.pin = CryptoUtils.encrypt(req.body.pin.toString());
        const entity: IEntity<Passwords> = createEntity(PasswordEntity, model);

        this.passwordService.once('CREATE_SUCCESS', () => {
            res.status(200).json({});
        }).once('ERROR', (error) => {

            res.status(500).json({ error });
        });

        this.passwordService.create(entity as PasswordEntity);
    }


    public update(req: Request, res: Response, next: NextFunction): void {
        const model: Passwords = new Passwords();
        model.nuid = parseInt(req.params.nuid, 10);
        model.pin = CryptoUtils.encrypt(req.body.pin.toString());
        const entity: IEntity<Passwords> = createEntity(PasswordEntity, model);

        const dataListener = (result: UpdateResult) => {
            this.passwordService.emit('CLEANUP');
            res.status(200).json(result);
        }

        const errorListener = (error: Error) => {
            this.passwordService.emit('CLEANUP');
            res.status(500).json({ error });
        }

        this.passwordService.on('UPDATE_SUCCESS', dataListener).on('ERROR', errorListener).once('CLEANUP', () => {
            this.passwordService.removeListener('UPDATE_SUCCESS', dataListener);
            this.passwordService.removeListener('ERROR', errorListener);
        });

        this.passwordService.update(entity as PasswordEntity);
    }


    public list(req: Request, res: Response, next: NextFunction): void {

        const dataListener = (result: Passwords[]) => {
            const data = result.map((item: Passwords) => {
                item.pin = CryptoUtils.decrypt(item.pin);
                return item;
            });
            this.passwordService.emit('CLEANUP');
            res.status(200).json(data);
        };

        const errorListener = (error: Error) => {
            this.passwordService.emit('CLEANUP');
            res.status(500).json({ error });
        };

        this.passwordService.on('FIND_SUCCESS', dataListener).on('ERROR', errorListener).once('CLEANUP', () => {
            this.passwordService.removeListener('FIND_SUCCESS', dataListener);
            this.passwordService.removeListener('ERROR', errorListener);
        });
        this.passwordService.findAll();

    }

    public fetch(req: Request, res: Response, next: NextFunction): void {
        const model: Passwords = new Passwords();
        model.nuid = parseInt(req.params.nuid, 10);
        const entity: IEntity<Passwords> = createEntity(PasswordEntity, model);

        const dataListener = (result: Passwords) => {
            result.pin = CryptoUtils.decrypt(result.pin);
            this.passwordService.emit('CLEANUP');
            res.status(200).json(result);
        };

        const errorListener = (error: Error) => {
            this.passwordService.emit('CLEANUP');
            res.status(500).json({ error });
        };

        this.passwordService.on('FETCH_SUCCESS', dataListener).once('ERROR', errorListener).once('CLEANUP', () => {
            this.passwordService.removeListener('FETCH_SUCCESS', dataListener);
            this.passwordService.removeListener('ERROR', errorListener);
        });

        this.passwordService.fetch(entity as PasswordEntity);
    }

    public delete(req: Request, res: Response, next: NextFunction): void {
        const model: Passwords = new Passwords();
        model.nuid = parseInt(req.params.nuid, 10);
        const entity: IEntity<Passwords> = createEntity(PasswordEntity, model);

        const dataListener = (result: DeleteResult) => {
            this.passwordService.emit('CLEANUP');
            res.status(200).json(result);
        }

        const errorListener = (error: Error) => {
            this.passwordService.emit('CLEANUP');
            res.status(500).json({ error });
        }

        this.passwordService.on('DELETE_SUCCESS', dataListener).on('ERROR', errorListener).once('CLEANUP', () => {
            this.passwordService.removeListener('DELETE_SUCCESS', dataListener);
            this.passwordService.removeListener('ERROR', errorListener);
        });

        this.passwordService.delete(entity as PasswordEntity);
    }

}


