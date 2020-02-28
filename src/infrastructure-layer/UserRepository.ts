import { IRepository } from './IReposiroty';
import { UserEntity } from '../domain-layer/UserEntity';
import { Users } from '../infrastructure-layer/models/Users';
import { getRepository, UpdateResult, DeleteResult, InsertResult } from 'typeorm';

export class UserRepository implements IRepository<Users, UserEntity> {
    public async delete(entity: UserEntity): Promise<DeleteResult> {
        const userRepository = getRepository(Users);
        return await userRepository.delete(entity.getEntity().nuid);
    }

    public async create(entity: UserEntity): Promise<InsertResult> {
        const userRepository = getRepository(Users);
        entity.getEntity().createdAt = new Date();
        return await userRepository.insert(entity.getEntity());
    }

    public async update(entity: UserEntity): Promise<UpdateResult> {
        const userRepository = getRepository(Users);
        return await userRepository.update(entity.getEntity().nuid, entity.getEntity());
    }

    public async findAll(): Promise<Users[]> {
        const userRepository = getRepository(Users);
        return await userRepository.find();
    }

    public async findOne(entity: UserEntity): Promise<Users> {
        const userRepository = getRepository(Users);
        return await userRepository.findOneOrFail(entity.getEntity().nuid);
    }
}
