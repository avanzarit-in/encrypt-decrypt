import { IEntity } from '../IEntity';
import { UserEntityModel } from './UserEntityModel';

export class UserEntity implements IEntity<UserEntityModel> {
    private entity: UserEntityModel;

    public constructor(entity: UserEntityModel) {
        this.entity = entity;
    }
    public updateParam(): UserEntityModel {
        return this.entity;
    }

    public queryParam(): UserEntityModel {
        return this.entity;
    }
}




