import { AppDataSource } from '../config/database.config';
import { DotenvConfig } from '../config/env.config';
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

            data.forEach((obj: { image_url: string }) => {
                obj.image_url =
                    DotenvConfig.BACKEND_URL +
                    obj.image_url.split('public/')[1];
            });

            const total = await count_query.getCount();
            return { data, total };
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }
}
export default new CustomerService();
