const express = require('express');
const {body, validationResult} = require('express-validator');
const messages = require('../constants/messages');
var router = express.Router();
let Publisher = require('../data/data-model')
router.get('/', async(req, res, next) => {
    try {
        const publisher = await Publisher.getPublisher()
        res
            .status(200)
            .json(publisher)
    } catch (error) {
        console.log({error})
        next([400, messages.serverUpdate])
    }
})
router.get('/:id', async(req, res, next) => {
    try {
        let {id} = req.params;
        const publisher = await Publisher.getPublisherById(id)
        res
            .status(200)
            .json(publisher)
    } catch (error) {
        console.log({error})
        next([400, messages.serverUpdate])
    }
})

router.post('/', body('name').notEmpty().withMessage(`Publisher ${messages.required}`), body('name').isLength({min: 3}).withMessage(`Publisher ${messages.min} 3 `), async(req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        next([
            400, errors.array()
        ])
    } else {
        try {
            let newPublisher = req.body;
            const added = Publisher.addPublisher(newPublisher)
            res
                .status(200)
                .json(added);

        } catch (error) {
            console.log({error})
            next([400, messages.serverAdd])
        }
    }

})
router.put('/:id', body('name').notEmpty().withMessage(`Publisher ${messages.required}`), body('name').isLength({min: 3}).withMessage(`Publisher ${messages.min} 3 `), async(req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        next([
            400, errors.array()
        ])
    } else {
        try {

            let {id} = req.params;
            updatedData = req.body;
            const updated = await Publisher.updatePublisher(updatedData, id)
            res
                .status(200)
                .json(updated);
        } catch (error) {
            console.log({error})
            next([500, messages.serverUpdate])
        }
    }
})

router.delete('/:id', async(req, res, next) => {
    try {
        let {id} = req.params
        const deleted = await Publisher.deletePublisher(id)
        res
            .status(200)
            .end()
    } catch (error) {
        console.log({error})
        next([400, messages.serverDelete])
    }
})
module.exports = router;