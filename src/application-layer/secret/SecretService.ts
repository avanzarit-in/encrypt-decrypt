import { IService } from '../IService';
import { SecretsEntity } from '../../domain-layer/SecretsEntity';
import { Secrets } from '../../infrastructure-layer/models/Secrets';
import { SecretRepository } from '../../infrastructure-layer/SecretRepository';
import { UpdateResult, DeleteResult, InsertResult } from 'typeorm';
import {EventEmitter} from './../EventEmitter';
import {APIError} from './../../APIError';
import CryptoUtils from './../../utils/CryptoUtils';

export interface IResult {
    result: number
}

enum RESPONSE_STATUS{VALID=1, INVALID=0};

// Define your emitter's types like that:
// Key: Event name; Value: Listener function signature
export interface ISecretServiceEvents {
    ERROR: (error: Error) => void;
    CREATE_SUCCESS: (result: IResult) => void;
    UPDATE_SUCCESS: (result: IResult) => void;
    DELETE_SUCCESS: (result: IResult) => void;
    AUTHENTICATE_SUCCESS: (result: IResult) => void;
    FETCH_SUCCESS: (result: Secrets) => void;
    CLEANUP: () => void;
}

export class SecretService extends EventEmitter<ISecretServiceEvents> implements IService<Secrets, SecretsEntity, SecretRepository>  {
    

    private repository: SecretRepository;
    constructor(repository: SecretRepository) {
        super();
        this.repository = repository;
    }

    public authenticate(entity: SecretsEntity) {
        this.repository.findOne(entity).then((result: Secrets) => {
            if(result){
            console.log(CryptoUtils.decrypt(result.secretDate));
            console.log(entity.getEntity().secretDate);
            
                if(entity.getEntity().secretDate===CryptoUtils.decrypt(result.secretDate)){
                    this.emit('AUTHENTICATE_SUCCESS', { result: RESPONSE_STATUS.VALID });
                }else{
                    this.emit('AUTHENTICATE_SUCCESS', { result: RESPONSE_STATUS.INVALID });
                }
            
            }else{
                this.emit('ERROR', new APIError("No secret data found for the user"))
            }
        }).catch((error) => {
            this.emit('ERROR', error);
        });
    }

    public create(entity: SecretsEntity) {
        this.repository.create(entity).then((result: InsertResult) => {
            this.emit('CREATE_SUCCESS', { result: RESPONSE_STATUS.VALID });
        }).catch((error) => {
            console.log(error);
            return this.emit('ERROR', error);
        });
    }
    public update(entity: SecretsEntity) {
        this.repository.update(entity).then((result: UpdateResult) => {
            this.emit('UPDATE_SUCCESS', { result: RESPONSE_STATUS.VALID });
        }).catch((error) => {
            this.emit('ERROR', error);
        });
    }
    public delete(entity: SecretsEntity) {
        this.repository.delete(entity).then((result: DeleteResult) => {
            this.emit('DELETE_SUCCESS', { result: RESPONSE_STATUS.VALID });
        }).catch((error) => {
            this.emit('ERROR', error);
        });
    }

    public fetch(entity: SecretsEntity) {
        this.repository.findOne(entity).then((result: Secrets) => {
            if(result){
            this.emit('FETCH_SUCCESS', result);
            }else{
                this.emit('ERROR', new APIError("No secret data found for the user"))
            }
        }).catch((error) => {
            this.emit('ERROR', error);
        });
    }

    public findAll(){
        throw new Error("Method not implemented.");
    }

   
}
