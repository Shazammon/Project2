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
                console.log(response.data.data[0])
                // res.send(response.data.data)
                const parks = response.data.data
                res.render('parks/home.ejs', 
                {
                    parks: parks
                })
            })
        
    // } catch(err) {
    //     console.log(err)
    //     res.send('server error')
    // }
})

module.exports = router