const express = require('express')
const router = express.Router()
const controller = require('../../controllers/admin/products.controller')
const multer  = require('multer') //multer upload image
const storageMulter = require('../../helpers/storageMulter')
const upload = multer({ storage: storageMulter() })
const validates = require('../../validates/admin/addProduct.validate')

router.get('/', controller.products)
router.patch('/change-status/:status/:id', controller.changeStatus)
router.patch('/change-multi', controller.changeMulti)
router.delete('/delete-product/:id', controller.deleteProduct)
router.get('/trash', controller.trashProduct)
router.patch('/trash/restore/:id', controller.trashRestore)
router.delete('/trash/permanent-delete/:id', controller.trashPermanentDelete)
router.get('/create', controller.createProduct)
router.post('/create', upload.single('thumbnail'), validates.createPost ,controller.createPostProduct)

module.exports = router