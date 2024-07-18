import { AppDataSource } from '../config/database.config';
import { DotenvConfig } from '../config/env.config';
import { VendorItem } from '../entities/vendor/vendor.entity';
import HttpException from '../utils/HttpException.utils';
import mediaService from './media.service';

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

    async createItemWithMedia(data: VendorItem, id: string, mediaId: string) {
        try {
            data.mediaId = mediaId;
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
                .getRawOne(); // Use getRawOne() to get raw data with aliases

            return result;
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }
    // commenting
    // async deleteItem(itemId: string, vendorId: string) {
    //     console.log(itemId, vendorId)
    //     try {
    //         const check = await this.getById(itemId);

    //         if (check) {
    //             await this.vendorItem.manager.transaction(async transactionalEntityManager => {
    //                 // Load the VendorItem entity with its related Media
    //                 const item = await transactionalEntityManager.findOne(VendorItem, {
    //                     where: { id: itemId, vendorId: vendorId },
    //                     relations: ['media']
    //                 });

    //                 if (item) {
    //                     // Delete the related Media entity first
    //                     if (item.media) {
    //                         await transactionalEntityManager.delete(Media, item.media.id);
    //                     }
    //                     // Then delete the VendorItem entity
    //                     await transactionalEntityManager.delete(VendorItem, item.id);
    //                 }
    //             });

    //         }

    //     } catch (error: any) {
    //         throw HttpException.badRequest(error?.message);
    //     }
    // }

    async deleteItem(itemId: string, vendorId: string) {
        try {
            const check = await this.getById(itemId);
            const mediaId = check.image_id;
            const mediaDelete = await mediaService.deleteMediaService(
                mediaId,
                check.image_url
            );

            if (mediaDelete) {
                await this.vendorItem
                    .createQueryBuilder('vendor')
                    .delete()
                    .from(VendorItem)
                    .where('id = :id and vendorId = :vendorId', {
                        id: itemId,
                        vendorId: vendorId,
                    })
                    .execute();
            }
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }
}

export default new vendorService();
