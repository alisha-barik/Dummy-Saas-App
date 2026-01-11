import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export const userLoginService = async (email, password) => {

  if (!email || !password)
    throw new Error("MISSING_FIELDS");

  const user = await User.findOne({ email }).select("+password");
  if (!user)
    //return res.status(401).json({ message: "Wrong Email id or password." });
  throw new Error("INVALID_CREDENTIALS");

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword)
    //return res.status(401).json({ message: "Wrong Email id or password." });
  throw new Error("INVALID_CREDENTIALS");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateAccessToken(user)

  user.refreshToken = refreshToken;
  await user.save();

  // user.cookie("refreshToken" , refreshToken, {
  //   httpOnly : true,
  //   secure : true,
  //   sameSite : "strict",
  // })

  // return res
  //   .status(200)
  //   .json({ accessToken, message: "User created Successfully." });

  return { accessToken, refreshToken };
}

export async function userSignupService(name, email, password) {
    if (!name || !email || !password)
     throw new Error("MISSING_FIELDS")

    const user = await User.findOne({ email });
    if (user) throw new Error("USER_EXISTS")
console.log("name, email, password", name, email, password)
    const createUser = await User.create({
      name,
      email,
      password,
      role: "user",
    });
    console.log("---", createUser)
}