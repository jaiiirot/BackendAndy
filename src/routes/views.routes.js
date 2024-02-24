import ProductsDAO from "../dao/products/products.dao.js";
import { Router } from "express";
const router = Router();

router.get("/inicio", (req, res) => {
  res.redirect("/");
});

router.get("/", async (req, res) => {
  res.render("index", {
    title: "Home || Andy",
    js: "index.js",
    products: await ProductsDAO.getAllWithLimit(10),
    products_promo: await ProductsDAO.getByCategorys("accesorio"),
  });
});

router.get("/productos", async (req, res) => {
  try {
    let products;
    const { promocion, categoria } = req.query;
    if (!!categoria) {
      products = await ProductsDAO.getByCategorys(categoria);
      res.render("shop", {
        title: categoria.toLocaleLowerCase() + " || Andy",
        section_title: categoria.toLocaleLowerCase(),
        products: products,
      });
    } else if (!!promocion) {
      products = await ProductsDAO.getByPromocion(promocion);
      res.render("shop", {
        title: "Ofertas || Andy",
        section_title: "SALE",
        products: products,
      });
    } else {
      products = await ProductsDAO.getAll();
      res.render("shop", {
        title: "Productos || Andy",
        section_title: "PRODUCTOS",
        products: products,
      });
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
});

router.get("/productos/:id", async (req, res) => {
  try {
    const product = await ProductsDAO.getById(req.params.id);
    if (!product) {
      res.status(404).send({ error: "Producto no encontrado" });
      return;
    }
    res.render("product", {
      title: product.title.toLowerCase() + " || Andy",
      product: product,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
});

router.get("/contacto", (req, res) => {
  res.render("contact", {
    title: "Contacto || Andy",
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login || Andy",
  });
});

router.get("/carrito", (req, res) => {
  res.render("cart", {
    title: "Carrito || Andy",
  });
});

/*PANEL*/
router.get("/panel/", async (req, res) => {
  const products = await ProductsDAO.getAll();
  res.render("admin/dashboard", {
    title: "Dashboard || Panel",
    products: products,
    js: "dashboard.js",
  });
});

router.get("/panel/productos", async (req, res) => {
  let products;
  const action = req.query.action;

  if (action === "agregar") {
    res.render("admin/add_prod", {
      title: "Panel | Agregar",
      js: "addProduct.js",
    });
  } else if (action === "editar") {
    products = await ProductsDAO.getById(req.query.pid);
    res.render("admin/put_prod", {
      title: "Panel | Editar",
      product: products,
      prodesc: products.description.replace(/<br>/g, `\n`),
      js: "putProduct.js",
      exist_product: true,
    });
  } else {
    products = await ProductsDAO.getAll();
    res.render("admin/prod", {
      title: "Panel | Productos",
      products: products.map((product) => {
        return {
          ...product,
          quantity_photos: product.photo.length,
        };
      }),
      js: "actionProduct.js",
    });
  }
});

router.get("/panel/mensajes", async (req, res) => {
  res.render("admin/messages_dash", {
    title: "Mensajes || Panel",
    messages: [],
    chat: [],
  });
});
export default router;
