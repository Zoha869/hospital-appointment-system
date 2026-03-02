import jwt from "jsonwebtoken";

const auth = (req, res, next) => {

  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  // Accept both raw token or "Bearer <token>" formats
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const secret = process.env.JWT_SECRET || "dev_jwt_secret_change_me";
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }

};

export default auth;