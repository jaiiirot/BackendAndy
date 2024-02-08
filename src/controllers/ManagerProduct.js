import fs from "fs";

class ManagerProduct {
  static id = 0;
  constructor() {
    this.products = [];
    this.path = "src/models/products.json";
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(data);
    } catch (error) {
      console.log("No se encontraron productos");
    }
  }

  getProductsById(idProd) {
    return this.products.find((product) => product.id === idProd);
  }

  getProducts() {
    if (this.products.length === 0) return { msg: "No hay productos cargados" };
    return this.products;
  }

  addProduct(data) {
    const compare = this.products.find((prod) => prod.code === data.code);
    if (!!compare)
      return { msg: "no se puede agregar el producto porque ya existe" };
    let product = {
      id: this.products.length,
      status: true,
      ...data,
    };
    this.products.push(product);
    fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
    return { msg: "Producto agregado", product };
  }

  async updateProduct(idProd, Prod) {
    if (this.products.length === 0) return { msg: "No hay productos cargados" };
    const aux = this.products.map((prod) =>
      prod.id === idProd
        ? {
            id: idProd,
            title: Prod.title,
            description: Prod.description,
            code: Prod.code,
            price: Prod.price,
            status: Prod.status,
            stock: Prod.stock,
            category: Prod.category,
            thumbnail: Prod.thumbnails,
          }
        : prod
    );
    this.products = aux;
    fs.promises.writeFile(this.path, []);
    fs.promises.writeFile(this.path, JSON.stringify(aux, null, "\t"));
    return { msg: "Producto actualizado" };
  }

  async deleteProduct(idProd) {
    if (this.products.length === 0) return { msg: "No hay productos cargados" };
    const aux = this.products.filter((prod) => prod.id !== idProd);
    this.products = aux;
    fs.promises.writeFile(this.path, []);
    fs.promises.writeFile(this.path, JSON.stringify(aux, null, "\t"));
    return { msg: "Producto eliminado" };
  }

  getLimitProducts(limit) {
    if (this.products.length === 0) return { msg: "No hay productos cargados" };
    return this.products.slice(0, limit);
  }
}

const managerProduct = new ManagerProduct();

export default managerProduct;
