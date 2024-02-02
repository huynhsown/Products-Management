const Product = require('../../models/product.model')
// [GET] /admin/products 
module.exports.products = async (req,res)=>{
    const products = await Product.find({})
    console.log(products)
    res.render('admin/pages/products/index', {
        pageTitle: "Trang danh sach san pham",
        products: products
    });
}