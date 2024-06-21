import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    Length,
    Matches,
} from 'class-validator';
import { ROLE } from '../constant/enum';
import { passwordRegex, phoneNumberRegex } from '../utils/regex';

export class PostItemDTO {
    @IsNotEmpty()
    @Length(5, 30)
    name: string;

    @IsNotEmpty()
    price: string;

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    tags: string[];
}
