import { IRepository } from './IReposiroty';
import { SecretsEntity } from '../domain-layer/SecretsEntity';
import { Secrets } from '../infrastructure-layer/models/Secrets';
import { getRepository, UpdateResult, DeleteResult } from 'typeorm';

export class SecretRepository implements IRepository<Secrets, SecretsEntity> {
    public async delete(entity: SecretsEntity): Promise<DeleteResult> {
        const SecretRepository = getRepository(Secrets);
        return await SecretRepository.delete(entity.getEntity().id);
    }

    public async create(entity: SecretsEntity) {
        const SecretRepository = getRepository(Secrets);
        entity.getEntity().createdAt = new Date();
        await SecretRepository.insert(entity.getEntity());
    }

    public async update(entity: SecretsEntity): Promise<UpdateResult> {
        const SecretRepository = getRepository(Secrets);
        return await SecretRepository.update(entity.getEntity().id, entity.getEntity());
    }

    public async findAll(): Promise<Secrets[]> {
        const SecretRepository = getRepository(Secrets);
        return await SecretRepository.find();
    }

    public async findOne(entity: SecretsEntity): Promise<Secrets> {
        const SecretRepository = getRepository(Secrets);
        return await SecretRepository.findOneOrFail(entity.getEntity().id);
    }
}
