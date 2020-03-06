import { IRepository } from './IReposiroty';
import { SecretsEntity } from '../domain-layer/SecretsEntity';
import { Secrets } from '../infrastructure-layer/models/Secrets';
import { Users } from '../infrastructure-layer/models/Users';
import { getRepository, UpdateResult, DeleteResult, InsertResult } from 'typeorm';
import CryptoUtils from './../utils/CryptoUtils';
import { APIError } from './../ApiError'

export class SecretRepository implements IRepository<Secrets, SecretsEntity> {

    public async delete(entity: SecretsEntity): Promise<DeleteResult> {
        const secretRepository = getRepository(Secrets);
        const secret: Secrets = await secretRepository.createQueryBuilder('secret')
        .innerJoin('secret.user', 'user')
        .where('user.nuid = :nuid', { nuid: entity.getFk() })
        .getOne();
        if(secret){
        return await secretRepository.delete(secret.id);
        }
        throw new APIError("User secret data not found")
    }

    public async create(entity: SecretsEntity): Promise<InsertResult> {
        const secretRepository = getRepository(Secrets);
        const userRepository = getRepository(Users);
        entity.getEntity().createdAt = new Date();
        const user: Users = await userRepository.findOneOrFail(entity.getFk());

        const pinValue = CryptoUtils.decrypt(user.pin)
        if (pinValue !== "disabled") {
            entity.getEntity().user = user;
            user.pin = CryptoUtils.encrypt("disabled");
            await userRepository.update(user.nuid, user);
            return await secretRepository.insert(entity.getEntity());
        }
        throw new APIError("Secret already Set");
    }

    public async update(entity: SecretsEntity): Promise<UpdateResult> {
        const secretRepository = getRepository(Secrets);
        const userRepository = getRepository(Users);
        const user: Users = await userRepository.findOneOrFail(entity.getFk());

        const pinValue = CryptoUtils.decrypt(user.pin)
        if (pinValue === "disabled") {
            const secret: Secrets = await this.findOne(entity);
            if(secret){
            return await secretRepository.update(secret.id, entity.getEntity());
            }
            throw new APIError("User secret data not found")
        }
        throw new APIError("User not registered yet");


    }


    public async findOne(entity: SecretsEntity): Promise<Secrets> {
        const secretRepository = getRepository(Secrets);
        return await secretRepository.createQueryBuilder('secret')
            .innerJoin('secret.user', 'user')
            .where('user.nuid = :nuid', { nuid: entity.getFk() })
            .getOne();
    }

    findAll: () => Promise<Secrets[]>;
}
