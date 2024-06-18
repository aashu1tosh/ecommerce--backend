import { jwtDecode } from "jwt-decode";
import { AppDataSource } from "../config/database.config";
import { ROLE } from "../constant/enum";
import { Auth } from "../entities/auth/auth.entity";
import HttpException from "../utils/HttpException.utils";
import BcryptService from "./bcrypt.service";
import Print from "../utils/print";

class AuthService {


    constructor(
        private readonly AuthRepo = AppDataSource.getRepository(Auth),
        private readonly bcryptService = new BcryptService()
    ) { }

    async createUser(data: Auth) {
        try {
            console.log(data, "data arg printed")
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
            const response = await this.AuthRepo.save(user);
            console.log(response)
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

    async googleLogin(googleId: any) {
        const decoded: any = jwtDecode(googleId);
        const user = await this.AuthRepo.findOne({
            where: { email: decoded.email },
        })
        if (!user) {

            try {
                const user = this.AuthRepo.create();

                user.name = decoded.name
                user.email = decoded.email
                user.password = await this.bcryptService.hash(decoded.sub)
                user.role = ROLE.USER;

                const google_user = await this.AuthRepo.save(user);
                const { password, createdAt, deletedAt, ...response } = google_user;
                return response
            } catch (error) {
                console.log(error)
                Print.error("Error occured");
                // throw HttpException.badRequest("Invalid Credentials")
            }
        }
    }
}

export default new AuthService()