import { Column, Entity } from 'typeorm';
import Base from '../base.entity';

import { JoinColumn, ManyToOne } from 'typeorm';
import { Auth } from './../auth/auth.entity'; // Adjust the import path as necessary

@Entity('VendorItem')
export class VendorItem extends Base {
    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column('simple-array')
    tags: string[];

    @ManyToOne(() => Auth)
    @JoinColumn({ name: 'vendorId' }) // Specifies the name of the foreign key column
    auth: Auth;

    @Column()
    vendorId: string; // Foreign key column
}
