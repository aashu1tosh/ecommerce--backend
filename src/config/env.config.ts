import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export class DotenvConfig {
    static NODE_ENV = process.env.NODE_ENV;
    static PORT = +process.env.PORT!;

    // *Database Configurations
    static DATABASE_HOST = process.env.DATABASE_HOST;
    static DATABASE_PORT = +process.env.DATABASE_PORT!;
    static DATABASE_USERNAME = process.env.DATABASE_USERNAME;
    static DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
    static DATABASE_NAME = process.env.DATABASE_NAME;

    // JWT SECRET
    static JWT_SECRET = process.env.JWT_SECRET;
    static JWT_TOKEN_EXPIRE = process.env.JWT_TOKEN_EXPIRE;

    // SEED ADMIN PASSWORD
    static ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

    // MAIL SERVICE
    static MAIL_HOST = process.env.MAIL_HOST!;
    static MAIL_PORT = +process.env.MAIL_PORT!;
    static EMAIL_USER = process.env.EMAIL_USER!;
    static EMAIL_PASSWORD = process.env.EMAIL_PASSWORD!;

    // BACKEND URL
    static BACKEND_URL = process.env
        .BACKEND_URL!.concat(':')
        .concat(process.env.PORT!)
        .concat('/');

    // DEBUG_MODE
    static DEBUG_MODE = process.env.DEBUG_MODE;

    // CORS LIST
    static CORS_ORIGIN = process.env.CORS_ORIGIN?.split(',') || [];
}
