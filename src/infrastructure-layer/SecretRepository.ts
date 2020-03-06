import { IRepository } from './IReposiroty';
import { SecretsEntity } from '../domain-layer/SecretsEntity';
import { Secrets } from '../infrastructure-layer/models/Secrets';
import { Users } from '../infrastructure-layer/models/Users';
import { getRepository, UpdateResult, DeleteResult, InsertResult } from 'typeorm';
import CryptoUtils from './../utils/CryptoUtils';

export class SecretRepository implements IRepository<Secrets, SecretsEntity> {
    public async delete(entity: SecretsEntity): Promise<DeleteResult> {
        const secretRepository = getRepository(Secrets);
        const secret: Secrets = await this.findOne(entity);
        return await secretRepository.delete(secret.id);
    }

    public async create(entity: SecretsEntity): Promise<InsertResult> {
        const secretRepository = getRepository(Secrets);
        const userRepository = getRepository(Users);
        entity.getEntity().createdAt = new Date();
        const users: Users[] = await userRepository.findByIds([entity.getFk()]);
       
        if(users && users[0]){
            const user=users[0];
            const pinValue=CryptoUtils.decrypt(user.pin)
            if(pinValue!=="disabled"){
                entity.getEntity().user = user;
                user.pin=CryptoUtils.encrypt("disabled");
                await userRepository.update(user.nuid,user);
                return await secretRepository.insert(entity.getEntity());
            }
            throw Error("Secret Already Set");
        }
        throw Error("User not found");  
       
    }

    public async update(entity: SecretsEntity): Promise<UpdateResult> {
        const secretRepository = getRepository(Secrets);
        const userRepository = getRepository(Users);
        const users: Users[] = await userRepository.findByIds([entity.getFk()]);
        if(users && users[0]){
            const user=users[0];
            const pinValue=CryptoUtils.decrypt(user.pin)
            if(pinValue==="disabled"){
                const secret: Secrets = await this.findOne(entity);
                return await secretRepository.update(secret.id, entity.getEntity());
            }
            throw Error("User not registered yet");
        }
        throw Error("User not found");  
        
    }

    public async findAll(): Promise<Secrets[]> {
        const secretRepository = getRepository(Secrets);
        return await secretRepository.find();
    }

    public async findOne(entity: SecretsEntity): Promise<Secrets> {
        const secretRepository = getRepository(Secrets);
        return await secretRepository.createQueryBuilder('secret')
            .innerJoin('secret.user', 'user')
            .where('user.nuid = :nuid', { nuid: entity.getFk() })
            .getOne();
    }
}
