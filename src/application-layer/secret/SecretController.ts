import { IController } from '../IController';
import { Request, Response, NextFunction } from 'express';
import { createEntity} from '../../domain-layer/IEntityWithFk';
import { SecretsEntity } from '../../domain-layer/SecretsEntity';
import { Secrets } from '../../infrastructure-layer/models/Secrets';
import { IEntity } from '../../domain-layer/IEntity';
import { SecretService } from './SecretService';
import { SecretRepository } from '../../infrastructure-layer/SecretRepository';
import CryptoUtils from './../../utils/CryptoUtils';
import { UpdateResult, DeleteResult, InsertResult } from 'typeorm';

export class SecretController implements IController<Secrets, SecretsEntity, SecretRepository, SecretService> {

    private secretService: SecretService;

    public constructor(secretService: SecretService) {
        this.secretService = secretService;
    }
    public create(req: Request, res: Response, next: NextFunction): void {
        const model: Secrets = new Secrets();
        model.secretDate = CryptoUtils.encrypt(req.body.secretDate);
        model.ivrAnswerId = req.body.ivrAnswerId;

        const entity = createEntity(SecretsEntity, model, req.body.nuid);

        const dataListener = (result: InsertResult) => {
            this.secretService.emit('CLEANUP');
            res.status(200).json(result);
        };

        const errorListener = (error: Error) => {
            this.secretService.emit('CLEANUP');
            res.status(500).json({ error });
        };

        this.secretService.once('CREATE_SUCCESS', dataListener).once('ERROR', errorListener).once('CLEANUP', () => {
            this.secretService.removeListener('CREATE_SUCCESS', dataListener);
            this.secretService.removeListener('ERROR', errorListener);
        });

        this.secretService.create(entity as SecretsEntity);
    }


    public update(req: Request, res: Response, next: NextFunction): void {
        const model: Secrets = new Secrets();
        model.id = parseInt(req.params.id, 10);
        model.secretDate = CryptoUtils.encrypt(req.body.secretDate);
        model.ivrAnswerId = req.body.ivrAnswerId;

        const entity = createEntity(SecretsEntity, model, req.body.nuid);

        const dataListener = (result: UpdateResult) => {
            this.secretService.emit('CLEANUP');
            res.status(200).json(result);
        };

        const errorListener = (error: Error) => {
            this.secretService.emit('CLEANUP');
            res.status(500).json({ error });
        };

        this.secretService.on('UPDATE_SUCCESS', dataListener).on('ERROR', errorListener).once('CLEANUP', () => {
            this.secretService.removeListener('UPDATE_SUCCESS', dataListener);
            this.secretService.removeListener('ERROR', errorListener);
        });

        this.secretService.update(entity as SecretsEntity);
    }


    public list(req: Request, res: Response, next: NextFunction): void {

        const dataListener = (result: Secrets[]) => {
            const data = result.map((item: Secrets) => {
                item.secretDate = CryptoUtils.decrypt(item.secretDate);
                return item;
            });
            this.secretService.emit('CLEANUP');
            res.status(200).json(data);
        };

        const errorListener = (error: Error) => {
            this.secretService.emit('CLEANUP');
            res.status(500).json({ error });
        };

        this.secretService.on('FIND_SUCCESS', dataListener).on('ERROR', errorListener).once('CLEANUP', () => {
            this.secretService.removeListener('FIND_SUCCESS', dataListener);
            this.secretService.removeListener('ERROR', errorListener);
        });
        this.secretService.findAll();

    }

    public fetch(req: Request, res: Response, next: NextFunction): void {
        const model: Secrets = new Secrets();
        model.id = parseInt(req.params.id, 10);
        const entity = createEntity(SecretsEntity, model, req.body.nuid);

        const dataListener = (result: Secrets) => {
            result.secretDate = CryptoUtils.decrypt(result.secretDate);
            this.secretService.emit('CLEANUP');
            res.status(200).json(result);
        };

        const errorListener = (error: Error) => {
            this.secretService.emit('CLEANUP');
            res.status(500).json({ error });
        };

        this.secretService.on('FETCH_SUCCESS', dataListener).once('ERROR', errorListener).once('CLEANUP', () => {
            this.secretService.removeListener('FETCH_SUCCESS', dataListener);
            this.secretService.removeListener('ERROR', errorListener);
        });

        this.secretService.fetch(entity as SecretsEntity);
    }

    public delete(req: Request, res: Response, next: NextFunction): void {
        const model: Secrets = new Secrets();
        model.id = parseInt(req.params.id, 10);
        const entity = createEntity(SecretsEntity, model, req.body.nuid);

        const dataListener = (result: DeleteResult) => {
            this.secretService.emit('CLEANUP');
            res.status(200).json(result);
        }

        const errorListener = (error: Error) => {
            this.secretService.emit('CLEANUP');
            res.status(500).json({ error });
        }

        this.secretService.on('DELETE_SUCCESS', dataListener).on('ERROR', errorListener).once('CLEANUP', () => {
            this.secretService.removeListener('DELETE_SUCCESS', dataListener);
            this.secretService.removeListener('ERROR', errorListener);
        });

        this.secretService.delete(entity as SecretsEntity);
    }

}


