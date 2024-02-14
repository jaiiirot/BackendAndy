import ProductsDAO from "../dao/products.dao.js";
import { Router } from "express";
const router = Router();

router.get("/inicio", (req, res) => {
  res.redirect("/");
});

router.get("/", async (req, res) => {
  res.render("index", {
    title: "Home || Palermo",
    js: "index.js",
    sections: [
      {
        url: "remeras",
        area: "c1",
        title: "REMERAS",
        image: "c01.jpg",
      },
      {
        url: "shorts",
        area: "c2",
        title: "  SHORTS",
        image: "c02.jpg",
      },
      {
        url: "vestidos",
        area: "c3",
        title: "VESTIDOS",
        image: "c03.jpg",
      },
      {
        url: "buzos",
        area: "c4",
        title: "BUZOS",
        image: "c04.jpg",
      },
      {
        url: "accesorios",
        area: "c5",
        title: "accesorios",
        image: "c05.jpg",
      },
    ],
    products: await ProductsDAO.getAllWithLimit(10),
  });
});

router.get("/productos", async (req, res) => {
  try {
    let products;
    const categoria = req.query.categoria;
    if (!!categoria) {
      products = await ProductsDAO.getByCategory(categoria);
      res.render("shop", {
        title: categoria.toUpperCase() + " || Palermo",
        section_title: categoria.toUpperCase(),
        products: products,
      });
    } else {
      products = await ProductsDAO.getAll();
      res.render("shop", {
        title: "Productos || Palermo",
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
      title: product.title + " || Palermo",
      product: product,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
});

router.get("/contacto", (req, res) => {
  res.render("contact", {
    title: "Contacto || Palermo",
  });
});

router.get("/panel/:id", async (req, res) => {
  if (!!req.params.id) {
    const _id_user = req.params.id;
    const products = await ProductsDAO.getAll();
    res.render("admin/dashboard", {
      title: "Dashboard || Panel",
      _id_user,
      products: products,
      js: "dashboard.js",
    });
  } else {
    res.redirect("/");
  }
});

router.get("/panel/:id/productos", async (req, res) => {
  if (!!req.params.id) {
    let products;
    const _id_user = req.params.id;
    const actions = req.query.actions;
    if (actions === "agregar") {
      res.render("admin/add_prod", {
        title: "Panel | Agregar",
        _id_user,
        js: "addProduct.js",
      });
    } else if (actions === "editar" && !!req.query.id) {
      products = await ProductsDAO.getById(req.query.id);
      res.render("admin/put_prod", {
        title: "Panel | Editar",
        _id_user,
        product: products,
        prodesc: products.description.replace(/<br>/g, `\n`),
        js: "putProduct.js",
        exist_product: true,
      });
    } else {
      products = await ProductsDAO.getAll();
      res.render("admin/prod", {
        title: "Panel | Productos",
        _id_user,
        products: products.map((product) => {
          return {
            ...product,
            quantity_photos: product.photo.length,
          };
        }),
        js: "actionProduct.js",
      });
    }
  } else {
    res.redirect("/");
  }
});

router.get("/panel/:id/mensajes", async (req, res) => {
  if (!!req.params.id) {
    const _id_user = req.params.id;
    res.render("admin/messages_dash", {
      title: "Mensajes || Panel",
      _id_user,
      messages: [],
      chat: [],
    });
  } else {
    res.redirect("/");
  }
});
export default router;
