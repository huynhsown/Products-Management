const express = require('express')
const router = express.Router()
const controller = require('../../controllers/admin/products.controller')

router.get('/', controller.products)
router.patch('/change-status/:status/:id', controller.changeStatus)
router.patch('/change-multi', controller.changeMulti)
router.delete('/delete-product/:id', controller.deleteProduct)
router.get('/trash', controller.trashProduct)
router.patch('/trash/restore/:id', controller.trashRestore)
router.delete('/trash/permanent-delete/:id', controller.trashPermanentDelete)

module.exports = router