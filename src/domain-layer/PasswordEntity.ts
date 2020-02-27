import { IEntity } from './IEntity';
import { Passwords } from '../infrastructure-layer/models/Passwords';

export class PasswordEntity implements IEntity<Passwords> {
    private entity: Passwords;

    public constructor(entity: Passwords) {
        this.entity = entity;
    }

    public getJson(): string {
        return '';
    }

    public getEntity(): Passwords {
        return this.entity;
    }

}




