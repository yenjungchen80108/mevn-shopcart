// mongodb+srv://emily:<password>@shopcartcluster.rd3hr.gcp.mongodb.net/?retryWrites=true&w=majority

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require('cors')
const history = require('connect-history-api-fallback')

const app = express()

// handle cors + middleware
app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

// database stuff
const url = "mongodb+srv://emily:Aqshop0802@shopcartcluster.rd3hr.gcp.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB Connected")
})
.catch(err => console.log(err))

app.use(bodyParser.json)
// routes
require('./routes')(app)
app.use(history())
app.all('*', (req, res) => {res.redirect('/')})

app.listen(3000, () => {
    console.log("listen on port 3000")
})