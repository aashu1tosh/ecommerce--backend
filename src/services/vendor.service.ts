import { AppDataSource } from '../config/database.config';
import { DotenvConfig } from '../config/env.config';
import { VendorItem } from '../entities/vendor/vendor.entity';
import mediaService from '../services/media.service';
import HttpException from '../utils/HttpException.utils';

class vendorService {
    constructor(
        private readonly vendorItem = AppDataSource.getRepository(VendorItem)
    ) {}

    async createItem(data: VendorItem, id: string) {
        try {
            const existingMedia = await this.vendorItem
                .createQueryBuilder('item')
                .select(['item.mediaId'])
                .where('item.mediaId = :id', { id: data.mediaId })
                .getOne();

            if (existingMedia) {
                throw HttpException.badRequest('Media Id can not be reused');
            }
            const item = this.vendorItem.create(data);
            item.vendorId = id;
            const response = await this.vendorItem.save(item);
            return response;
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }

    async getAll(id: string) {
        try {
            const result = await this.vendorItem
                .createQueryBuilder('p')
                .select([
                    'p.name AS name',
                    'p.price AS price',
                    'p.description AS description',
                    'p.vendorId AS vendor_id',
                    'm.filepath AS image_url',
                ])
                .innerJoin('p.media', 'm')
                .where('p.vendorId = :id', { id: id })
                .execute();

            result.forEach((obj: { image_url: string }) => {
                obj.image_url =
                    DotenvConfig.BACKEND_URL +
                    obj.image_url.split('public/')[1];
            });

            return result;
        } catch (error) {
            throw HttpException.internalServerError('Something went south.');
        }
    }

    async getById(id: string) {
        try {
            const result = await this.vendorItem
                .createQueryBuilder('p')
                .select([
                    'p.name AS name',
                    'p.price AS price',
                    'p.description AS description',
                    'p.vendorId AS vendor_id',
                    'm.id AS image_id',
                    'm.filepath AS image_url',
                ])
                .innerJoin('p.media', 'm')
                .where('p.id = :id', { id: id })
                .execute();

            return result;
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }

    async deleteItem(itemId: string, vendorId: string) {
        try {
            const check = await this.getById(itemId);

            const mediaDelete = await mediaService.deleteMedia(
                check.image_id as string
            );

            const item = await this.vendorItem
                .createQueryBuilder('vendor')
                .delete()
                .from(VendorItem)
                .where('id = :id and vendorId = :vendorId', {
                    id: itemId,
                    vendorId: vendorId,
                })
                .execute();
            if (!item?.affected)
                throw HttpException.badRequest('Item Id not found');
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }
}

export default new vendorService();
