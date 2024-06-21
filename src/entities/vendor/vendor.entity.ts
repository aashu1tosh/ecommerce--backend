import { Column, Entity } from 'typeorm';
import Base from '../base.entity';

import { JoinColumn, ManyToOne } from 'typeorm';
import { Auth } from './../auth/auth.entity'

@Entity('VendorItem')
export class VendorItem extends Base {
    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column({ name: 'tags', array: true })
    tags: string[];

    @ManyToOne(() => Auth)
    @JoinColumn({ name: 'vendorId' }) // Specifies the name of the foreign key column
    auth: Auth;

    @Column()
    vendorId: string; // Foreign key column
}
