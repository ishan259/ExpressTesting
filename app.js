let express = require('express');
let http = require('http');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let logger = require('morgan');
let path = require('path');
let fs = require ('fs');
let index = require('./routes/index'),
		insert = require('./routes/insert'),
		remove = require('./routes/remove'),
		update = require('./routes/update');
let myMovies = require('./model/schema');
const app = express();

/* port listen and host creation */
const port = 3002;
http.createServer(app).listen(port, '127.0.0.1');
console.log('Server running at http://127.0.0.1:/'+port);

//setup body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//providing routes to handle request
app.use('/',index);
app.use('/',insert);
app.use('/',update);
app.use('/',remove);


// create a write stream (in append mode) 
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
 
// setup the logger 
app.use(logger('combined', {stream: accessLogStream}))

/* mongoose db connection */
const db = 'mongodb://localhost/Movies';
mongoose.connect(db,{useMongoClient: true});

module.exports = app;
