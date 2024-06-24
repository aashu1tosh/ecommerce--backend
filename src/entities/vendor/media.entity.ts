import { Column, Entity, OneToOne } from 'typeorm';
import Base from '../base.entity';

import { JoinColumn, ManyToOne } from 'typeorm';
import { Auth } from './../auth/auth.entity';


@Entity('Media')
export class Media extends Base {
    @Column()
    filename: string;

    @Column()
    filepath: string;
}
