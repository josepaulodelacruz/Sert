// app.js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);




const port = process.env.PORT || 5000;
const path = require('path');



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




server.listen(port, () => console.log(`Listening on port ${port}`));