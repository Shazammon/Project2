// const e = require('express')
const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')


// GET / -- display all parks
router.get('/', (req, res) => {
    // try {
        let parksUrl = 'https://developer.nps.gov/api/v1'
        // await res.send('This is your parks page')
        axios.get(`${parksUrl}/parks?limit=500&api_key=${process.env.API_KEY}`)
            .then(response => {
                console.log(response.data.data[1])
                // res.send(response.data.data)
                const parks = response.data.data
                
                res.render('parks/index.ejs', 
                {
                    parks: parks,
                    // user: res.locals.user // is this correct??
                })
            })
        
    // } catch(err) {
    //     console.log(err)
    //     res.send('server error')
    // }
})

// POST /favorite -- favorite a park and create new item in favorites table
router.post('/favorite', async (req, res) => {
    try {
        const newFavorite = {
            where: {
                userId: res.locals.user.id,
                parkCode: req.body.parkCode
            }
        }
        const [favorite, created] = await db.favorite.findOrCreate(newFavorite)
        res.redirect('/parks')
        
    } catch(err) {
        console.log(err)
        res.send('There is an error! Go back.')
    }
})

module.exports = router