import { generateToken } from "../utils.js";

export class SessionsController {
  //sign up
  static redirectLogin = async (req, res) => {
    res.render("login", {
      message: "Usuario creado satisfactoriamente",
      style: "login.css",
    });
  };

  //fail signup
  static failSignup = (req, res) => {
    //ESTO NO ANDA
    res.render("signup", {
      error: "Error al crear el usuario",
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

  //fail login
  static failLogin = (req, res) => {
    //ESTO NO ANDA
    res.render("login", { error: "Error al loguarse", style: "login.css" });
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
