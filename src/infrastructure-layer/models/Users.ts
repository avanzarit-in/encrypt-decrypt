import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    public nuid: number;

    @Column()
    public pin: string;

    @Column({name:"created_at"})
    public createdAt: Date;
}
