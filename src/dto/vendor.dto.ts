import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class PostItemDTO {
    @IsNotEmpty()
    @Length(3, 30)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @IsString()
    mediaId: string;
}

export class MediaUploadDTO {
    @IsNotEmpty()
    @IsString()
    filename: string;

    @IsNotEmpty()
    @IsString()
    filepath: string;
}