import { IService } from '../IService';
import { UserEntity } from '../../domain-layer/UserEntity';
import { Users } from '../../infrastructure-layer/models/Users';
import { UserRepository } from '../../infrastructure-layer/UserRepository';
import { EventEmitter } from './../EventEmitter';
import CryptoUtils from './../../utils/CryptoUtils';

enum REGISTRATION_STATUS {REGISTERED=1, NOT_REGISTERED=0};
enum VALIDATE_PIN_STATUS{VALID=1, INVALID=0};
export interface IResult {
    result: number
}

// Define your emitter's types like that:
// Key: Event name; Value: Listener function signature
export interface IRegistrationServiceEvents {
    ERROR: (error: Error) => void;
    SUCCESS: (result: IResult) => void;
    CLEANUP: () => void;
}

export class RegistrationService extends EventEmitter<IRegistrationServiceEvents> implements IService<Users, UserEntity, UserRepository>  {

    private repository: UserRepository;
    constructor(repository: UserRepository) {
        super();
        this.repository = repository;
    }

    public checkRegistration(entity: UserEntity) {
        this.repository.findOne(entity).then((result: Users) => {
            const pin=CryptoUtils.decrypt(result.pin)
            if (pin==="disabled") {
                this.emit('SUCCESS', { result: REGISTRATION_STATUS.REGISTERED });
            } else {
                this.emit('SUCCESS', { result: REGISTRATION_STATUS.NOT_REGISTERED });
            }

        }).catch((error) => {
            return this.emit('ERROR', error);
        });
    }

    public validatePin(entity: UserEntity) {
        this.repository.findOne(entity).then((result: Users) => {
            const pin=CryptoUtils.decrypt(result.pin)
            if (entity.getEntity().pin === pin) {
                this.emit('SUCCESS', { result: VALIDATE_PIN_STATUS.VALID });
            } else if(entity.getEntity().pin==='disabled') {
                return this.emit('ERROR', new Error("User Already registered"));
            }else {
                this.emit('SUCCESS', { result: VALIDATE_PIN_STATUS.INVALID });
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
