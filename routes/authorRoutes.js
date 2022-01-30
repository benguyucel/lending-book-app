const express = require('express')
var router = express.Router();
let Author = require('../data/data-model')
let messages = require('../constants/messages');
const {body, validationResult} = require('express-validator');
router.get('/', async(req, res, next) => {
    try {
        const authors = await Author.getAutor();
        res
            .status(200)
            .json(authors)
    } catch (error) {
        console.log({error})
        next([500, messages.serverFetch])
    }
})
router.get("/:id", async(req, res, next) => {

    try {
        const {id} = req.params
        const book = await Author.getAuthorById(id);
        res
            .status(200)
            .json(book);
    } catch (error) {
        console.log({error})
        next([404, `Author ${messages.notFound}`])
    }
})

router.post('/', body('name').notEmpty().withMessage(messages.requiredAuthor), body('name').isLength({min: 3}).withMessage(messages.minAuthor + " 3"), async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next([
            400, errors.array()
        ])
    } else {
        let newAutor = req.body;
        try {
            const added = await Author.addAutor(newAutor);
            res
                .status(200)
                .json(added)

        } catch (error) {
            console.log({error})
            next([500, messages.serverAdd])
        }
    }

})
router.put('/:id', body('name').notEmpty().withMessage(`Author ${messages.required}`), body('name').isLength({min: 3}).withMessage(`Author ${messages.min} 3`), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        next([
            400, messages.array()
        ])
    }
    let {id} = parseInt(req.params);
    updatedData = req.body;
    Author
        .updateAuthor(updatedData, id)
        .then(updated => {
            res
                .status(200)
                .json(updated);
        })
        .catch(err => {
            console.log({err})
            next([500, messages.serverUpdate])
        })

})

router.delete('/:id', (req, res) => {
    let {id} = req.params
    try {
        Author.deleteAutor(id)
        res
            .status(200)
            .end();
    } catch (error) {
        console.log({error})
        next([500, messages.serverDelete])
    }
})
module.exports = router;
