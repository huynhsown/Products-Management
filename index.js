const express = require('express')
require('dotenv').config()
const database = require('./config/database.js').connect()
const app = express()
const port = process.env.PORT
const routeAdmin = require('./routes/admin/index.route')
const route = require('./routes/client/index.route')
const methodOverride = require('method-override')

//App Local Variables
const systemConfig = require('./config/system.js')
app.locals.prefixAdmin = systemConfig.prefixAdmin

//Set Views Engine
app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static("public"))
app.use(methodOverride("_method"))

routeAdmin(app)
route(app)

app.listen(port, () => {
    console.log("Hello", port)
})