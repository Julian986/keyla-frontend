export interface Product {
    _id: string;
    name: string;
    price: number;
    description?: string;
    category: string;  // Agregado para la categoría
    brand: string;  // Agregado para la marca
    stock: number;  // Agregado para el stock
    image: string;  // Agregado para las imágenes del producto
    seller: {
      name: string;
      userImage: string;  // Agregado para la imagen del vendedor
    };
  }
  