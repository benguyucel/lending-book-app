const messages = require('../constants/messages');
const db = require('./db-config')

module.exports = {
    getAutor,
    getAuthorById,
    addAutor,
    updateAuthor,
    deleteAutor,
    getPublisher,
    getPublisherById,
    addPublisher,
    updatePublisher,
    deletePublisher,
    getPerson,
    getPersonById,
    getPersonDetail,
    getBookById,
    addPerson,
    updatePerson,
    deletePerson,
    getBook,
    addBook,
    updateBook,
    deleteBook,
    getLending,
    addLending,
    updateLending,
    getLendingById,
    deleteLending,
    getBookDetail
}

async function getAutor() {
    return await db('author').where('status', true)
}
async function getAuthorById(id) {
    const author = await db("author")
        .where('id', id)
        .where("status", true)
        .first();
    if (author) {
        return author;
    } else {
        throw new Error();
    }
}

async function addAutor(newAuthor) {
  
    const [
        {
            id
        }
    ] = 
   await db('author').insert(newAuthor,"id")
   return db('author').where({'id':id}).first();
   
}

async function updateAuthor(updatedData, id) {

    await db('author')
        .where({id: id})
        .update(updatedData)
    return db('author')
        .where('id', id)
        .first();
}

async function deleteAutor(id) {
    await db('author')
        .where('id', id)
        .update({'status': false});
}

// Publisher

async function getPublisher() {
    return await db('publisher').where('status', true)
}
async function getPublisherById(id) {
    return await db('publisher')
        .where('status', true)
        .where('id', id)
        .first()
}

async function addPublisher(newPublisher) {
    const [id] = await db('publisher').insert(newPublisher, "id")
    return db('publisher')
        .where(id)
        .first();
}

async function updatePublisher(updatedData, id) {
    const updated = await db('publisher')
        .where('id', id)
        .update(updatedData)
    if (updated) {
        return db('publisher')
            .where('id', id)
            .first();
    } else {
        throw new Error();
    }
}

async function deletePublisher(id) {
    await db('publisher')
        .where('id', id)
        .update({status: false});
}

//Person

async function getPerson() {
    return await db('person')
}
async function getPersonById(id) {
    const person = await db('person')
        .where('id', id)
        .first();
    return person;

}

async function getPersonDetail() {
    const person = await db('person as p')
        .leftJoin('lending as l', 'p.id', 'l.person_id')
        .leftJoin('book as b', 'l.book_id', 'b.id')
        .select('p.id as personId', 'p.name as name', 'p.sur_name as surName', 'b.id as bookId', 'b.name as bookName', 'b.image_url', 'l.updated_at', 'l.deliver__date')
        .where('p.id', id)

    if (person) {
        return person;
    } else {
        throw new Error();
    }
}
async function addPerson(newPerson) {
    const [id] = await db('person').insert(newPerson, "id");
    return db('person')
        .where(id)
        .first();
}

async function updatePerson(updatedData, id) {
    const updated = await db('person')
        .where('id', id)
        .update(updatedData)
    if (updated) {
        return db('person')
            .where('id', id)
            .first();
    } else {
        throw new Error();
    }
}

async function deletePerson(id) {
    return await db('person')
        .where('id', id)
        .del();
}

///Boook

async function getBook() {
    return db('book as b')
        .join("author as a", 'b.author_id', 'a.id')
        .join('publisher as p', 'b.publisher_id', 'p.id')
        .select('b.id as bookId', 'b.name as book', 'b.image_url', 'a.name as author', 'p.name as publisher', 'page_count', 'b.status');
}
async function getBookById(id) {
    const book = await db('book')
        .where('id', id)
        .first();
    if (book) {
        return book
    } else {
        throw new Error();
    }
}
async function getBookDetail(id) {
    const book = await db('book as b')
        .join("author as a", 'b.author_id', 'a.id')
        .join('publisher as p', 'b.publisher_id', 'p.id')
        .select('b.id as bookId', 'b.name as book', 'a.name as author', 'p.name as publisher', 'b.image_url', 'page_count', 'b.status')
        .where('b.id', id)
        .first();
    if (book) {
        return book
    } else {
        throw new Error();
    }
}

async function addBook(newBook) {
    const [
        {
            id
        }
    ] = await db('book').insert(newBook, "id");
    return db('book as b')
        .join("author as a", 'b.author_id', 'a.id')
        .join('publisher as p', 'b.publisher_id', 'p.id')
        .select('b.id as bookId', 'b.name as book', 'a.name as author', 'p.name as publisher', 'page_count')
        .where('b.id', id)
        .first();
}

async function updateBook(updatedData, id) {
    const updated = await db('book')
        .where('id', id)
        .update(updatedData)
    if (updated) {
        return db('book')
            .where('id', id)
            .first();
    } else {
        throw new Error();
    }
}

function deleteBook(id) {
    return db('book')
        .where('id', id)
        .del();
}

//Lending

async function getLending() {
    return await db('lending as l')
        .join('book as b', 'l.book_id', 'b.id')
        .join('person as p', 'l.person_id', 'p.id')
        .join('publisher as pu', 'b.publisher_id', 'pu.id')
        .select('l.id', 'b.id as bookId', 'b.image_url', 'b.name as bookName', 'p.name as personName', 'p.sur_name as surName', 'pu.name as publisherName',
        'l.created_at as createt_at',
        'l.deliver__date as deliver_at'
        )
}

async function addLending(newLending) {
    return await db('lending')
        .insert(newLending, "id")
        .then(([{
                id
            }]) => {

            return db('lending as l')
                .join('book as b', 'l.book_id', 'b.id')
                .join('person as p', 'l.person_id', 'p.id')
                .join('publisher as pu', 'b.publisher_id', 'pu.id')
                .select('b.name as bookName', 'p.name as personName', 'p.sur_name as surName', 'pu.name as publisherName', 'l.created_at as created_at')
                .where('l.id', id)
                .first();
        })
}
async function getLendingById(id) {
    const lend = await db('lending as l')
        .join('book as b', 'l.book_id', 'b.id')
        .join('person as p', 'l.person_id', 'p.id')
        .join('publisher as pu', 'b.publisher_id', 'pu.id')
        .select('l.id', 'b.name as bookName', 'b.id as bookId', 'p.name as personName', 'b.image_url', 'p.sur_name as surName', 'pu.name as publisherName', 'l.created_at as created_at')
        .where('l.id', id)
        .first();
    if (lend) {
        return lend;
    } else {
        throw new Error();
    }
}
async function updateLending(updatedData, id) {
    await db('lending')
        .where('id', id)
        .update(updatedData);
    return db('lending')
        .where('id', id)
        .first();

}

async function deleteLending(id) {
    const lending = await db('lending')
        .where('id', id)
        .del();
    if (lending) {
        return lending;
    } else {
        throw new Error();
    }
}
