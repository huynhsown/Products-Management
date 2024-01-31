const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({

})

const Product = mongoose.model("Product", productSchema, "products")

module.exports = Product