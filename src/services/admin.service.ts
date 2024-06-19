import { AppDataSource } from "../config/database.config";
import { Auth } from "../entities/auth/auth.entity";

class AdminService {

    constructor(
        private readonly AuthRepo = AppDataSource.getRepository(Auth),
    ) { }

    async getAll() {
        const response = await this.AuthRepo.createQueryBuilder("auth")
            .select(["auth.id", "auth.name", "auth.email", "auth.phone", "auth.role"])
            .where("auth.role != :role", { role: "ADMIN" })
            .getMany();
        return response;
    }

    async resetPassword() {
        const response = await null;
        return response;
    }

}

export default new AdminService()