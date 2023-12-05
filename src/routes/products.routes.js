import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { checkRole } from "../middlewares/auth.js";

const router = Router();

//get products
router.get("/", ProductsController.getProducts);
//add product
router.post("/", checkRole(["admin"]), ProductsController.addProduct);
//get product by id
router.get("/:pid", ProductsController.getProductById);
//update product
router.put("/:pid", checkRole(["admin"]), ProductsController.updateProduct);
//delete product
router.delete("/:pid", checkRole(["admin"]), ProductsController.deleteProduct);

export { router as productsRouter };
