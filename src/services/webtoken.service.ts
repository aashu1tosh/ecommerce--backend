import jwt from 'jsonwebtoken';
import { DotenvConfig } from '../config/env.config';

class WebTokenServices {
    sign(id: string) {
        const token = jwt.sign({ id }, DotenvConfig.JWT_SECRET as string, {
            expiresIn: DotenvConfig.JWT_TOKEN_EXPIRE,
        });
        return token;
    }

    verify(token: string) {
        return jwt.verify(token, DotenvConfig.JWT_SECRET as string);
    }
}

export default new WebTokenServices();
