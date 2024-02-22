const express = require('express')
require('dotenv').config()
const database = require('./config/database.js').connect()
const app = express()
const port = process.env.PORT
const routeAdmin = require('./routes/admin/index.route')
const route = require('./routes/client/index.route')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')


//App Local Variables
const systemConfig = require('./config/system.js')
app.locals.prefixAdmin = systemConfig.prefixAdmin

//Set Views Engine
app.set('views',`${__dirname}/views`)
app.set('view engine', 'pug')

app.use(express.static(`${__dirname}/public`))
app.use(methodOverride("_method"))

//middle ware
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

routeAdmin(app)
route(app)

app.listen(port, () => {
    console.log("Hello", port)
})