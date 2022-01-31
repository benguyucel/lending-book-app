const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const bodyParser = require('body-parser')
const cors = require("cors");
const helmet = require("helmet")

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain)
app.use(cors());
app.use(helmet());
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