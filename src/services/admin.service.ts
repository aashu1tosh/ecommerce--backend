import { AppDataSource } from '../config/database.config';
import { ROLE } from '../constant/enum';
import { ResetPasswordDTO } from '../dto/admin.dto';
import { Auth } from '../entities/auth/auth.entity';
import HttpException from '../utils/HttpException.utils';
import generateStrongPassword from '../utils/generatePassword.utils';
import BcryptService from './bcrypt.service';
import { EmailService, IMailOptions } from './utils/email.service';

class AdminService {
    constructor(
        private readonly AuthRepo = AppDataSource.getRepository(Auth),
        private readonly bcrpytService = new BcryptService(),
        private readonly emailService = new EmailService()
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
        try {
            const user = await this.AuthRepo.findOneBy({ id: data?.id });

            if (!user) throw HttpException.badRequest('Invalid Id is passed');

            const password = generateStrongPassword();
            const hash = await this.bcrpytService.hash(password);
            const response = await this.AuthRepo.createQueryBuilder()
                .update(Auth)
                .set({
                    password: hash,
                })
                .where('id = :id', { id: data.id })
                .execute();

            const mailOptions: IMailOptions = {
                to: user?.email,
                subject: 'Regarding Password Reset in E-commerce',
                text: 'Your new password is: ' + password,
            };
            this.emailService.sendMail(mailOptions);
            return response;
        } catch (error) {
            throw HttpException.internalServerError('Something went wrong');
        }
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
