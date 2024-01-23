const managerCart = require("../controllers/ManagerCart");
const Router = require("express");
const router = Router();

router.post("/", (req, res) => {
  const newCart = managerCart.addCart();
  res.status(201).send(newCart);
});
router.get("/:cid", (req, res) => {
  if (req.params.cid) {
    const cart = managerCart.getCartsById(parseInt(req.params.cid));
    cart
      ? res.status(200).send(cart)
      : res.status(404).send({ error: "No se encontró el carrito" });
  }
});
router.post("/:cid/product/:pid", (req, res) => {
  if (req.params.cid && req.params.pid) {
    const cart = managerCart.addProdCart(
      parseInt(req.params.cid),
      parseInt(req.params.pid)
    );
    cart
      ? res.status(200).send(cart)
      : res.status(404).send({ error: "No se encontró el carrito" });
  }
});

module.exports = router;
