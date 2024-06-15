import { AppDataSource } from "../config/database.config";
import { Auth } from "../entities/auth/auth.entity";
import HttpException from "../utils/HttpException.utils";

class AuthService {

    constructor(
        private readonly AuthRepo = AppDataSource.getRepository(Auth)
    ) { }

    async createUser(data: Auth) {
        try {
            const user = this.AuthRepo.create(data);

            const uniqueEmail = this.AuthRepo.findOne({
                where: { email: data?.email },
            });
            const uniquePhoneNumber = this.AuthRepo.findOne({
                where: { phone: data?.phone }
            });

            if (await uniqueEmail) {
                throw HttpException.badRequest("Email already registered")
            }

            if (await uniquePhoneNumber) {
                throw HttpException.badRequest("Phone number already registered")
            }
            await this.AuthRepo.save(user);
            return "Created Successfully."
        } catch (error: any) {
            // console.log("yeta aako error")
            // console.log(error)
            throw HttpException.badRequest(error?.message)
        }
    }
}

export default new AuthService()