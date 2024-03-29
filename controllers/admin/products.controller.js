const Product = require('../../models/product.model')
const filterStatusHelper = require('../../helpers/filterStatus')
const searchHelper = require('../../helpers/search')
const { prefixAdmin } = require('../../config/system')
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

    const products = await Product.find(find)
                                    .sort({position: "desc"})
                                    .limit(itemsInPage)
                                    .skip(objPagination.skip)
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
    try {
        await Product.updateOne({ _id: id}, {status: status})
        req.flash("success", "Cập nhật trạng thái thành công!")
    } catch (error) {
        req.flash("failed", "Cập nhật trạng thái thất bại!")
    }
    console.log(id)
    res.redirect("back")
}


// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req,res)=>{
    const type = req.body.type
    const ids = req.body.ids.split(", ")
    const newIds = ids.map(id => id.split('-')[0])
    const position = ids.map(id => parseInt(id.split('-')[1]))
    
    switch (type) {
        case "active":
            try{
                await Product.updateMany( { _id: {$in : newIds} } , {status : "active"})
                req.flash("success", `Cập nhật thành công trạng thái của ${ids.length} sản phẩm`)
            }catch (e){
                req.flash("failed", `Cập nhật thất bại trạng thái của ${id.length} sản phẩm`)
            }
            break;
        case "inactive":
            try{
                await Product.updateMany( { _id: {$in : newIds} } , {status : "inactive"})
                req.flash("success", `Cập nhật thành công trạng thái của ${ids.length} sản phẩm`)
            }catch (e){
                req.flash("failed", `Cập nhật thất bại trạng thái của ${id.length} sản phẩm`)
            }
            break;
        case "recycledelete":
            await Product.updateMany({_id: {$in: newIds}}, {deleted: true})
            break;
        
        case "permanentdelete":
            await Product.deleteMany({_id: {$in: newIds}})
            break;
        case "position":
            newIds.forEach(async (item, index) => {
                await Product.updateOne({_id: item}, {position: position[index]})
            });
            break;
        default:
            break;
    }

    res.redirect("back")

    // res.send("HELLO")
}

// [DELETE] /admin/products/delete-product/:id
module.exports.deleteProduct = async (req, res)=>{
    const id = req.params.id;
    await Product.updateOne({ _id: id}, {
        deleted: true,
        deletedAt: new Date()
    })
    res.redirect("back")
}

module.exports.trashProduct = async (req,res)=>{
    const find = {
        deleted: true
    }
    const objSearch = searchHelper(req.query)
    if(objSearch.regex) find.title = objSearch.regex 

    const products = await Product.find(find)

    res.render('admin/pages/products/trash', {
        pageTitle: "Thùng rác",
        keyword:objSearch.keyword,
        products: products
    })
}

module.exports.trashRestore = async (req, res) => {
    const id = req.params.id
    await Product.updateOne({ _id: id}, {deleted: false})
    res.redirect('back')
}

module.exports.trashPermanentDelete = async (req, res) => {
    const id = req.params.id
    await Product.deleteOne({_id:id})
    res.redirect('back')
}

//[GET] Create New Product 
module.exports.createProduct = (req,res) => {
    res.render('admin/pages/products/addNewProduct', {
        pageTitle: "Tạo mới sản phẩm"
    })
}

//[POST] Create New Product 
module.exports.createPostProduct = async (req,res) => {

    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    if(req.body.position == ""){
        const countProduct = await Product.countDocuments()
        req.body.position = countProduct + 1
    }
    else{
        req.body.position = parseInt(req.body.position)
    }

    if(req.file) req.body.thumbnail = `/uploads/${req.file.filename}`

    try {
        await Product.create(req.body)
    } catch (error) {
        console.log("Error")
    }
    res.redirect(`${prefixAdmin}/products`)
}

//[GET] Repair Product
module.exports.repairProduct = async (req, res) => {
    const id = req.params.id
    const find = {
        deleted: false,
        _id: id
    }
    const product = await Product.findOne(find)
    if(product){
        res.render('admin/pages/products/repairProduct', {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        })
    }
    else{
        res.send("ERROR ")
    }
}

//[PATCH] Repair Product 
module.exports.repairPatchProduct = async(req, res) => {
    res.send("OK")
}

//[GET] detail Product

module.exports.detailProduct = async(req,res) => {
    const id = req.params.id
    const find = {
        deleted: false,
        _id: id
    }
    const product = await Product.findOne(find)
    if(product){
        res.render('admin/pages/products/detail', {
            pageTitle: product.title,
            product: product
        })
    }
    else{
        res.redirect('back')
    }
}