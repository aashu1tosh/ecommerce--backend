import { AppDataSource } from '../config/database.config';
import { VendorItem } from '../entities/vendor/vendor.entity';
import HttpException from '../utils/HttpException.utils';

class vendorService {
    constructor(
        private readonly vendorItem = AppDataSource.getRepository(VendorItem)
    ) {}

    async createItem(data: VendorItem, id: string) {
        try {
            const item = this.vendorItem.create(data);
            item.vendorId = id;
            const response = await this.vendorItem.save(item);
            return response;
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }
}

export default new vendorService();
