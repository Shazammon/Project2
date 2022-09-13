// required packages
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts') // this is the middleware that creates the "body" on the layout.ejs file
const cookieParser = require('cookie-parser')
const db = require('./models')
const crypto = require('crypto-js')

console.log('server secret:', process.env.ENC_SECRET)


// config express app/middlewares
const app = express() // this gives us an instance of an express route
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use(ejsLayouts) // this is the middleware that creates the "body" on the layout.ejs file
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// our customer auth middleware
app.use(async (req, res, next) => {
    // console.log('hello from a middleware')
    res.locals.myData = 'hello, fellow route!'
    // logic: if there is a cookie on the incoming request
    if (req.cookies.userId) {
        // decrypt the user Id before we look up the user in the db
        const decryptedId = crypto.AES.decrypt(req.cookies.userId.toString(), process.env.ENC_SECRET)
        const decryptedIdString = decryptedId.toString(crypto.enc.Utf8)
        // look up the user in the db
        const user = await db.user.findByPk(decryptedIdString)
        // mount the user on the res.locals
        res.locals.user = user
        // if there is no cookie -- then set the user to be null in the res.locals
    } else {
        res.locals.user = null    
    }
    // move on to the next route or middleware in the chain
    next()
})


//route definitions
app.get('/', (req, res) => {
    // console.log('incoming cookie 🍪', req.cookies)
    // console.log(res.locals.myData)
    console.log('the currently logged in user:', res.locals.user)
    res.render('home.ejs')
})

// controllers
app.use('/users', require('./controllers/users'))

// listen on a port
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
