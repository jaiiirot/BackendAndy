import { Products } from "./schemas/products.schema.js";
class ProductsDAO {
  //   constructor() {}
  static async getAll() {
    return Products.find().lean();
  }
  static async getAllWithLimit(limit) {
    return Products.find().limit(limit).lean();
  }
  static async getByCategory(category) {
    return Products.find({ category: { $in: [`${category}`] } }).lean();
  }
  static async getById(id) {
    return Products.findById(id).lean();
  }
  static async addProduct(product) {
    return Products.create(product);
  }
  static async updateProduct(id, product) {
    return Products.findByIdAndUpdate(id, product, { new: true }).lean();
  }
  static async deleteProduct(id) {
    return Products.findByIdAndDelete(id).lean();
  }
  static async deleteProducts(ids) {
    return Products.deleteMany({ _id: { $in: ids } }).lean();
  }
  static async updateStock(id, stock) {
    return Products.findByIdAndUpdate(
      id,
      { stock: stock },
      { new: true }
    ).lean();
  }
  static async updateStatus(id, status) {
    return Products.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    ).lean();
  }
}

export default ProductsDAO;
