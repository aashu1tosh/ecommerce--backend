import { IsNotEmpty, IsString, Matches, NotEquals } from 'class-validator';
import { passwordRegex } from '../utils/regex';

export class ResetPasswordDTO {
    @IsNotEmpty()
    @IsString()
    id: string;
}
