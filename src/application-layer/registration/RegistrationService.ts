import { IService } from '../IService';
import { UserEntity } from '../../domain-layer/UserEntity';
import { Users } from '../../infrastructure-layer/models/Users';
import { UserRepository } from '../../infrastructure-layer/UserRepository';
import { EventEmitter } from './../EventEmitter';
import CryptoUtils from './../../utils/CryptoUtils';

export interface IValidationResult {
    message: string,
    status: boolean
}

// Define your emitter's types like that:
// Key: Event name; Value: Listener function signature
export interface IRegistrationServiceEvents {
    ERROR: (error: Error) => void;
    SUCCESS: (result: IValidationResult) => void;
    CLEANUP: () => void;
}

export class RegistrationService extends EventEmitter<IRegistrationServiceEvents> implements IService<Users, UserEntity, UserRepository>  {

    private repository: UserRepository;
    constructor(repository: UserRepository) {
        super();
        this.repository = repository;
    }

    public validate(entity: UserEntity) {
        this.repository.findOne(entity).then((result: Users) => {
            const pin=CryptoUtils.decrypt(result.pin)
            if (entity.getEntity().pin === pin) {
                console.log("here");
                this.emit('SUCCESS', { message: "User pin match", status: true });
            } else if (pin === "disabled") {
                this.emit('SUCCESS', { message: "User has already registered", status: false });
            } else {
                this.emit('SUCCESS', { message: "User pin does not match validation failed", status: false });
            }

        }).catch((error) => {
            return this.emit('ERROR', error);
        });
    }

    create: (entity: UserEntity) => void;
    update: (entity: UserEntity) => void;
    delete: (entity: UserEntity) => void;
    findAll: () => void;
    fetch: (entity: UserEntity) => void;

}
