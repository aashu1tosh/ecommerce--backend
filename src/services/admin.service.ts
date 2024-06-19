import { AppDataSource } from "../config/database.config";
import { ResetPasswordDTO } from "../dto/admin.dto";
import { Auth } from "../entities/auth/auth.entity";
import BcryptService from "./bcrypt.service";

class AdminService {
  constructor(
    private readonly AuthRepo = AppDataSource.getRepository(Auth),
    private readonly bcrpytService = new BcryptService()
  ) {}

  async getAll() {
    const response = await this.AuthRepo.createQueryBuilder("auth")
      .select(["auth.id", "auth.name", "auth.email", "auth.phone", "auth.role"])
      .where("auth.role != :role", { role: "ADMIN" })
      .getMany();
    return response;
  }

  async resetPassword(data: ResetPasswordDTO) {
    console.log(data);
    const hash = await this.bcrpytService.hash(data?.newPassword);
    const response = await this.AuthRepo.createQueryBuilder()
      .update(Auth)
      .set({
        password: hash,
      })
      .where("id = :id", { id: data.id })
      .execute();
    return response;
  }

  // async deleteUser(data: string) {

  //   console.log(data)
  // }
}

export default new AdminService();
