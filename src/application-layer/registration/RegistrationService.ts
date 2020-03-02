import { IService } from '../IService';
import { UserEntity } from '../../domain-layer/UserEntity';
import { Users } from '../../infrastructure-layer/models/Users';
import { UserRepository } from '../../infrastructure-layer/UserRepository';
import { EventEmitter } from './../EventEmitter';

// Define your emitter's types like that:
// Key: Event name; Value: Listener function signature
export interface IRegistrationServiceEvents {
    ERROR: (error: Error) => void;
    VALIDATE_SUCCESS: (result: boolean) => void;
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
            if(entity.getEntity().pin===result.pin){
                console.log("User pin match");
                this.emit('VALIDATE_SUCCESS', true);
            }else if(result.pin==="disabled"){
                console.log("User has already registered");
                this.emit('VALIDATE_SUCCESS', true);
            }else{
                console.log("User pin does not match validation failed");
                this.emit('VALIDATE_SUCCESS', true);
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
