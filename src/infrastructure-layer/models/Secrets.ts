import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Users } from './Users';

@Entity()
export class Secrets {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'secret_date' })
    public secretDate: string;

    @Column({ name: 'ivr_answer_id' })
    public ivrAnswerId: number;

    @Column({ name: 'created_at' })
    public createdAt: Date;

    @OneToOne((type) => Users)
    @JoinColumn()
    public user: Users;
}

