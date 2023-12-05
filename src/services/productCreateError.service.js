export const productCreateError = (user) => {
    return `
        Todos los campos son obligatorios,
        Listado de Campos Obligatorios: 

        title: Tipo String, y se recibio ${product.title},
        description: Tipo String, y se recibio ${product.lastname},
        price: Tipo Number, y se recibio ${product.price},
        stock: Tipo Number, y se recibio ${product.stock},
        code: Tipo String, y se recibio ${product.code}.
        img: Tipo String, y se recibio ${product.img}.
    `
};