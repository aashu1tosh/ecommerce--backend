import { AppDataSource } from '../config/database.config';
import { admins } from '../constant/admin';
import { Auth } from '../entities/auth/auth.entity';
import { IAdmin } from '../interface/admin.interface';
import BcryptService from '../services/bcrypt.service';
import HttpException from '../utils/HttpException.utils';
import Print from '../utils/print';

async function seedAdmin(data: IAdmin) {
    try {
        await AppDataSource.initialize();
        const authRepo = AppDataSource.getRepository(Auth);
        const bcrpytService = new BcryptService();

        const existingAdmin = await authRepo
            .createQueryBuilder('auth')
            .where('auth.email = :email', { email: data.email })
            .orWhere('auth.phone = :phone', { phone: data.phone })
            .getOne();

        if (existingAdmin) {
            throw HttpException.conflict('Phone or email must be unique.');
        }

        const user = authRepo.create(data);
        const hash = await bcrpytService.hash(data?.password);
        user.password = hash;
        await authRepo.save(user);
        Print.info(`${data?.email} seeded successfully`);
    } catch (error) {
        Print.error(`Seeding Admin Failed`);
        console.error(error);
    }
}

const args = process.argv[2];
if (!args) {
    console.error('Please provide an argument');
    process.exit(1);
}

if (args === 'seed') {
    void seedAdmin(admins);
} else {
    console.error('Invalid argument');
    process.exit(1);
}
