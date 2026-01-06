import rateLimite from "express-rate-limit"

export const limiter = rateLimite({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP address to 100 requests per 15 minutes
    standardHeaders: true,
    legacyHeaders: false,
})