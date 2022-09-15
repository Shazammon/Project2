// const e = require('express')
const express = require('express')
const router = express.Router()
const db = require('../models')
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')

// async function getFavorites() {
//     try {
//         const

//     } catch(err) {
//         console.log(err)
//     }
// }

// GET /users/new -- render a form to create a new users
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

// POST /users -- create a new user in the db
router.post('/', async (req, res) => {
    try {
        // create a new user
        // hash the supplied password from the req.body
        const hashedPassword = bcrypt.hashSync(req.body.password, 12)
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: {
                password: hashedPassword,
                name: req.body.name
            }
        })

        // if the user was found...send them to the login form
        if (!created) {
            console.log('user exists already')
            res.redirect('/users/login?message=Please log into your account to continue.')
        } else {
            // store that new user's id as a cookie in the browser
            const encryptedUserId = crypto.AES.encrypt(newUser.id.toString(), process.env.ENC_SECRET)
            const encryptedUserIdString = encryptedUserId.toString()
            res.cookie('userId',  encryptedUserIdString)
            // redirct to the homepage
            res.redirect('users/profile.ejs')
        }

    } catch(err) {
        console.log(err)
        res.send('server error')
    }
    
})

// GET /users/login -- show a login form to the user
router.get('/login', (req, res) => {
    console.log(req.query)
    res.render('users/login.ejs', {
        // if the req.query.message exists, pass it in, if not, it is null
        // ternary operator
        // condition ? expression if truthy : expression if falsy
        message: req.query.message ? req.query.message : null
    })
})

// POST /users/login -- accept a payload of form data and use it to log a user in 
router.post('/login', async (req, res) => {
    try {
        // lookup the user in the db using the supplied email
        const user = await db.user.findOne({ 
            where: {
                email: req.body.email
            }
        })
        const noLoginMessage = 'Incorrect username or password'
        // logic: if the user is not found -- send the user back to the login form
        if (!user) {
            console.log('user not found')
            res.redirect('/users/login?message=' + noLoginMessage)
            // logic: if the user is found but has given the wrong password -- send them back to the login form
        // } else if (user.password !== req.body.password) {
        } else if (!bcrypt.compareSync(req.body.password, user.password)) {
            console.log('wrong password')
            res.redirect('/users/login?message=' + noLoginMessage)
            // logic: if the user is found and the supplied password matches what is in the database -- log them in
        } else {
            // console.log('logging the user in!')
            const encryptedUserId = crypto.AES.encrypt(user.id.toString(), process.env.ENC_SECRET)
            const encryptedUserIdString = encryptedUserId.toString()
            res.cookie('userId',  encryptedUserIdString)
            res.redirect('/users/profile')
        }
    } catch(err) {
        console.log(err)
        res.send('server error')
    }
})

// GET /users/logout -- log out a user by clearing the stored cookie
router.get('/logout', (req, res) => {
    // clear the cookie 
    res.clearCookie('userId')
    // redirect to the home page
    res.redirect('/')
})

router.get('/:profile', async (req, res) => {
    // if the user is not logged in...we need to reidrect to the login form
    if (!res.locals.user) {
        res.redirect('/users/login?message=You must authenticate before you are authroized to view this resource')
        // otherwise show them their profile
    } else {
        try {
            const userFavs = await db.favorite.findAll({
                where: {
                    userId: res.locals.user.id
                }
            })
            
            console.log(res.locals.user)
            console.log(userFavs)
            res.render('users/profile', {
                user: res.locals.user,
                favorites: userFavs
                
            })
        } catch(err) {
            console.log(err)
            res.send('Yo, there is an error')
        }
    }
})

module.exports = router