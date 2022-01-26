const express = require('express');
const {
    body,
    validationResult
} = require('express-validator');
const messages = require('../constants/messages');
var router = express.Router();
let Person = require('../data/data-model');
const personMapper = require('../utilities/personMapper');

router.get('/', async (req, res, next) => {
    try {
        const person = await Person.getPerson();
        res.status(200).json(person)
    } catch (error) {
        console.log({
            error
        })
        next([500, messages.serverFetch])
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        let {
            id
        } = req.params;
        const person = await Person.getPersonById(id)
        res.status(200).json(personMapper(person))
    } catch (error) {
        console.log({
            error
        });
        next([404, `Person ${messages.notFound}`])
    }
})
router.post('/',
    body('name').notEmpty().withMessage(`Name ${messages.required}`),
    body('name').isLength({
        min: 3
    }).withMessage(`Name ${messages.min}`),
    body('sur_name').notEmpty().withMessage(`Surname ${messages.required}`),
    body('sur_name').isLength({
        min: 3
    }).withMessage(`Surname ${messages.min}`),

    async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            next([400, errors.array()])
        }
        try {
            let newPerson = req.body;
            const added = Person.addPerson(newPerson)
            res.status(200).json(added);

        } catch (error) {
            console.log({
                error
            });
            next([500, messages.serverAdd])
        }
    })
router.put('/:id',
    body('name').notEmpty().withMessage(`Name ${messages.required}`),
    body('name').isLength({
        min: 3
    }).withMessage(`Name ${messages.min}`),
    body('sur_name').notEmpty().withMessage(`Surname ${messages.required}`),
    body('sur_name').isLength({
        min: 3
    }).withMessage(`Surname ${messages.min}`),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            next([400, errors.array()])
        }
        let {
            id
        } = req.params;
        try {
            updatedData = req.body;
            const updated = Person.updatePerson(updatedData, id)
            res.status(200).json(updated);

        } catch (error) {
            console.log({
                error
            })
            next([500, messages.serverUpdate])

        }


    })

router.delete('/:id', (req, res, next) => {
    try {
        let {
            id
        } = req.params
        Person.deletePerson(id)
        res.status(200).end()

    } catch (error) {
        console.log({
            error
        })
        next([500, messages.serverDelete])
    }
})
module.exports = router;