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
      console.log(sex);
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

router.get("/dashboard/", (req, res) => {
  res.render("admin/dashboard", {
    title: "Dashboard || Palermo",
    style: "dashboard.css",
    js: "dashboard.js",
  });
});

router.get("/listadeproductos", (req, res) => {
  res.render("admin/list", {
    title: "Productos || Palermo",
    style: "listProduct.css",
    js: "listProduct.js",
  });
});
export default router;
