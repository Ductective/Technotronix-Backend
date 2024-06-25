const Product = require("../models/product");
const { validateProduct } = require("../validator");

exports.createProduct = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) {
    res.json(error.details[0].message);
  } else {
    try {
      const product = new Product({
        category: req.body.category,
        name: req.body.name,
        img: req.file.path,
        price: req.body.price,
        featured: req.body.featured,
        topSelling: req.body.topSelling,
      });
      const productItem = await product.save();
      res.setHeader("Content-Type", "application/json")
      res.json(productItem);
    } catch (error) {
      res.json({ message: error.message });
    }
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.find().populate("category");
    if (!product) {
      res.json("No Products here");
    }
    res.json(product);
  } catch (error) {
    res.json({ message: error });
  }
};
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      res.json("This product isn't here");
    }
    res.json(product);
  } catch (error) {
    res.json({ message: error });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) {
      res.json(error.details[0].message);
    }
    const product = await Product.findByIdAndUpdate(req.params.id, {
      category: req.body.category,
      name: req.body.name,
      img: req.file.path,
      price: req.body.price,
      featured: req.body.featured,
      topSelling: req.body.topSelling,
    });
    if (!product) {
      res.json("This product does not exist");
    }
    res.json(product);
  } catch (error) {
    res.json({ message: error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      res.json("This product does not exist");
    }
    res.json(product);
    product = await Product.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.json({ message: error });
  }
};
exports.getFeaturedProducts = async (req, res) => {
  try {
    const featured = await Product.find({ featured: true }).populate(
      "category"
    );
    if (!featured) {
      res.json("There are no featured products");
    }
    res.json(featured);
  } catch (error) {
    res.json({ message: error });
  }
};
exports.getTopSellingProducts = async (req, res) => {
  try {
    const topSelling = await Product.find({ topSelling: true }).populate(
      "category"
    );
    if (!topSelling) {
      res.json("There are no topSelling products");
    }
    res.json(topSelling);
  } catch (error) {}
};
