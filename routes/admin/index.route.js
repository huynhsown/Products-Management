const dashboardRoute = require('./dashboard.route')
const system = require('../../config/system')

module.exports = (app)=>{
    const PATH_AMIN = system.prefixAdmin
    app.use(PATH_AMIN + '/dashboard', dashboardRoute)
}