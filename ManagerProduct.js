const fs = require("fs");

class ManagerProduct {
  static id = 0;
  constructor() {
    this.products = [];
    this.path = "./products.json";
    this.putProducts();
  }
  async putProducts() {
    const aux = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    return this.products.push(...aux);
  }

  getProductsById(idProd) {
    if (!!idProd) return null;
    return this.products.find((product) => product.id === idProd);
  }
  getProducts() {
    if (this.products.length === 0) return null;
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
    thumbnails
  ) {
    let product = {
      id: this.products.length + 1,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };
    this.products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(this.products));
    return product;
  }
  async updateProduct(idProd, Prod) {
    console.log(idProd, Prod);
    if (this.products.length === 0) return null;
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
    return this.products;
  }
  async deleteProduct(idProd) {
    const aux = this.products.filter((prod) => prod.id !== idProd);
    this.products = aux;
    fs.promises.writeFile(this.path, []);
    fs.promises.writeFile(this.path, JSON.stringify(aux, null, "\t"));
    return aux;
  }
  getLimitProducts(limit) {
    if (this.products.length === 0) return null;
    return this.products.slice(0, limit);
  }
}

const managerProduct = new ManagerProduct();

module.exports = managerProduct;
