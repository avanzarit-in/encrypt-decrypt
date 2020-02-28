import { IController } from '../IController';
import { Request, Response, NextFunction } from 'express';
import { createEntity } from '../../domain-layer/IEntity';
import { SecretEntity } from '../../domain-layer/SecretEntity';
import { Secrets } from '../../infrastructure-layer/models/Secrets';
import { IEntity } from '../../domain-layer/IEntity';
import { SecretService } from './SecretService';
import { SecretRepository } from '../../infrastructure-layer/SecretRepository';
import CryptoUtils from './../../utils/CryptoUtils';

export class SecretController implements IController<Secrets, SecretEntity, SecretRepository, SecretService> {
    private SecretService: SecretService;

    public constructor(SecretService: SecretService) {
        this.SecretService = SecretService;
    }
    public create(req: Request, res: Response, next: NextFunction): void {
        const model: Secrets = new Secrets();
        model.nuid = req.body.nuid;
        model.pin = CryptoUtils.encrypt(req.body.pin.toString());
        const entity: IEntity<Secrets> = createEntity(SecretEntity, model);

        this.SecretService.once('CREATE_SUCCESS', () => {
            res.status(200).json({});
        }).once('ERROR', (error) => {

            res.status(500).json({ error });
        });

        this.SecretService.create(entity as SecretEntity);
    }


    public update(req: Request, res: Response, next: NextFunction): void {
        const model: Secrets = new Secrets();
        model.nuid = parseInt(req.params.nuid, 10);
        model.pin = CryptoUtils.encrypt(req.body.pin.toString());
        const entity: IEntity<Secrets> = createEntity(SecretEntity, model);

        this.SecretService.once('UPDATE_SUCCESS', (result) => {
            res.status(200).json(result);
        }).once('ERROR', (error) => {
            res.status(500).json({ error });
        });

        this.SecretService.update(entity as SecretEntity);
    }


    public list(req: Request, res: Response, next: NextFunction): void {

        const dataListener = (result: Secrets[]) => {
            const data = result.map((item: Secrets) => {
                item.pin = CryptoUtils.decrypt(item.pin);
                return item;
            });
            this.SecretService.emit('CLEANUP');
            res.status(200).json(data);
        };

        const errorListener = (error: Error) => {
            this.SecretService.emit('CLEANUP');
            res.status(500).json({ error });
        };

        this.SecretService.on('FIND_SUCCESS', dataListener).on('ERROR', errorListener).once('CLEANUP', () => {
            this.SecretService.removeListener('FIND_SUCCESS', dataListener);
            this.SecretService.removeListener('ERROR', errorListener);
        });
        this.SecretService.findAll();

    }

    public fetch(req: Request, res: Response, next: NextFunction): void {
        const model: Secrets = new Secrets();
        model.nuid = parseInt(req.params.nuid, 10);
        const entity: IEntity<Secrets> = createEntity(SecretEntity, model);

        const dataListener = (result: Secrets) => {
            result.pin = CryptoUtils.decrypt(result.pin);
            this.SecretService.emit('CLEANUP');
            res.status(200).json(result);
        };

        const errorListener = (error: Error) => {
            this.SecretService.emit('CLEANUP');
            res.status(500).json({ error });
        };

        this.SecretService.on('FETCH_SUCCESS', dataListener).once('ERROR', errorListener).once('CLEANUP', () => {
            this.SecretService.removeListener('FETCH_SUCCESS', dataListener);
            this.SecretService.removeListener('ERROR', errorListener);
        });

        this.SecretService.fetch(entity as SecretEntity);
    }

    public delete(req: Request, res: Response, next: NextFunction): void {
        throw new Error('Method not implemented.');
    }

}


