import { IService } from '../IService';
import { UserEntity } from '../../domain-layer/UserEntity';
import { Users } from '../../infrastructure-layer/models/Users';
import { UserRepository } from '../../infrastructure-layer/UserRepository';
import { UpdateResult, DeleteResult, InsertResult } from 'typeorm';
import {EventEmitter} from './../EventEmitter';

// Define your emitter's types like that:
// Key: Event name; Value: Listener function signature
export interface IUserServiceEvents {
    ERROR: (error: Error) => void;
    CREATE_SUCCESS: (result: InsertResult) => void;
    UPDATE_SUCCESS: (result: UpdateResult) => void;
    DELETE_SUCCESS: (result: DeleteResult) => void;
    FIND_SUCCESS: (result: Users[]) => void;
    FETCH_SUCCESS: (result: Users) => void;
    CLEANUP: () => void;
}

export class UserService extends EventEmitter<IUserServiceEvents> implements IService<Users, UserEntity, UserRepository>  {

    private repository: UserRepository;
    constructor(repository: UserRepository) {
        super();
        this.repository = repository;
    }

    public create(entity: UserEntity) {
        this.repository.create(entity).then((result: InsertResult) => {
            this.emit('CREATE_SUCCESS', result);
        }).catch((error) => {
            return this.emit('ERROR', error);
        });
    }
    public update(entity: UserEntity) {
        this.repository.update(entity).then((result: UpdateResult) => {
            this.emit('UPDATE_SUCCESS', result);
        }).catch((error) => {
            this.emit('ERROR', error);
        });
    }
    public delete(entity: UserEntity) {
        this.repository.delete(entity).then((result: DeleteResult) => {
            this.emit('DELETE_SUCCESS', result);
        }).catch((error) => {
            this.emit('ERROR', error);
        });
    }
    public findAll() {
        this.repository.findAll().then((result: Users[]) => {
            this.emit('FIND_SUCCESS', result);
        }).catch((error) => {
            this.emit('ERROR', error);
        });
    }
    public fetch(entity: UserEntity) {
        this.repository.findOne(entity).then((result: Users) => {
            this.emit('FETCH_SUCCESS', result);
        }).catch((error) => {
            this.emit('ERROR', error);
        });
    }
}
