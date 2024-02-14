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
    return Products.findOne({ _id: id }).lean();
  }
  static async addProduct(product) {
    return Products.create(product);
  }
  static async deleteProduct(id) {
    return Products.findByIdAndDelete(id);
  }
  static async deleteProducts(ids) {
    return Products.deleteMany({ _id: { $in: ids } });
  }
  static async updateProduct(id, product) {
    return Products.findByIdAndUpdate(id, product, { new: true }).lean();
  }
}

export default ProductsDAO;
