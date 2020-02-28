import { IRepository } from './IReposiroty';
import { SecretsEntity } from '../domain-layer/SecretsEntity';
import { Secrets } from '../infrastructure-layer/models/Secrets';
import { Users } from '../infrastructure-layer/models/Users';
import { getRepository, UpdateResult, DeleteResult, InsertResult } from 'typeorm';

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
        entity.getEntity().user = users[0];
        return await secretRepository.insert(entity.getEntity());
    }

    public async update(entity: SecretsEntity): Promise<UpdateResult> {
        const secretRepository = getRepository(Secrets);
        const secret: Secrets = await this.findOne(entity);
        return await secretRepository.update(secret.id, entity.getEntity());
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
