import cron from 'node-cron';
import { AppDataSource } from '../../../config/database.config';
import { Media } from '../../../entities/vendor/media.entity';
import Print from '../../../utils/print';
import mediaService from '../../media.service';

class MediaCronService {
    constructor(
        private readonly mediaRepo = AppDataSource.getRepository(Media)
        // private readonly mediaService = mediaService
    ) {}
    async cronStart() {
        try {
            const task = cron.schedule('* * */22 * * *', async () => {
                console.log('running a task every 22 hours');
                const hourAgo = new Date(Date.now() - 60 * 60 * 1000);

                const items = await this.mediaRepo
                    .createQueryBuilder('media')
                    .leftJoinAndSelect('media.item', 'vendorPostItem')
                    .where('vendorPostItem.id IS NULL')
                    .andWhere('media.createdAt < :hourAgo', { hourAgo })
                    .getMany();

                items.forEach(async (item) => {
                    const response = await mediaService.deleteMediaService(
                        item?.id as string,
                        item?.filepath
                    );
                    // Print.info(response.messaged)
                });
            });
            task.start();
        } catch (error: any) {
            console.log(error);
            Print.error(error?.message);
        }
    }
}

export default new MediaCronService();
