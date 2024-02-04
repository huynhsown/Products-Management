const Product = require('../../models/product.model')
const filterStatusHelper = require('../../helpers/filterStatus')
// [GET] /admin/products 
module.exports.products = async (req,res)=>{
    //Filter
    const filterStatus = filterStatusHelper(req.query)
    const find = {
        deleted: false
    }

    if(req.query.status){
        find.status = req.query.status
    }

    let keyword = ""
    if(req.query.keyword){
        keyword = req.query.keyword
        const regex = new RegExp(keyword, 'i')
        find.title = regex
    }

    const products = await Product.find(find)

    res.render('admin/pages/products/index', {
        pageTitle: "Trang danh sach san pham",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    });
}