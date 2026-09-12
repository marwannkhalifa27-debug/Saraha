

export const loggerMiddleware = (req,res,next) => {
    console.log(`${req.originalUrl} ${req.method} ${new Date().toISOString()} `)
    next()
}