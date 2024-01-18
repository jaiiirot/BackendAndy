const fs = require("fs");

class ManagerProduct {
  static id = 0;
  constructor() {
    this.products = [];
    this.path = "./products.json";
  }
  putProducts = async () => {
    this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    console.log(this.products);
  };

  getProductsById(idProd) {
    if (!!idProd) return null;
    return this.products.find((product) => product.id === idProd);
  }
  getProducts() {
    // if (this.products.length === 0) return null;
    console.log(this.products);
    return this.products;
  }
  addProduct(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail
  ) {
    if (
      !title ||
      !description ||
      !code ||
      price === undefined ||
      status === undefined ||
      stock === undefined ||
      !category ||
      !thumbnail
    ) {
      return "Todos los campos deben estar completos.";
    }
    let product = {
      id: this.products.length + 1,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    };
    this.products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(this.products));
    return product;
  }
  updateProduct(idProd, Prod) {
    if (this.products.length === 0) return null;
    const aux = this.products.map((prod) =>
      prod.id === idProd
        ? {
            id: prod.id,
            title: prod.title | Prod.title,
            description: prod.description | Prod.description,
            code: prod.code | Prod.code,
            price: prod.price | Prod.price,
            status: prod.status | Prod.status,
            stock: prod.stock | Prod.stock,
            category: prod.category | Prod.category,
            thumbnail: prod.thumbnail | Prod.thumbnail,
          }
        : prod
    );
    fs.writeFileSync(this.path, []);
    fs.writeFileSync(this.path, JSON.stringify(aux, null, "\t"));
    return aux;
  }
  deleteProduct(idProd) {
    const aux = this.products.filter((prod) => prod.id !== idProd);
    this.products = aux;
    fs.writeFileSync(this.path, []);
    fs.writeFileSync(this.path, JSON.stringify(aux, null, "\t"));
    return aux;
  }
  getLimitProducts(limit) {
    if (this.products.length === 0) return null;
    return this.products.slice(0, limit);
  }
}

const managerProduct = new ManagerProduct();

module.exports = managerProduct;
