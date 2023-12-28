import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "./config/config.js";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

//generar hash
export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};
//comparar passwords
export const isValidPassword = (password, user) => {
  return bcrypt.compareSync(password, user.password);
};

//generar token
export const generateToken = (user) => {
  const token = jwt.sign(
    {
      fullName: user.fullName,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      email: user.email,
      role: user.role,
      _id: user._id,
    },
    config.token.privateKey,
    {
      expiresIn: "24h",
    }
  );

  return token;
};
