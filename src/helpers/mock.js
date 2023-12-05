import { faker } from "@faker-js/faker";

// Función Generar Producto

const { database, commerce, string, image } = faker;

export const generateProduct = (() => {
    let i = 0;

    return () => {
        i += 1; 
        return {
            numberProduct: i,
            id: database.mongodbObjectId(),
            title: commerce.product(),
            description: commerce.productDescription(),
            price: commerce.price(),
            stock: string.numeric(2),
            code: string.alphanumeric(6),
            img: image.url(),
        };
    };
})();