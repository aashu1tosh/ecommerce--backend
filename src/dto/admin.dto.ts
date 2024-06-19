import { IsNotEmpty, IsString, Matches, NotEquals } from "class-validator"
import { passwordRegex } from "../utils/regex"

export class ResetPasswordDTO {

    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    @NotEquals('oldPassword', { message: 'New Password must be different from old password' })
    @Matches(passwordRegex, {
        message: 'Password must contain at least one uppercase letter and one lowercase letter',
    })
    newPassword: string
}