import {
  userLoginService,
  userSignupService,
} from "../services/user.service.js";

export async function userSignup(req, res) {
  try {
    console.log("signupppppppp firedddddd", req.body)
    const { name, email, password } = req.body;
    await userSignupService(name, email, password);
    console.log("fffffffffffffffff ggggggggggggggg", req.body)
    res.status(201).json({ message: "User created Successfully" });
  } catch (err) {
    console.log("rrrrrrrrrrrrrr eeeeeeeee", req.body)
    if (err.message === "USER_EXISTS")
      return res.status(409).json({ message: "User already exists." });
  
  return res.status(500).json({ message: "Server Error" });
}
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await userLoginService(
      email,
      password
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/api/auth/refresh",
    });

    return res.status(200).json({
      accessToken,
      message: "Login successful",
    });
  } catch (err) {
    if (err.message === "MISSING_FIELDS") {
      return res.status(400).json({ message: "Missing fields" });
    }
    if (err.message === "INVALID_CREDENTIALS") {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.status(500).json({ message: "Server error" });
  }
}
