const Product = require('../../models/product.model')
const filterStatusHelper = require('../../helpers/filterStatus')
const searchHelper = require('../../helpers/search')
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

    const objSearch = searchHelper(req.query)

    if(objSearch.regex) find.title = objSearch.regex

    const products = await Product.find(find)

    res.render('admin/pages/products/index', {
        pageTitle: "Trang danh sach san pham",
        products: products,
        filterStatus: filterStatus,
        keyword: objSearch.keyword
    });
}