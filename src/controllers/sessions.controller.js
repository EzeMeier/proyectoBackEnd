import { generateToken } from "../utils.js";
import { CustomError } from "../services/errors/customError.service.js";
import {
  authError,
  loginError,
} from "../services/errors/createError.service.js";
import { EError } from "../enums/EError.js";
import { logger } from "../helpers/logger.js";

export class SessionsController {
  //sign up
  static redirectLogin = async (req, res) => {
    res.render("login", {
      message: "Usuario creado satisfactoriamente",
      style: "login.css",
    });
  };

  //FAIL SIGNUP
  static failSignup = (req, res) => {
    const signupError = CustomError.createError({
      name: "Sign up error",
      cause: authError(),
      message: authError(),
      code: EError.AUTH_ERROR,
    });
    res.render("signup", {
      error: signupError,
      style: "signup.css",
    });
  };

  //log in
  static login = async (req, res) => {
    const token = generateToken(req.user);
    res
      .cookie("cookieToken", token)
      .json({ status: "success", message: "Logueo satisfactorio" });
  };

  //FAIL LOGIN
  static failLogin = (req, res) => {
    const errorLogin = CustomError.createError({
      name: "Error al realizar el log in",
      cause: loginError(),
      message: "Email o contraseña ncorrecta",
      code: EError.AUTH_ERROR,
    });

    res.render("login", { error: errorLogin, style: "login.css" });
  };


  //sign up with github
  static signupGithub = (req, res) => {
    const token = generateToken(req.user);
    res.cookie("cookieToken", token).render("profile", {
      style: "profile.css",
    });
  };

  //log in up with github
  static loginGithub = (req, res) => {
    const token = generateToken(req.user);
    res
      .cookie("cookieToken", token)
      .redirect("/profile", 200, { style: "profile.css" });
  };

  //profile
  static profile = async (req, res) => {
    try {
      console.log(req.user);
      res.json({ status: "success", message: "Respuesta correcta", data: req.user });
    } catch (error) {
      console.log(error);
    }
  };

  //fail auth
  static failAuth = (req, res) => {
    res.json({ status: "error", message: "Token invalido" });
  };

  //logout
  static logout = async (req, res) => {
    try {
      res.clearCookie("cookieToken");
      res.redirect("/login", 200, { style: "login.css" });
    } catch (error) {
      res.render("profile", { error: "Error al loguarse", style: "profile.css" });
    }
  };
}
