import { AppDataSource } from '../../config/database.config';
import { Auth } from '../../entities/auth/auth.entity';

class RoleService {
    constructor(
        private readonly AuthRepo = AppDataSource.getRepository(Auth)
    ) {}

    async getRole(id: string) {
        const response = await this.AuthRepo.createQueryBuilder('auth')
            .select(['auth.role'])
            .where('auth.id = :id', { id: id })
            .getOne();
        // console.log(role);
        return response?.role;
    }
}

export default new RoleService();
