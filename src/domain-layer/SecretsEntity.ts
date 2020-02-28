import { IEntity } from './IEntity';
import { Secrets } from '../infrastructure-layer/models/Secrets';
import { IEntityWithFk } from './IEntityWithFk';

export class SecretsEntity implements IEntityWithFk<Secrets, number> {
    public getFk(){
        return this.nuid;
    }

    public constructor(private entity: Secrets, private nuid: number) {}

    public getJson(): string {
        return '';
    }

    public getEntity(): Secrets {
        return this.entity;
    }

}




