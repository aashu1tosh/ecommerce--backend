import { Response, Router } from "express"


const router = Router()

router.get('/', (_, res: Response) => {
    res.send({
        success: true,
        message: "pong",
        main: []
    })
})

export default router