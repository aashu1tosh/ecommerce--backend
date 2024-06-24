import { AppDataSource } from '../config/database.config';
import { VendorItem } from '../entities/vendor/vendor.entity';
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

    async getById(id: string) {
        try {
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }

    async deleteItem(itemId: string, vendorId: any) {
        try {
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
