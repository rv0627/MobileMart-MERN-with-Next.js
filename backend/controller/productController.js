const Product = require("../models/productModel");
const mongoose = require("mongoose");

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ productId: productId });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, brand, price, stock, description, userId } = req.body;
    const image = req.file ? req.file.filename : null;

    // Debug logs to help trace issues
    console.log("[addProduct] req.body:", req.body);
    console.log("[addProduct] req.file:", req.file);

    // coerce numeric values to proper types
    const priceNum = price ? parseFloat(price) : 0;
    const stockNum = stock ? parseInt(stock, 10) : 0;

    const existingProduct = await Product.findOne({
      $and: [{ name: name }, { brand: brand }, { price: priceNum }],
    });

    if (existingProduct) {
      existingProduct.stock = (existingProduct.stock || 0) + stockNum;
      await existingProduct.save();
      return res.status(200).json({
        message: "Product stock updated successfully",
      });
    }

    // Handle userId as MongoDB ObjectId
    let ownerId;
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      ownerId = new mongoose.Types.ObjectId(userId);
      console.log("[addProduct] Valid ObjectId ownerId:", ownerId.toString());
    } else {
      console.log("[addProduct] Invalid or missing userId:", userId);
      ownerId = undefined;
    }

    const productData = new Product({
      name: name,
      brand: brand,
      price: priceNum,
      stock: stockNum,
      description: description,
      image: image,
      ownerId: ownerId,
    });

    await productData.save();
    res.status(201).json({
      message: "Product added successfully",
      product: productData,
    });
  } catch (err) {
    console.error("[addProduct] Error:", err);
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
};
