//Validate [POST] Create Product Admin
module.exports.createPost = (req, res, next)=>{
    if(req.body.title.trim()=="" || !req.body.title){
        req.flash("failed", "Vui long nhap tieu de")
        res.redirect("back")
        return
    }
    next()
}