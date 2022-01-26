const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded
const appErrorHandler = require('./middleware/errorHandler');
let bookRoute = require('./routes/bookRouter')
let publisherRoute = require('./routes/publisherRouter')
let personRoute = require('./routes/personRouter')
const authorRoute = require('./routes/authorRoutes')
const lendingRouter = require('./routes/lendingRouter')

app.use("/book", bookRoute)
app.use("/author", authorRoute)
app.use("/publisher", publisherRoute)
app.use("/person", personRoute)
app.use("/lending", lendingRouter)
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(appErrorHandler)
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})