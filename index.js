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
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))
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