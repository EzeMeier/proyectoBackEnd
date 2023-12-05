import { productsModel } from "./models/products.model.js";

export class ProductsManagerMongo {
  constructor() {
    this.model = productsModel;
  }

  //get products
  async getProducts() {
    try {
      const result = await this.model.find().lean();
      return result;
    } catch (error) {
      console.log(`Error al obtener el producto: ${error.message}`);
      throw new Error(`Error al obtener el producto: ${error.message}`);
    }
  }

  //get products paginate
  async getProductsPaginate(query, options) {
    try {
      const result = await this.model.paginate(query, options);
      return result;
    } catch (error) {
      console.log(`Error al obtener el producto: ${error.message}`);
      throw new Error(`Error al obtener el producto: ${error.message}`);
    }
  }

  //add product
  async addProduct(productInfo) {
    try {
      const result = await this.model.create(productInfo);
      return result;
    } catch (error) {
      console.log(`Error al agregar el producto: ${error.message}`);
      throw new Error(`Error al agregar el producto: ${error.message}`);
    }
  }

  //get product by ID
  async getProductById(id) {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      console.log(`Error al obtener el ID del producto: ${error.message}`);
      throw new Error(`El producto con este ID ${id} no fue encontrado`);
    }
  }

  //update product
  async updateProduct(id, updatedContent) {
    try {
      const result = await this.model.findByIdAndUpdate(id, updatedContent);
      return result;
    } catch (error) {
      console.log(`Error al modificar el producto: ${error.message}`);
      throw new Error(`Error al modificar el producto: ${error.message}`);
    }
  }

  //update product stock
  async updateProductStock(id, data) {
    try {
      const result = await this.model.updateMany(
        { _id: id },
        { $set: data },
        { new: true }
      );
      if (!result) {
        throw new Error("Producto no encontrado");
      } else {
        return result;
      }
    } catch (error) {
      console.log(`Error al modificar el stock del producto: ${error.message}`);
      throw new Error(`Error al modificar el stock del producto: ${error.message}`);
    }
  }

  //delete product
  async deleteProduct(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      if (!result) {
        throw new Error("Producto no encontrado");
      } else {
        return result;
      }
    } catch (error) {
      console.log(`Error al eliminar el producto: ${error.message}`);
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  }
}
