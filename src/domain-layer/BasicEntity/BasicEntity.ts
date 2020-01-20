import { IEntity } from '../IEntity';
import { BasicEntityModel } from './BasicEntityModel';

export class BasicEntity implements IEntity<BasicEntityModel> {
    private entity: BasicEntityModel;

    public constructor(entity: BasicEntityModel) {
        this.entity = entity;
    }
    public updateParam(): BasicEntityModel {
        return this.entity;
    }

    public queryParam(): BasicEntityModel {
        return this.entity;
    }
}




