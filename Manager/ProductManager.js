const fs = require("fs").promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();
      const newProduct = {
        id: products.length + 1,
        ...product,
      };
      products.push(newProduct);
      await this.saveProducts(products);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        // Si el archivo no existe, se crea uno vacío.
        await this.saveProducts([]);
        return [];
      }
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      return products.find((product) => product.id === id);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct, id };
        await this.saveProducts(products);
        return products[index];
      }
      throw new Error("Producto no encontrado");
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const filteredProducts = products.filter((product) => product.id !== id);
      if (products.length !== filteredProducts.length) {
        await this.saveProducts(filteredProducts);
        return true;
      }
      throw new Error("Producto no encontrado");
    } catch (error) {
      throw error;
    }
  }

  async saveProducts(products) {
    try {
      await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductManager;
