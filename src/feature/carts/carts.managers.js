import fs from 'fs'

class ManagerCart {
  static id = 0
  constructor () {
    this.carts = []
    this.path = 'src/models/carts.json'
  }

  async addCart () {
    const cart = {
      id: this.carts.length,
      products: []
    }
    this.carts.push(cart)
    fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'))
    return cart
  }

  getCartsById (idCart) {
    if (idCart > this.carts.length) return false
    const productCart = this.carts.find((cart) => cart.id === idCart)
    return productCart.products
  }

  async addProdCart (idCart, idProd) {
    const cartIndex = this.carts.findIndex((cart) => cart.id === idCart)

    if (cartIndex !== -1) {
      const cart = this.carts[cartIndex]

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === idProd
      )

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity++
      } else {
        cart.products.push({ id: idProd, quantity: 1 })
      }

      this.carts[cartIndex] = cart
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.carts, null, '\t')
      )

      return cart
    } else {
      return 'Carrito no encontrado'
    }
  }
}

const managerCart = new ManagerCart()

export default managerCart
