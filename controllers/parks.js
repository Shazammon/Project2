// const e = require('express')
const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')


// GET / -- display all parks
router.get('/', (req, res) => {
    let parksUrl = 'https://developer.nps.gov/api/v1'
    // await res.send('This is your parks page')
    axios.get(`${parksUrl}/parks?limit=500&api_key=${process.env.API_KEY}`)
        .then(response => {
            console.log(response.data.data[1])

            const parks = response.data.data
            
            res.render('parks/index.ejs', 
            {
                parks: parks,
            })
        })
        
})

// POST /favorite -- favorite a park and create new item in favorites table
router.post('/:parkCode/favorite', async (req, res) => {
    try {
        const newFavorite = {
            where: {
                userId: res.locals.user.id,
                parkCode: req.body.parkCode,
                fullName: req.body.fullName
            }
        }
        const [favorite, created] = await db.favorite.findOrCreate(newFavorite)
        res.redirect('/parks')
        
    } catch(err) {
        console.log(err)
        res.send('There is an error! Go back.')
    }
})
// GET /:parkCode -- show a specific park
router.get('/:parkCode', async (req, res) => {
    let parksUrl = 'https://developer.nps.gov/api/v1'
        // await res.send('This is your parks page')
        const experiencesData = await db.experience.findAll({
            where: {
                parkCode: req.params.parkCode
            }
        })
        
        // console.log(req.params.parkCode)
        axios.get(`${parksUrl}/parks?parkCode=${req.params.parkCode}}&api_key=${process.env.API_KEY}`)
            .then(response => {
                
                const parks = response.data.data[0]
                
                res.render('parks/show.ejs', {
                    parks: parks,
                    experiences: experiencesData
                })
                // console.log(parks[0])
                console.log(experiencesData)
            })
})


module.exports = router