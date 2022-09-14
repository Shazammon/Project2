// const e = require('express')
const express = require('express')
const router = express.Router()
const db = require('../models')


// GET / -- display all parks
router.get('/', async (req, res) => {
    try {
        let parksUrl = ''
        // await res.send('This is your parks page')
        
    } catch(err) {
        console.log(err)
        res.send('server error')
    }
})

module.exports = router