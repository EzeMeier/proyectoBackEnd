//AUTH

export const authError = () => {
    return `El nombre, el email y la contraseña son campos obligatorios`;
  };
  export const loginError = () => {
    return `Email y contraseña son obligatorios`;
  };
  
  //PRODUCTS
  
  ///add product
  export const addProductError = () => {
    return `Todos los campos son obligatorios`;
  };
  ///get product by ID
  export const getProductError = (id) => {
    return `ID ${id} no encontrado`;
  };
  ///update product
  export const updateProductError = (id, updatedContent) => {
    if (!id) {
      return `ID no ncontrado`;
    }
    if (updatedContent) {
      return `Los campos a modificar deben incluir: titulo,descripcion,precio, codigo, stock, estado y catgoria`;
    }
  };
  ///delete product
  export const deleteProductError = (id) => {
    if (!id) {
      return `ID no encontrado`;
    }
  };