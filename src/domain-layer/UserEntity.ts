import { IEntity } from './IEntity';
import { Users } from '../infrastructure-layer/models/Users';

export class UserEntity implements IEntity<Users> {
    private entity: Users;

    public constructor(entity: Users) {
        this.entity = entity;
    }

    public getJson(): string {
        return '';
    }

    public getEntity(): Users {
        return this.entity;
    }

}




