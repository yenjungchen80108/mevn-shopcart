// mongodb+srv://emily:<password>@shopcartcluster.rd3hr.gcp.mongodb.net/?retryWrites=true&w=majority

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require('cors')
const morgan = require('morgan')
const history = require('connect-history-api-fallback')
require("dotenv").config();

const app = express()

// handle cors + middleware
// allow clients to hit the server
app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

// database stuff
const url = process.env.MONGODB_URI;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB Connected")
})
.catch(err => console.log(err))

// print out log in certain way
app.use(morgan('combined'))
// process json data
app.use(bodyParser.json())
// routes
require('./routes')(app)
// app.get('/', (req, res) => {
//     res.send({
//         message: 'hello world'
//     });
// })
app.use(history())
app.all('*', (req, res) => {res.redirect('/')})

app.set('port', process.env.PORT || 8881);
// var server = app.listen(app.get('port'), function() {
//     console.log('Express server listening on port ' + server.address().port); 
// });
app.listen(process.env.PORT || 3000, () => {
    console.log("listen on port 3000")
})
// let http = require('http')
// let _http = http.createServer((req, res) => {
// res.writeHead(200);
// res.end('Hello..!')
// }).listen();
// console.log(_http.address().port);