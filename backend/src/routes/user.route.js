import express from "express";
import { authRateLimiter } from "../middlewares/rateLimiter.js";
import { userLogin, userSignup } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", authRateLimiter, userLogin);
router.post("/signup", authRateLimiter, userSignup);
// router.post("/refresh", authRateLimiter, refreshToken);
// router.get("/logout", userLogout);

export default router;
