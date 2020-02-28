import { IController } from '../IController';
import { Request, Response, NextFunction } from 'express';
import { createEntity } from '../../domain-layer/IEntity';
import { PasswordEntity } from '../../domain-layer/PasswordEntity';
import { Passwords } from '../../infrastructure-layer/models/Passwords';
import { IEntity } from '../../domain-layer/IEntity';
import { PasswordService } from './PasswordService';
import { PasswordRepository } from '../../infrastructure-layer/PasswordRepository';
import CryptoUtils from './../../utils/CryptoUtils';

export class PasswordController implements IController<Passwords, PasswordEntity, PasswordRepository, PasswordService> {
    private PasswordService: PasswordService;

    public constructor(PasswordService: PasswordService) {
        this.PasswordService = PasswordService;
    }
    public create(req: Request, res: Response, next: NextFunction): void {
        const model: Passwords = new Passwords();
        model.nuid = req.body.nuid;
        model.pin = CryptoUtils.encrypt(req.body.pin.toString());
        const entity: IEntity<Passwords> = createEntity(PasswordEntity, model);

        this.PasswordService.once('CREATE_SUCCESS', () => {
            res.status(200).json({});
        }).once('ERROR', (error) => {

            res.status(500).json({ error });
        });

        this.PasswordService.create(entity as PasswordEntity);
    }


    public update(req: Request, res: Response, next: NextFunction): void {
        const model: Passwords = new Passwords();
        model.nuid = parseInt(req.params.nuid, 10);
        model.pin = CryptoUtils.encrypt(req.body.pin.toString());
        const entity: IEntity<Passwords> = createEntity(PasswordEntity, model);

        this.PasswordService.once('UPDATE_SUCCESS', (result) => {
            res.status(200).json(result);
        }).once('ERROR', (error) => {
            res.status(500).json({ error });
        });

        this.PasswordService.update(entity as PasswordEntity);
    }


    public list(req: Request, res: Response, next: NextFunction): void {

        const dataListener = (result: Passwords[]) => {
            const data = result.map((item: Passwords) => {
                item.pin = CryptoUtils.decrypt(item.pin);
                return item;
            });
            this.PasswordService.emit('CLEANUP');
            res.status(200).json(data);
        };

        const errorListener = (error: Error) => {
            this.PasswordService.emit('CLEANUP');
            res.status(500).json({ error });
        };

        this.PasswordService.on('FIND_SUCCESS', dataListener).on('ERROR', errorListener).once('CLEANUP', () => {
            this.PasswordService.removeListener('FIND_SUCCESS', dataListener);
            this.PasswordService.removeListener('ERROR', errorListener);
        });
        this.PasswordService.findAll();

    }

    public fetch(req: Request, res: Response, next: NextFunction): void {
        const model: Passwords = new Passwords();
        model.nuid = parseInt(req.params.nuid, 10);
        const entity: IEntity<Passwords> = createEntity(PasswordEntity, model);

        const dataListener = (result: Passwords) => {
            result.pin = CryptoUtils.decrypt(result.pin);
            this.PasswordService.emit('CLEANUP');
            res.status(200).json(result);
        };

        const errorListener = (error: Error) => {
            this.PasswordService.emit('CLEANUP');
            res.status(500).json({ error });
        };

        this.PasswordService.on('FETCH_SUCCESS', dataListener).once('ERROR', errorListener).once('CLEANUP', () => {
            this.PasswordService.removeListener('FETCH_SUCCESS', dataListener);
            this.PasswordService.removeListener('ERROR', errorListener);
        });

        this.PasswordService.fetch(entity as PasswordEntity);
    }

    public delete(req: Request, res: Response, next: NextFunction): void {
        throw new Error('Method not implemented.');
    }

}


