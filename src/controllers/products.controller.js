import { ProductsService } from "../services/products.service.js";
import { generateProduct } from "../helpers/mock.js";
import { EError } from "../enums/EError.js";
import { CustomError } from "../services/errors/customError.service.js";
import { updateProductError } from "../services/errors/createError.service.js";

export class ProductsController {
  //get products
  static getProducts = async (req, res) => {
    try {
      const products = await ProductsService.getProducts();
      res.json({ status: "success", data: products });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

  //add product
  static addProduct = async (req, res) => {
    try {
      const productInfo = req.body;
      productInfo.owner = req.user._id;
      const product = await ProductsService.addProduct(productInfo);
      if (product) {
        res.json({
          status: "success",
          message: `${productInfo.title} added successfully`,
        });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };

  //get product by id
  static getProductById = async (req, res) => {
    try {
      const pid = req.params.pid;
      const product = await ProductsService.getProductById(pid);
      if (product) {
        res.json({
          status: "success",
          data: product,
        });
      } else {
        res.json({ status: "error", message: "error getting product..." });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };

  //update product
  static updateProduct = async (req, res) => {
    try {
      const pid = req.params.pid;
      const updatedContent = req.body;
      const product = await ProductsService.updateProduct(pid, updatedContent);

      const entries = Object.entries(updatedContent);
      for (const [clave] of entries) {
        if (
          clave !== "title" &&
          clave !== "description" &&
          clave !== "price" &&
          clave !== "code" &&
          clave !== "stock" &&
          clave !== "category" &&
          clave !== "thumbnail"
        ) {
          const errorUpdateProduct = CustomError.createError({
            name: "error updating product",
            cause: updateProductError(pid, updatedContent),
            message: updateProductError(pid, updatedContent),
            code: EError.PRODUCTS_ERROR,
          });
          logger.error(errorUpdateProduct);
          throw new Error(errorUpdateProduct);
        }
      }

      if (product) {
        res.json({
          status: "success",
          message: "product updated successfully",
          data: product,
        });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };

  //delete product
  static deleteProduct = async (req, res) => {
    try {
      const pid = req.params.pid;
      const product = await ProductsService.getProductById(pid);
      if (
        (req.user.role === "premium" &&
          product.owner.toString() === req.user._id.toString()) ||
        req.user.role === "admin"
      ) {
        const result = await ProductsService.deleteProduct(pid);
        if (result) {
          res.json({
            status: "success",
            message: "product deleted successfully",
          });
        }
      } else {
        res.json({
          status: "error",
          message: `${req.user.fullName} lacks delete permission for this product.`,
        });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };

  //GET MOCKING PRODUCTS
  static getMockingProducts = async (req, res) => {
    try {
      let products = [];
      for (let i = 0; i < 100; i++) {
        const newProducts = generateProduct();
        products.push(newProducts);
      }
      res.json({ status: "succes", data: products });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };
}
