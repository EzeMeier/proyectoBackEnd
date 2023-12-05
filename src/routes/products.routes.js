import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { checkRole } from "../middlewares/auth.js";
import { generateProduct } from "../helpers/mock.js";

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

productsRouter.get("/mockingproducts", (req, res) => {
    let mockingProducts = [];
    for (let i = 0; i < 100; i++) {
        const newProduct = generateProduct();
        mockingProducts.push(newProduct);
    };
    res.json({status:"Success", data: mockingProducts})
});

export { router as productsRouter };
