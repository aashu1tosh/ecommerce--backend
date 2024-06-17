import { AppDataSource } from "../config/database.config";
import { Auth } from "../entities/auth/auth.entity";
import HttpException from "../utils/HttpException.utils";
import BcryptService from "./bcrypt.service";

class AuthService {

    constructor(
        private readonly AuthRepo = AppDataSource.getRepository(Auth),
        private readonly bcryptService = new BcryptService()
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
            const hash = await this.bcryptService.hash(data?.password);
            user.password = hash;
            await this.AuthRepo.save(user);

            return null;
        } catch (error: any) {
            // console.log("yeta aako error")
            // console.log(error)
            throw HttpException.badRequest(error?.message)
        }

    }

    async loginUser(data: Auth) {
        try {
            // const response = {}
            let user = await this.AuthRepo.findOne({
                where: { email: data?.email }
            });

            if (user) {
                if (await this.bcryptService.compare(data.password, user.password)) {
                    // { user?.password, ...response } = user
                    const { password, createdAt, deletedAt, ...response } = user
                    return response
                }
            }
            throw HttpException.unauthorized("Invalid Credentials");
        } catch (error: any) {
            throw HttpException.badRequest(error?.message)
        }
    }

}

export default new AuthService()