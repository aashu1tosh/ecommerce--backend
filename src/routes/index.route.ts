import { Request, Response, Router } from 'express';
import admin from './admin.route';
import auth from './auth.route';
import ping from './ping.route';
import vendor from './vendor.route';
import customer from './customer.route';

interface Route {
    path: string;
    route: Router;
}

const router = Router();
const routes: Route[] = [
    {
        path: '/ping',
        route: ping,
    },
    {
        path: '/auth',
        route: auth,
    },
    {
        path: '/customer',
        route: customer,
    },
    {
        path: '/vendor',
        route: vendor,
    },
    {
        path: '/admin',
        route: admin,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

router.get('/', (req: Request, res: Response) => {
    res.send({
        success: true,
        message: 'Welcome to E-Commerce API',
    });
});

export default router;
