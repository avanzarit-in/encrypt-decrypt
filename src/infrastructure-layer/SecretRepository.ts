import { IRepository } from './IReposiroty';
import { SecretsEntity } from '../domain-layer/SecretsEntity';
import { Secrets } from '../infrastructure-layer/models/Secrets';
import { Users } from '../infrastructure-layer/models/Users';
import { getRepository, UpdateResult, DeleteResult } from 'typeorm';

export class SecretRepository implements IRepository<Secrets, SecretsEntity> {
    public async delete(entity: SecretsEntity): Promise<DeleteResult> {
        const secretRepository = getRepository(Secrets);
        return await secretRepository.delete(entity.getEntity().id);
    }

    public async create(entity: SecretsEntity) {
        const secretRepository = getRepository(Secrets);
        const userRepository = getRepository(Users);
        entity.getEntity().createdAt = new Date();
        await secretRepository.insert(entity.getEntity());
    }

    public async update(entity: SecretsEntity): Promise<UpdateResult> {
        const secretRepository = getRepository(Secrets);
        return await secretRepository.update(entity.getEntity().id, entity.getEntity());
    }

    public async findAll(): Promise<Secrets[]> {
        const secretRepository = getRepository(Secrets);
        return await secretRepository.find();
    }

    public async findOne(entity: SecretsEntity): Promise<Secrets> {
        const secretRepository = getRepository(Secrets);
        return await secretRepository.findOneOrFail(entity.getEntity().id);
    }
}
