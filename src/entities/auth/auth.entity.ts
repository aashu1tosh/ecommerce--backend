import { Column, Entity } from "typeorm";
import Base from "../base.entity";


@Entity('Auth')
export class Auth extends Base {

    @Column()
    name: string

    @Column({
        unique: true
    })
    email: string

    @Column({
        unique: true
    })
    phone: string

    @Column()
    role: string
}