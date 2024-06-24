import { Column, Entity, OneToOne } from 'typeorm';
import Base from '../base.entity';

import { JoinColumn, ManyToOne } from 'typeorm';
import { Auth } from './../auth/auth.entity';
import { Media } from './media.entity';


@Entity('VendorItem')
export class VendorItem extends Base {
    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column("text", { array: true, nullable: true })
    tags: string[];

    @ManyToOne(() => Auth)
    @JoinColumn({ name: 'vendorId' }) // Specifies the name of the foreign key column
    auth: Auth;

    @Column()
    vendorId: string; // Foreign key column

    @OneToOne(() => Media)
    @JoinColumn({ name: 'mediaId' })
    media: Media;

    @Column()
    mediaId: string;
}
