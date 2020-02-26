import { IService } from '../IService';
import { UserEntity } from '../../domain-layer/UserEntity/UserEntity';
import { UserEntityModel } from '../../domain-layer/UserEntity/UserEntityModel';
import { UserRepository } from '../../infrastructure-layer/UserRepository';

export class UserService implements IService<UserEntityModel, UserEntity, UserRepository> {

    private repository: UserRepository;
    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    public create(entity: UserEntity) {
        this.repository.create(entity);
    }
    public update(): (entity: UserEntity) => void {
        throw new Error('Method not implemented.');
    }
    public delete(): (entity: UserEntity) => void {
        throw new Error('Method not implemented.');
    }
    public findAll(): (entity: UserEntity) => void {
        throw new Error('Method not implemented.');
    }
    public fetch(): (entity: UserEntity) => void {
        throw new Error('Method not implemented.');
    }
}
