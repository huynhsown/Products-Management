const dashboardRoute = require('./dashboard.route')
const productsRoute = require('./products.route')
const system = require('../../config/system')

module.exports = (app)=>{
    const PATH_AMIN = system.prefixAdmin
    app.use(PATH_AMIN + '/dashboard', dashboardRoute)
    app.use(PATH_AMIN + '/products', productsRoute)
}