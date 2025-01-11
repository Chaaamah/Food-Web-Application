const productModel = require('../models/productModel');

const uploadProduct = async (req, res) => {
  try {
    const data = await productModel(req.body);
    const datasave = await data.save();
    res.send({ message: "Upload successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const data = await productModel.find({});
    res.send(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  uploadProduct,
  getProducts,
};
