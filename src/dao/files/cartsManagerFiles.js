import fs from "fs";

class CartsManagerFiles {
  constructor(path) {
    this.path = path;
  }

  //corroborar si el archivo existe
  fileExist() {
    return fs.existsSync(this.path);
  }

  //consultar carritos
  async getCarts() {
    try {
      if (this.fileExist()) {
        const contenido = await fs.promises.readFile(this.path, "utf-8");
        const contenidoJson = JSON.parse(contenido);
        return contenidoJson;
      } else {
        throw new Error("Error al conseguir el carrito");
      }
    } catch (error) {
      throw new Error("Error con carrito: ", error.message);
    }
  }

  //agregar carrito
  async createCart() {
    try {
      if (this.fileExist()) {
        const contenido = await fs.promises.readFile(this.path, "utf-8");
        const contenidoJson = JSON.parse(contenido);
        //id autoincrementable
        const idCart = contenidoJson.reduce((maxId, cart) => {
          return cart.id > maxId ? cart.id : maxId;
        }, 0);
        const newId = idCart + 1;
        //create cart
        const newCart = { id: newId, products: [] };
        contenidoJson.push(newCart);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(contenidoJson, null, "\t")
        );
        return newCart;
        // console.log("cart added successfully");
      }
    } catch (error) {
      throw new Error("Error al crear el carrito ", error.message);
    }
  }

  //get cart by ID
  async getCartById(id) {
    try {
      if (this.fileExist()) {
        const contenido = await fs.promises.readFile(this.path, "utf-8");
        const contenidoJson = JSON.parse(contenido);

        const cart = contenidoJson.find((cart) => cart.id === id);

        if (cart) {
          return cart;
        } else {
          throw new Error("ID no encontrado");
        }
      }
    } catch (error) {
      throw new Error("ID de carrito no encontrado", error.message);
    }
  }

  //modificar cart
  async updateCart(id, updatedContent) {
    try {
      if (this.fileExist()) {
        const contenido = await fs.promises.readFile(this.path, "utf-8");
        const contenidoJson = JSON.parse(contenido);

        //localizar el id
        const cartIndex = contenidoJson.findIndex((cart) => {
          return cart.id === id;
        });
        if (cartIndex !== -1) {
          contenidoJson[cartIndex] = {
            ...contenidoJson[cartIndex],
            ...updatedContent,
          };

          //actualiza
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(contenidoJson, null, "\t")
          );
          return "Carrito modificado";
        } else {
          throw new Error("ID no encontrado, no se puede modificar el carrito");
        }
      }
    } catch (error) {
      throw new Error("Error al modificar el carrito : " + error);
    }
  }
}

export { CartsManagerFiles };
