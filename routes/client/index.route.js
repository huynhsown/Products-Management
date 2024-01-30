const homeRoute = require('./home.route')
const productsRoute = require('./products.route')

module.exports = (app)=>{
    app.get('/', homeRoute)

    app.use('/products', productsRoute)
}