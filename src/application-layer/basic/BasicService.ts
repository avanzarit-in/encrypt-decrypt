import { IService } from './../IService';
import { BasicEntity } from './../../domain-layer/BasicEntity/BasicEntity';
import { BasicEntityModel } from './../../domain-layer/BasicEntity/BasicEntityModel';
import { BasicRepository } from './../../infrastructure-layer/BasicRepository';

export class BasicService implements IService<BasicEntityModel, BasicEntity, BasicRepository> {

    private repository: BasicRepository;
    constructor(repository: BasicRepository) {
        this.repository = repository;
    }

    public create(entity: BasicEntity) {
        this.repository.create(entity);
    }
    public update(): (entity: BasicEntity) => void {
        throw new Error('Method not implemented.');
    }
    public delete(): (entity: BasicEntity) => void {
        throw new Error('Method not implemented.');
    }
    public findAll(): (entity: BasicEntity) => void {
        throw new Error('Method not implemented.');
    }
    public fetch(): (entity: BasicEntity) => void {
        throw new Error('Method not implemented.');
    }
}
