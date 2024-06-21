import { AppDataSource } from '../config/database.config';
import { ROLE } from '../constant/enum';
import { ResetPasswordDTO } from '../dto/admin.dto';
import { Auth } from '../entities/auth/auth.entity';
import HttpException from '../utils/HttpException.utils';
import BcryptService from './bcrypt.service';

class AdminService {
    constructor(
        private readonly AuthRepo = AppDataSource.getRepository(Auth),
        private readonly bcrpytService = new BcryptService()
    ) {}

    async getAll(page: number, perpage: number) {
        const query = this.AuthRepo.createQueryBuilder('auth')
            .select([
                'auth.id',
                'auth.name',
                'auth.email',
                'auth.phone',
                'auth.role',
            ])
            .where('auth.role != :role', { role: 'ADMIN' });

        query
            .orderBy('auth.createdAt')
            .limit(perpage)
            .offset((page - 1) * perpage);

        const [data, total] = await query.getManyAndCount();
        return { data, total };
    }

    async getById(id: string) {
        return await this.AuthRepo.createQueryBuilder('auth')
            .select([
                'auth.id',
                'auth.name',
                'auth.email',
                'auth.phone',
                'auth.role',
            ])
            .where('id = :id', { id: id })
            .getOne();
    }

    async resetPassword(data: ResetPasswordDTO) {
        const hash = await this.bcrpytService.hash(data?.newPassword);
        const response = await this.AuthRepo.createQueryBuilder()
            .update(Auth)
            .set({
                password: hash,
            })
            .where('id = :id', { id: data.id })
            .execute();
        return response;
    }

    async deleteUser(id: string) {
        const user = await this.getById(id);
        if (user?.role === ROLE.ADMIN)
            throw HttpException.forbidden('Admin cannot be deleted.');
        await this.AuthRepo.createQueryBuilder()
            .delete()
            .from(Auth)
            .where('id = :id', { id: id })
            .execute();
        return null;
    }
}

export default new AdminService();
