import { IRepository } from './IReposiroty';
import { UserEntity } from '../domain-layer/UserEntity/UserEntity';
import { UserEntityModel } from '../domain-layer/UserEntity/UserEntityModel';

export class UserRepository implements IRepository<UserEntityModel, UserEntity> {
    public delete = (entity: UserEntity) => {
        return new UserEntityModel();
    }

    public create = (entity: UserEntity) => {
        return new UserEntityModel();
    }

    public update: (entity: UserEntity) => void;
    public findAll: (entity: UserEntity) => void;
    public findOne: (entity: UserEntity) => void;


}
