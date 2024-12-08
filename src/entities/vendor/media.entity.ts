import { Column, Entity, OneToOne } from 'typeorm';
import Base from '../base.entity';

import { VendorItem } from './vendor.entity';

@Entity('Media')
export class Media extends Base {
    @Column()
    filename: string;

    @Column()
    filepath: string;

    @OneToOne(() => VendorItem, (item) => item.media)
    item: VendorItem;
}
