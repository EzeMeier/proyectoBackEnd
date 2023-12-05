import { CartsService } from "../services/carts.service.js";
import { ProductsService } from "../services/products.service.js";

export class ViewsController {
  //shop
  static shop = async (req, res) => {
    try {
      const { limit = 3, page = 1, sort = { price: 1 } } = req.query;
      const query = {};
      const options = {
        limit,
        page,
        sort,
        lean: true,
      };
      const products = await ProductsService.getProductsPaginate(
        query,
        options
      );
      const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
      const data = {
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage
          ? //reemplaza la pagina actual, por la pagina anterior
            `${baseUrl.replace(
              `page=${products.page}`,
              `page=${products.prevPage}`
            )}`
          : null,
        nextLink: products.hasNextPage
          ? baseUrl.includes("page")
            ? baseUrl.replace(
                `page=${products.page}`,
                `page=${products.nextPage}`
              )
            : baseUrl.concat(`?page=${products.nextPage}`)
          : null,
        style: "shop.css",
      };

      res.render("shop", data);
    } catch (error) {
      res.render({ error: error.message });
    }
  };

  //real time products
  static products = (req, res) => {
    res.render("realTime", { style: "realTime.css" });
  };
  //chat
  static chat = (req, res) => {
    res.render("chat", { style: "chat.css" });
  };
  //cart
  static cart = async (req, res) => {
    try {
      const cid = "65668aac0971f5b665ba8128";
      const cart = await CartsService.getCartById(cid);
      if (!cart) {
        return res.render("Carrito no encontrado");
      } else {
        res.render("cart", { products: cart.products, style: "cart.css" });
      }
    } catch (error) {
      res.render({ error: error.message });
    }
  };

  //sign up
  static signup = (req, res) => {
    res.render("signup", { style: "signup.css" });
  };
  //login
  static login = (req, res) => {
    res.render("login", { style: "login.css" });
  };
  //profile
  static profile = (req, res) => {
    res.render("profile", { style: "profile.css" });
  };
}
