import { IRepository } from './IReposiroty';
import { PasswordEntity } from '../domain-layer/PasswordEntity';
import { Passwords } from '../infrastructure-layer/models/Passwords';
import { getRepository, UpdateResult, DeleteResult } from 'typeorm';

export class PasswordRepository implements IRepository<Passwords, PasswordEntity> {
    public async delete(entity: PasswordEntity): Promise<DeleteResult> {
        const PasswordRepository = getRepository(Passwords);
        return await PasswordRepository.delete(entity.getEntity().id);
    }

    public async create(entity: PasswordEntity) {
        const PasswordRepository = getRepository(Passwords);
        entity.getEntity().createdAt = new Date();
        await PasswordRepository.insert(entity.getEntity());
    }

    public async update(entity: PasswordEntity): Promise<UpdateResult> {
        const PasswordRepository = getRepository(Passwords);
        return await PasswordRepository.update(entity.getEntity().id, entity.getEntity());
    }

    public async findAll(): Promise<Passwords[]> {
        const PasswordRepository = getRepository(Passwords);
        return await PasswordRepository.find();
    }

    public async findOne(entity: PasswordEntity): Promise<Passwords> {
        const PasswordRepository = getRepository(Passwords);
        return await PasswordRepository.findOneOrFail(entity.getEntity().id);
    }
}
