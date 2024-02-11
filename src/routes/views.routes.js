import managerProduct from "../controllers/ManagerProduct.js";
import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.redirect("/inicio");
});

router.get("/inicio", (req, res) => {
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
    products: managerProduct.getLimitProducts(10),
  });
});

router.get("/hombre", (req, res) => {
  res.render("shop", {
    title: "Hombre || Palermo",
    section_title: "HOMBRE",
    products: managerProduct.getProducts(),
    style: "shop.css",
    // js: "shop.js",
  });
});
router.get("/mujer", (req, res) => {
  res.render("shop", {
    title: "Mujer || Palermo",
    section_title: "MUJER",
    products: managerProduct.getProducts(),
    style: "shop.css",
    // js: "shop.js",
  });
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

router.get("/dashboard/productos", (req, res) => {
  res.render("admin/list", {
    title: "Productos || Palermo",
    style: "listProduct.css",
    js: "listProduct.js",
  });
});
export default router;
