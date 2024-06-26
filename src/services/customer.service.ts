import { AppDataSource } from '../config/database.config';
import { VendorItem } from '../entities/vendor/vendor.entity';
import HttpException from '../utils/HttpException.utils';

class CustomerService {
    constructor(
        private readonly vendorItem = AppDataSource.getRepository(VendorItem)
    ) {}

    async getAll(page: number, perpage: number) {
        try {
            const result = await this.vendorItem
                .createQueryBuilder('product')
                .select([
                    'vendor.name',
                    'vendor.email',
                    'vendor.phone',
                    'product.name',
                    'product.price',
                    'product.description',
                    'product.tags',
                    'product.vendorId',
                    'm.filepath as image_url',
                ])
                .innerJoin('Auth', 'vendor', 'vendor.id = product.vendorId')
                .innerJoin('Media', 'm', 'product.mediaId = m.id');

            const count_query = result;
            result
                .orderBy('product.createdAt')
                .limit(perpage)
                .offset((page - 1) * perpage);

            const data = await result.execute();

            const total = await count_query.getCount();
            return { data, total };

            // const [data, total] = await result.getManyAndCount();
            // return { data, total };
            // return result;
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }
}
export default new CustomerService();
