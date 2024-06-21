import { Column, Entity } from 'typeorm';
import { ROLE } from '../../constant/enum';
import Base from '../base.entity';

@Entity('Auth')
export class Auth extends Base {
    @Column()
    name: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column({
        unique: true,
        nullable: true,
    })
    phone: string;

    @Column()
    role: ROLE;
}
