// app.js
const express = require('express');
const bodyParser = require('body-parser');

const user = require('./routes/users.route'); // Imports routes for the products
const app = express();

const socket = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socket(server);

// The event will be called when a client is connected.
io.on('connection', socket => {
	console.log('User now Connected', socket.id)

	socket.on('Send', msg => {
		console.log(msg);
	})

	socket.on('disconnect', () => {
    console.log(`User Disconnected ${socket.id}`)
  })
})

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://testuser:066794355821jeypi@ds237445.mlab.com:37445/sertapplicationtesting';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/users', user);


let port = 5000;

server.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});