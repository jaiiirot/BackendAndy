import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home | Palerms",
    style: "index.css",
    js: "index.js",
  });
});

router.get("")


export default router;
