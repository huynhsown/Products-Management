const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        rating: Number,
        stock: Number,
        brand: String,
        category: String,
        thumbnail: String,
        status: String,
        position: Number,
        deleted: Boolean,
        deletedAt: Date
    }
)

const Product = mongoose.model("Product", productSchema, "products")

module.exports = Product