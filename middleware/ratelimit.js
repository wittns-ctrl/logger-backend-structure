import ratelimit from "express-rate-limit";
export const loginlimiter = ratelimit(
    {
        windowMs: 10*60*1000,
        max:5,
        message:"you've reached your limit , please try later"
    }
)


export const limiter = ratelimit({
    windowMs: 15*60*1000,
    max: 15,
    message: "you've reached your limit , please try late"
})