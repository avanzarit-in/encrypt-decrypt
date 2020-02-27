import 'reflect-metadata';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Users {
    @PrimaryColumn()
    public nuid?: number;

    @Column()
    public pin?: string;

    @Column({ name: 'created_at' })
    public createdAt?: Date;
}
