import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from './Users';

@Entity()
export class Passwords {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'password_grp' })
    public passwordGroup: number;

    @Column({ name: 'password' })
    public password: string;

    @Column({ name: 'created_at' })
    public createdAt: Date;

    @ManyToOne((type) => Users, (user) => user.nuid)
    public user: Users;
}
