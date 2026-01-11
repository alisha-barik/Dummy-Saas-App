import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
    const payload = {
        userId : user._id,
        role : user.role
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "15m"})
}

export const generateRefreshToken = (user) => {
    const payload = {
        userId : user._id
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "7d"})
}