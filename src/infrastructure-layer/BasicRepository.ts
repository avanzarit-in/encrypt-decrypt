import { IRepository } from './IReposiroty';
import { BasicEntity } from './../domain-layer/BasicEntity/BasicEntity';
import { BasicEntityModel } from './../domain-layer/BasicEntity/BasicEntityModel';

export class BasicRepository implements IRepository<BasicEntityModel, BasicEntity> {
    public delete = (entity: BasicEntity) => {
        return new BasicEntityModel();
    }

    public create = (entity: BasicEntity) => {
        return new BasicEntityModel();
    }

    public update: (entity: BasicEntity) => void;
    public findAll: (entity: BasicEntity) => void;
    public findOne: (entity: BasicEntity) => void;


}
