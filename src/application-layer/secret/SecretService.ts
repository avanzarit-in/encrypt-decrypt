import { IService } from '../IService';
import { SecretsEntity } from '../../domain-layer/SecretsEntity';
import { Secrets } from '../../infrastructure-layer/models/Secrets';
import { SecretRepository } from '../../infrastructure-layer/SecretRepository';
import { UserRepository } from '../../infrastructure-layer/UserRepository';
import { UpdateResult, DeleteResult, InsertResult } from 'typeorm';
import {EventEmitter} from './../EventEmitter';

// Define your emitter's types like that:
// Key: Event name; Value: Listener function signature
export interface ISecretServiceEvents {
    ERROR: (error: Error) => void;
    CREATE_SUCCESS: (result: InsertResult) => void;
    UPDATE_SUCCESS: (result: UpdateResult) => void;
    DELETE_SUCCESS: (result: DeleteResult) => void;
    FIND_SUCCESS: (result: Secrets[]) => void;
    FETCH_SUCCESS: (result: Secrets) => void;
    CLEANUP: () => void;
}

export class SecretService extends EventEmitter<ISecretServiceEvents> implements IService<Secrets, SecretsEntity, SecretRepository>  {

    private repository: SecretRepository;
    constructor(repository: SecretRepository) {
        super();
        this.repository = repository;
    }

    public create(entity: SecretsEntity) {
        this.repository.create(entity).then((result: InsertResult) => {
            this.emit('CREATE_SUCCESS', result);
        }).catch((error) => {
            console.log(error);
            return this.emit('ERROR', error);
        });
    }
    public update(entity: SecretsEntity) {
        this.repository.update(entity).then((result: UpdateResult) => {
            this.emit('UPDATE_SUCCESS', result);
        }).catch((error) => {
            this.emit('ERROR', error);
        });
    }
    public delete(entity: SecretsEntity) {
        this.repository.delete(entity).then((result: DeleteResult) => {
            this.emit('DELETE_SUCCESS', result);
        }).catch((error) => {
            this.emit('ERROR', error);
        });
    }
    public findAll() {
        this.repository.findAll().then((result: Secrets[]) => {
            this.emit('FIND_SUCCESS', result);
        }).catch((error) => {
            this.emit('ERROR', error);
        });
    }
    public fetch(entity: SecretsEntity) {
        this.repository.findOne(entity).then((result: Secrets) => {
            this.emit('FETCH_SUCCESS', result);
        }).catch((error) => {
            this.emit('ERROR', error);
        });
    }
}
