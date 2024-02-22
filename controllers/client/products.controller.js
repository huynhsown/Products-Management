const Product = require("../../models/product.model")

module.exports.index = async (req,res)=>{
    const products = await Product.find({
        status: "active",
        deleted: false
    })
    .sort({position: "asc"})

    const newProducts = products.map((item)=>{
        item.newPrice = (item.price * (1 - (item.discountPercentage/100))).toFixed(0)
        return item
    })

    res.render('client/pages/products/index',{
        pageTitle: "Danh sách sản phẩm",
        products: newProducts
    })
}

module.exports.detail = async(req, res) => {
    try{
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }

        const product =  await Product.findOne(find)
        console.log(product)

        res.render('client/pages/products/detail', {
            title: product.title,
            pageTitle: product.title,
            product: product
        })
    
    }
    catch{
        res.redirect('back')
    }
}