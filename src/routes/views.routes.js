import ProductsDAO from "../dao/products.dao.js";
import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.redirect("/inicio");
});

router.get("/inicio", async (req, res) => {
  res.render("index", {
    title: "Home || Palermo",
    style: "index.css",
    js: "index.js",
    sections: [
      {
        area: "c1",
        title: "REMERAS",
        image: "c01.jpg",
      },
      {
        area: "c2",
        title: "SHORTS",
        image: "c02.jpg",
      },
      {
        area: "c3",
        title: "VESTIDOS",
        image: "c03.jpg",
      },
      {
        area: "c4",
        title: "BUZOS",
        image: "c04.jpg",
      },
      {
        area: "c5",
        title: "ACCESORIOS",
        image: "c05.jpg",
      },
    ],
    products: await ProductsDAO.getAllWithLimit(10),
  });
});

router.get("/productos", async (req, res) => {
  try {
    let products;
    const sex = req.query.sex;
    if (sex && (sex === "hombre" || sex === "mujer")) {
      products = await ProductsDAO.getByCategory(sex);
      res.render("shop", {
        title: sex.toUpperCase() + " || Palermo",
        section_title: sex.toUpperCase(),
        products: products,
        style: "shop.css",
        // js: "shop.js",
      });
    } else {
      products = await ProductsDAO.getAll();
      res.render("shop", {
        title: "Productos || Palermo",
        section_title: "PRODUCTOS",
        products: products,
        style: "shop.css",
        // js: "shop.js",
      });
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
});

router.get("/contacto", (req, res) => {
  res.render("contact", {
    title: "Contacto || Palermo",
    // style: "shop.css",
    // js: "shop.js",
  });
});

router.get("/panel/", async (req, res) => {
  const products = await ProductsDAO.getAll();
  res.render("admin/dashboard", {
    title: "Dashboard || Panel",
    products: products,
    style: "dashboard.css",
    js: "dashboard.js",
  });
});

router.get("/panel/productos", async (req, res) => {
  const products = await ProductsDAO.getAll();
  const actions = req.query.actions;
  if (actions === "agregar") {
    res.render("admin/add_prod", {
      title: "Agregar Producto || Panel",
      js: "addProduct.js",
    });
  } else {
    res.render("admin/list", {
      title: "Productos || Panel",
      products: products,
      js: "listProduct.js",
    });
  }
});

router.get("/panel/mensajes", async (req, res) => {
  const products = await ProductsDAO.getAll();

  res.render("admin/messages_dash", {
    title: "Mensajes || Panel",
  });
});
export default router;
