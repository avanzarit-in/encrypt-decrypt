import { IEntityWithFk } from './IEntityWithFk';
import { Passwords } from '../infrastructure-layer/models/Passwords';

export class PasswordEntity implements IEntityWithFk<Passwords, number> {

    public constructor(private entity: Passwords, private nuid: number) {}

    public getJson(): string {
        return '';
    }

    public getEntity(): Passwords {
        return this.entity;
    }

    public getFk(): number {
        return this.entity.user.nuid;
    }

}




