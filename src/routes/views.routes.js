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
    title: "Home | Palerms",
    style: "index.css",
    js: "index.js",
    secctions: secctions,
    product: managerProduct.getProducts(),
  });
});

router.get("/hombre", (req, res) => {
  res.render("hombre", {
    title: "hombre | Palerms",
    // style: "shop.css",
    // js: "shop.js",
  });
});
router.get("/mujer", (req, res) => {
  res.render("mujer", {
    title: "mujer | Palerms",
    // style: "shop.css",
    // js: "shop.js",
  });
});
router.get("/nosotros", (req, res) => {
  res.render("nosotros", {
    title: "Nosotros | Palerms",
    // style: "shop.css",
    // js: "shop.js",
  });
});

export default router;
