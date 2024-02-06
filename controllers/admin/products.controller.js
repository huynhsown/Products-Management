const Product = require('../../models/product.model')
const filterStatusHelper = require('../../helpers/filterStatus')
const searchHelper = require('../../helpers/search')
const itemsInPage = require('../../config/system').itemsInPage
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

    //Pagination

    let objPagination = {
        pageNumber: 1
    }

    if(!isNaN(req.query.page)){
        objPagination.pageNumber = parseInt(req.query.page)
    }

    objPagination.skip = (objPagination.pageNumber-1)*itemsInPage
    //End Pagination

    const products = await Product.find(find).limit(itemsInPage).skip(objPagination.skip)
    objPagination.totalPage = Math.ceil(await Product.find(find).countDocuments()/itemsInPage)

    res.render('admin/pages/products/index', {
        pageTitle: "Trang danh sach san pham",
        products: products,
        filterStatus: filterStatus,
        keyword: objSearch.keyword,
        objPagination: objPagination
    });
}

// [PATCH] /admin/products/change-status/:status/:id

module.exports.changeStatus = async (req,res)=>{
    const status = req.params.status
    const id = req.params.id
    await Product.updateOne({ _id: id}, {status: status})
    res.redirect("back")
}