import { ROLE } from '../constant/enum';

export interface IAdmin {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: ROLE;
}
