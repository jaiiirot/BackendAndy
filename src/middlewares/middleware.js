export const validationData = (req, res, next) => {
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;
  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !stock ||
    !category ||
    !thumbnails
  ) {
    return res.status(400).send({
      msg: "Faltan datos",
    });
  }
  next();
};

export const validationId = (req, res, next) => {
  if (isNaN(req.params.id))
    return res.status(400).send({ msg: `Id no valido: ${req.params.id}` });
  next();
};
