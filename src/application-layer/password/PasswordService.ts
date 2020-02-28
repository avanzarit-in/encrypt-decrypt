import { IService } from '../IService';
import { PasswordEntity } from '../../domain-layer/PasswordEntity';
import { Passwords } from '../../infrastructure-layer/models/Passwords';
import { PasswordRepository } from '../../infrastructure-layer/PasswordRepository';
import { UpdateResult, DeleteResult } from 'typeorm';
import {EventEmitter} from './../EventEmitter';

// Define your emitter's types like that:
// Key: Event name; Value: Listener function signature
export interface IPasswordServiceEvents {
    ERROR: (error: Error) => void;
    CREATE_SUCCESS: () => void;
    UPDATE_SUCCESS: (result: UpdateResult) => void;
    DELETE_SUCCESS: (result: DeleteResult) => void;
    FIND_SUCCESS: (result: Passwords[]) => void;
    FETCH_SUCCESS: (result: Passwords) => void;
    CLEANUP: () => void;
}

export class PasswordService extends EventEmitter<IPasswordServiceEvents> implements IService<Passwords, PasswordEntity, PasswordRepository>  {

    private repository: PasswordRepository;
    constructor(repository: PasswordRepository) {
        super();
        this.repository = repository;
    }

    public create(entity: PasswordEntity) {
        this.repository.create(entity).then(() => {
            this.emit('CREATE_SUCCESS');
        }).catch((error) => {
            return this.emit('ERROR', error);
        });
    }
    public update(entity: PasswordEntity) {
        this.repository.update(entity).then((result: UpdateResult) => {
            this.emit('UPDATE_SUCCESS', result);
        }).catch((error) => {
            this.emit('ERROR', error);
        });
    }
    public delete(entity: PasswordEntity) {
        this.repository.delete(entity).then((result: DeleteResult) => {
            this.emit('DELETE_SUCCESS', result);
        }).catch((error) => {
            this.emit('ERROR', error);
        });
    }
    public findAll() {
        this.repository.findAll().then((result: Passwords[]) => {
            this.emit('FIND_SUCCESS', result);
        }).catch((error) => {
            this.emit('ERROR', error);
        });
    }
    public fetch(entity: PasswordEntity) {
        this.repository.findOne(entity).then((result: Passwords) => {
            this.emit('FETCH_SUCCESS', result);
        }).catch((error) => {
            this.emit('ERROR', error);
        });
    }
}
