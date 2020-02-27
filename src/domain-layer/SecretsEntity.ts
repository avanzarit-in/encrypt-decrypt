import { IEntity } from './IEntity';
import { Secrets } from '../infrastructure-layer/models/Secrets';

export class SecretsEntity implements IEntity<Secrets> {
    private entity: Secrets;

    public constructor(entity: Secrets) {
        this.entity = entity;
    }

    public getJson(): string {
        return '';
    }

    public getEntity(): Secrets {
        return this.entity;
    }

}




