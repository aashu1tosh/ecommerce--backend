import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import createUUID from '../utils/uuid.utils';

abstract class Base extends BaseEntity {
    @Column({ primary: true, type: 'uuid' })
    id: string | undefined;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date | undefined;

    @UpdateDateColumn({ name: 'update_at', select: false })
    updatedAt: Date | undefined;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date | undefined;

    @BeforeInsert()
    async UUID() {
        this.id = await createUUID();
    }
}

export default Base;
