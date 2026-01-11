import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userModel = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

userModel.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userModel);
export default User;
