const Product = require("../models/Product");
const Cart = require("../models/cart");
const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = (req, res) => {
  const { name, description, price } = req.body;

  try {
    const product = new Product(name, description, price);
    Product.add(product);
    Cart.add(name);

    res.status(STATUS_CODE.FOUND).redirect("/products/new");
  } catch (err) {
    console.error(err);
    res.status(STATUS_CODE.NOT_FOUND).send("Product not found or invalid.");
  }
};

exports.getProductsCount = (req, res) => {
  const count = Cart.getProductsQuantity();
  res.status(STATUS_CODE.OK).json({ count });
};
