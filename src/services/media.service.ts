import { DeepPartial } from 'typeorm';
import { AppDataSource } from '../config/database.config';
import { Media } from '../entities/vendor/media.entity';
import { ImageInterface } from '../interface/media.interface';
import HttpException from '../utils/HttpException.utils';
import { convertImageToMedia } from '../utils/imageToMedia.utils';

class mediaService {
    constructor(private readonly media = AppDataSource.getRepository(Media)) {}

    async addMedia(data: ImageInterface) {
        try {
            const partialMedia: DeepPartial<Media> = convertImageToMedia(data);
            const item = this.media.create(partialMedia);
            const response = await this.media.save(item);
            return response;
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }

    async deleteMedia(id: string) {
        try {
            const item = await this.media
                .createQueryBuilder('media')
                .delete()
                .from(Media)
                .where('id = :id', {
                    id: id,
                })
                .execute();
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }
}

export default new mediaService();
