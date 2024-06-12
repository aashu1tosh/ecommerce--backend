import { Request, Response, Router } from "express"
import ping from './ping.route'

interface Route {
    path: string,
    route: Router
}

const router = Router()
const routes: Route[] = [
    {
        path: '/ping',
        route: ping,
    },
    {
        path: '/auth',
        route: ping
    },
    {
        path: '/customer',
        route: ping
    },
    {
        path: '/agent',
        route: ping
    },
    {
        path: '/admin',
        route: ping
    }
]

routes.forEach((route) => {
    router.use(route.path, route.route);
})

router.get('/', (req: Request, res: Response) => {
    res.send({
        success: true,
        message: 'Welcome to Real State API',
        main: []
    })
})

export default router