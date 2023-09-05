const ProductManager = require("./Manager/ProductManager");

const productManager = new ProductManager("/data/products.json");
(async () => {
  try {
    // Agregar un producto
    const newProduct = await productManager.addProduct({
      title: "Producto 1",
      description: "Descripción del producto 1",
      price: 19.99,
      thumbnail: "imagen1.jpg",
      code: "P001",
      stock: 10,
    });

    // Obtener todos los productos
    const products = await productManager.getProducts();
    console.log(products);

    // Obtener un producto por ID
    const productById = await productManager.getProductById(newProduct.id);
    console.log(productById);

    // Actualizar un producto
    const updatedProduct = await productManager.updateProduct(newProduct.id, {
      price: 24.99,
      stock: 15,
    });
    console.log(updatedProduct);

    // Eliminar un producto
    const deleted = await productManager.deleteProduct(newProduct.id);
    console.log(deleted);
  } catch (error) {
    console.error(error);
  }
})();
