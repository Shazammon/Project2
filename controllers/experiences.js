const express = require('express')
const router = express.Router()
const db = require('../models')


// GET / - display all experiences
router.get('/', async (req, res) => {
    try {
        const allExperiences = await db.experience.findAll()
        // let users = []
        const users = allExperiences.map(experience => {
            return db.user.findOne({
                where: {
                    id: experience.userId
                }
            })
        })
        // console.log(users)
        const userResponses = await Promise.all(users)
        // console.log(userResponses)
        const userDatas = userResponses.map(user => {
                return user.dataValues
            })
        // console.log(userDatas)
        res.render('experiences/index.ejs', {
            experiences: allExperiences,
            users: userDatas
        })
    } catch(err) {
        console.log(err)
        res.send('Houston, we have an error')
    }
})

// GET /new/:parkCode - form to add a new experience
router.get('/new/:parkCode/:fullName', (req, res) => {
    const parkCode = req.params.parkCode
    const fullName = req.params.fullName
    console.log(fullName)
    console.log(parkCode)
    res.render('experiences/new.ejs', {
        parkCode,
        fullName
    })
})

// POST /new/:parkCode -- post new experience
router.post('/new', async (req, res) => {
    try {
        const parkCodeData = req.body.parkCode
        const parkName = req.body.fullName
        console.log(req.body.fullName)
        console.log(req.body.title)
        const newExperience = await db.experience.create({
            title: req.body.title,
            description: req.body.description,
            userId: res.locals.user.id,
            parkCode: parkCodeData,
            fullName: parkName
        })
        res.redirect('/experiences')
    } catch(err) {
        console.log(err)
        res.send('there has an error')
    }
})

//GET /edit -- generate a form to edit an existing experience
router.get('/edit/:', (req,res) => {
    try {
        res.render('experiences/edit.ejs', {

        })
    } catch(err) {
        console.log(err)
        res.send('Houston, we have an error!')
    }
})

// PUT /edit/:parkCode -- edit an existing experience
router.put('/edit/:parkCode', async (req, res) => {
    try {
        const numRowsChanged = await db.experience.update({

        }, {
            where: {

            }
        })
    } catch(err) {
        console.log(err)
        res.send('Houston, we have an error!')
    }
})

module.exports = router