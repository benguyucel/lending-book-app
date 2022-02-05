const express = require('express');


const {
    body,
    validationResult
} = require('express-validator');
const messages = require('../constants/messages');
var router = express.Router();
let Book = require('../data/data-model')

router.get('/', async (req, res, next) => {
    try {
        const book = await Book.getBook();
        res.status(200).json(book);
    } catch (error) {
        console.log({
            error
        });
        next([400, messages.serverFetch])

    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const book = await Book.getBookById(id);
        res.status(200).json(book);
    } catch (error) {
        console.log({
            error
        });
        next([404, `Book ${messages.notFound}`])
    }
})
router.get('/detail/:id', async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const book = await Book.getBookDetail(id);
        res.status(200).json(book);
    } catch (error) {
        console.log({
            error
        });
        next([404, `Book ${messages.notFound}`])
    }
})
router.post('/',
    body('name').notEmpty().withMessage(`Bookname ${messages.required}`),
    body('name').isLength({
        min: 3
    }).withMessage(`Book name ${messages.min}`),
    body('publisher_id').notEmpty().withMessage(`Publisher ${messages.required}`),
    body('author_id').notEmpty().withMessage(`Author ${messages.required}`),
    body('page_count').notEmpty().withMessage(`Page count ${messages.required}`),
    body('page_count').isLength({
        max: 4
    }).withMessage(messages.maxPageCount),
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            next([400, errors.array()])
        }else{
            try {
                let newBook = req.body;
                const added = await Book.addBook(newBook);
                res.status(200).json(added)
            } catch (error) {
                console.log({
                    error
                })
                next([500, messages.serverAdd])
            }
        }
    
    })

router.put('/:id',
    body('name').notEmpty().withMessage(`Bookname ${messages.required}`),
    body('name').isLength({
        min: 3
    }).withMessage(`Book name ${messages.min}`),
    body('publisher_id').notEmpty().withMessage(`Publisher ${messages.required}`),
    body('author_id').notEmpty().withMessage(`Author ${messages.required}`),
    body('page_count').notEmpty().withMessage(`Page count ${messages.required}`),
    body('page_count').isLength({
        max: 4
    }).withMessage(messages.maxPageCount),
    async (req, res,next) => {
        if (!errors.isEmpty()) {
            next([400, errors.array()])
        }else{
            try {
                let {
                    id
                } = req.params;
                updatedData = req.body;
                const updated = await Book.updateBook(updatedData, id);
                res.status(200).json(updated);
            } catch (error) {
                console.log({
                    error
                })
                next([500, messages.serverUpdate])
            }
        }
      

    })

router.delete('/:id', async (req, res) => {
    try {
        let {
            id
        } = req.params
        const deleted = await Book.deleteBook(id);
        res.status(200).end()
    } catch (error) {
        console.log({
            error
        })
        next([500, messages.serverDelete])
    }
})
module.exports = router;