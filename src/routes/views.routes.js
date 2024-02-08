import managerProduct from "../controllers/ManagerProduct.js";
import express from "express";
const router = express.Router();

const secctions = [
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
];

router.get("/", (req, res) => {
  res.redirect("/inicio");
});

router.get("/inicio", (req, res) => {
  res.render("index", {
    title: "Home || Palermo",
    style: "index.css",
    js: "index.js",
    secctions: secctions,
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
    title: "Contacto || Palerms",
    // style: "shop.css",
    // js: "shop.js",
  });
});

export default router;
