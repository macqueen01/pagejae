const express = require('express')
const Message = require('../models').Message
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).render('VisitorsPlace')
})

router.get('/messages', (req, res, next) => {
    Message.findAll().then((messages) => {
        res.status(200).json(messages)
    }).catch(err => {
        console.error(err)
        next(err)
    })
})

router.post('/messages', (req, res, next) => {
    Message.create({
        message : req.body.message,
        name : req.body.name
    }).then((result) => {
        console.log(result)
        res.status(200).send(result)
    }).catch(e => {
        console.error(e)
        next(e)
    })
})


module.exports = router