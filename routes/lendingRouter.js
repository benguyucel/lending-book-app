const express = require('express');
const {
    json
} = require('express/lib/response');
const messages = require('../constants/messages');
var router = express.Router();
let Lending = require('../data/data-model')
router.get('/', async (req, res, next) => {
    try {

        const lending = await Lending.getLending();
        res.status(200).json(lending)

    } catch (error) {
        console.log({
            error
        })
        next([500, messages.serverFetch])
    }
})
router.post('/', async (req, res, next) => {
    let newLending = req.body;
    try {
        const {
            status,
            book
        } = await Lending.getBookById(newLending.book_id);
        //check book status if is false someone has took it
        if (status == true) {
            const updated = await Lending.updateBook({
                status: false
            }, newLending.book_id);
            if (updated) {
                //new Lending
                const added = await Lending.addLending(newLending)
                res.status(200).json(added);
            } else {
                next([400, messages.updatedData])
            }
        } else {
            next([400, `${book} ${messages.bookLendingSomeOneElse}`])
        }
    } catch (error) {
        console.log({
            error
        })
        next([500, messages.serverAdd])
    }
})
router.put('/:id', async (req, res, next) => {
    let {
        id
    } = req.params;
    updatedData = req.body;
    try {
        //check book status
        const {
            status,
            book
        } = await Lending.getBookById(updatedData.book_id);

        //check new book status true = avaible
        if (status == true) {
            const {
                book_id
            } = await Lending.getLendingById(id);

            //update old book status
            const updateOldBook = await Lending.updateBook({
                status: true
            }, book_id);
            if (updateOldBook) {
                const updateNewBook = await Lending.updateBook({
                    status: false
                }, updatedData.book_id);
                if (updateNewBook) {
                    const update = Lending.updateLending(updatedData, id)
                    res.status(200).json(update);
                }
            }
        } else {
            next([400, `${book} ${messages.bookLendingSomeOneElse}`])
        }
    } catch (error) {
        console.log({
            error
        })

    }


})

router.delete('/:id', async (req, res, next) => {
    let {
        id
    } = req.params
    try {
        const findLending = await Lending.getLendingById(id);
        if (findLending) {
            const bookUpdate = await Lending.updateBook({
                status: true
            }, findLending.book_id);
            if (bookUpdate) {
                await Lending.deleteLending(id)
                res.status(200).end();
            }
        } else {
            next([404, messages.notFound])
        }
    } catch (error) {
        console.log({
            error
        })
        next([404, messages.notFound])
    }
})
module.exports = router;