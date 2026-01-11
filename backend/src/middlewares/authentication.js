import jwt from "jsonwebtoken";

export const authentication = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("authHeader------>", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log(
        "dddddddd data is token---------------->",
        process.env.SECRET_KEY
      );
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log(
      "decoded data is token---------------->",
      process.env.SECRET_KEY
    );

    const token = authHeader.split(" ")[1];

    console.log(
      "decoded data is token---------------->",
      token,
      process.env.SECRET_KEY
    );
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log("decoded data is ->", decoded);
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.log(err);

    return res.status(401).json({ message: "Unauthorized" });
  }
};
