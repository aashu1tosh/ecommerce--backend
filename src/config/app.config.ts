import express from 'express'
import sanitizeHtml from 'sanitize-html'

const app = express()

app.use((req, res, next) => {
    res.locals.sanitizeHtml = sanitizeHtml
    next()
})


export default app