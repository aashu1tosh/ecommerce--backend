import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    Length,
    Matches
} from 'class-validator';
import { ROLE } from '../constant/enum';
import { passwordRegex, phoneNumberRegex } from '../utils/regex';

export class CreateUserDTO {
    @IsNotEmpty()
    @Length(5, 30)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(passwordRegex, {
        message: 'Password must contain at least one uppercase letter and one lowercase letter',
    })
    password: string;

    @IsNotEmpty()
    @Matches(phoneNumberRegex, {
        message: 'Enter a valid phone number'
    })
    phone: string;

    @IsNotEmpty()
    @IsEnum(ROLE)
    role: string;
}

export class LoginUserDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(passwordRegex, {
        message: 'Password must contain at least one uppercase letter and one lowercase letter',
    })
    password: string;
}

export class GoogleLoginDTO {
    @IsNotEmpty()
    @IsString()
    googleId: string
}
