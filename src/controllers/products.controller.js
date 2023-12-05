import { ProductsService } from "../services/products.service.js";

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
      const product = await ProductsService.addProduct(productInfo);

      if (product) {
        res.json({
          status: "success",
          message: `${productInfo.title} Agregado satisfactoriamente`,
        });
      } else {
        res.json({ status: "error", message: "Error al agregar el producto" });
      }
    } catch (error) {
      console.log(error.message);
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
        res.json({ status: "error", message: "Error al obtener el producto" });
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
      const product = await ProductsService.updateProductStock(
        pid,
        updatedContent
      );
      if (product) {
        res.json({
          status: "success",
          message: "Producto modificado",
          data: product,
        });
      } else {
        res.json({ status: "error", message: "Error al modificar el producto" });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };

  //delete product
  static deleteProduct = async (req, res) => {
    try {
      const pid = req.params.pid;
      const product = await ProductsService.deleteProduct(pid);
      if (product) {
        res.json({
          status: "success",
          message: "Producto eliminado",
        });
      } else {
        res.json({ status: "error", message: "Error al eliminar el producto" });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };
}
