import { DeepPartial } from 'typeorm/common/DeepPartial';
import { ImageInterface } from '../interface/media.interface';
import { Media } from '../entities/vendor/media.entity';

export function convertImageToMedia(image: ImageInterface): DeepPartial<Media> {
    return {
        filename: image.filename,
        filepath: image.filepath,
        // map other properties as needed
    };
}
