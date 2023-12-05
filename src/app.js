import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import passport from "passport";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { viewsRouter } from "./routes/views.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { ProductsService } from "./services/products.service.js";
import { CartsService } from "./services/carts.service.js";
import { ChatService } from "./services/chat.service.js";
import { chatsRouter } from "./routes/chat.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import { connectDB } from "./config/dbConnection.js";
import { initializePassport } from "./config/passport.config.js";
import { checkRole } from "./middlewares/auth.js";

const port = 8080;
const app = express();

//middlewares
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("claveCookies"));

//passport
initializePassport();
app.use(passport.initialize());

//handlebars
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));

//server
const httpServer = app.listen(port, () =>
  console.log(`Servidor corriendo en el puerto ${port}`)
);

connectDB();

//routes
app.use(viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/sessions", sessionsRouter);

const io = new Server(httpServer);

//PRODUCTS
io.on("connection", async (socket) => {
  try {
    console.log("Cliente conectado");
    const products = await ProductsService.getProducts();
    socket.emit("products", products);

    socket.on("addProduct", async (dataProduct) => {
      try {
        const productToSave = {
          title: dataProduct.title,
          description: dataProduct.description,
          price: dataProduct.price,
          code: dataProduct.code,
          stock: dataProduct.stock,
          status: dataProduct.status,
          category: dataProduct.category,
          thumbnail: dataProduct.thumbnail,
        };
        await ProductsService.addProduct(productToSave);

        const updatedProducts = await ProductsService.getProducts();
        io.emit("products", updatedProducts);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("deleteProduct", async (id) => {
      try {
        await ProductsService.deleteProduct(id);
        const updatedProducts = await ProductsService.getProducts();

        socket.emit("products", updatedProducts);
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

///CHAT
io.on("connection", async (socket) => {
  try {
    const chat = await ChatService.getMessages();
    socket.emit("chatHistory", chat);

    socket.on("authenticated", async (data) => {
      try {
        console.log("Authenticated event received:", data);
        socket.broadcast.emit("newUser", `${data} is connected`);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("messageChat", checkRole(["user"]), async (data) => {
      try {
        if (data.message.trim() !== "") {
          chat.push(data);

          await ChatService.addMessage(data);
          const messageDB = await ChatService.getMessages();
          io.emit("chatHistory", messageDB);
        }
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//CART
io.on("connection", async (socket) => {
  try {
    const cart = await CartsService.getCarts();
    socket.emit("products", cart);
  } catch (error) {
    console.log(error);
  }
});
