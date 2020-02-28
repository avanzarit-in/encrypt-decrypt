import { IRepository } from './IReposiroty';
import { PasswordEntity } from '../domain-layer/PasswordEntity';
import { Passwords } from '../infrastructure-layer/models/Passwords';
import { getRepository, UpdateResult, DeleteResult } from 'typeorm';

export class PasswordRepository implements IRepository<Passwords, PasswordEntity> {
    public async delete(entity: PasswordEntity): Promise<DeleteResult> {
        const passwordRepository = getRepository(Passwords);
        return await passwordRepository.delete(entity.getEntity().id);
    }

    public async create(entity: PasswordEntity) {
        const passwordRepository = getRepository(Passwords);
        entity.getEntity().createdAt = new Date();
        await passwordRepository.insert(entity.getEntity());
    }

    public async update(entity: PasswordEntity): Promise<UpdateResult> {
        const passwordRepository = getRepository(Passwords);
        return await passwordRepository.update(entity.getEntity().id, entity.getEntity());
    }

    public async findAll(): Promise<Passwords[]> {
        const passwordRepository = getRepository(Passwords);
        return await passwordRepository.find();
    }

    public async findOne(entity: PasswordEntity): Promise<Passwords> {
        const passwordRepository = getRepository(Passwords);
        return await passwordRepository.findOneOrFail(entity.getEntity().id);
    }
}
