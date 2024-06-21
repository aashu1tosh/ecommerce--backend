import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class PostItemDTO {
    @IsNotEmpty()
    @Length(2, 30)
    name: string;

    @IsNotEmpty()
    @IsString()
    price: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    tags: string[];

    @IsOptional()
    @IsString()
    image: string;
}
