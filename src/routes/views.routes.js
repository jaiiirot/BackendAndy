import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home | Palerms",
    style: "index.css",
    js: "index.js",
  });
});

router.get("/inicio", (req, res) => {
  res.render("index", {
    title: "Home | Palerms",
    style: "index.css",
    js: "index.js",
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
