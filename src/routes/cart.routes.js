import CartsController from '../dao/carts/carts.controller.js'
import { Router } from 'express'
const router = Router()

// ALL
router.get('/', CartsController.getAllCarts)
router.post('/', CartsController.postCreateCart)

// ID CART
router.get('/:cid', CartsController.getCartById)
router.put('/:cid', CartsController.putUpdateCart)
router.delete('/:cid', CartsController.deleteCart)

// ID CART - ID PRODUCT
router.post('/:cid/productos/:pid', CartsController.postAddProductToCart)
router.put('/:cid/productos/:pid', CartsController.putUpdateProductInCart)
router.delete('/:cid/productos/:pid', CartsController.deleteProductFromCart)

export default router
