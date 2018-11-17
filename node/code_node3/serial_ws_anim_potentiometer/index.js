//import express 
const express = require("express");
const app = express();
//start server listening on port 8080
const server = app.listen(8080);
//include path module to read local filepath
var path = require("path");
//import socket.io for websockets
const io = require("socket.io")(server);
//import serialport to communicate with arduino
const SerialPort = require("serialport");
//set up port with baud rate of 9600
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort("/dev/tty.HC-05-DevB-1", {
    baudRate: 9600
});

//expose the local public folder for inluding files js, css etc..
app.use(express.static("public"));
//send index.html as response to request at /
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
//create a new parser that ends a packet of data on a newline 
const parser = port.pipe(new Readline({ delimiter: "\r\n" }));
//on data from serialport console log and emit on socket call data
parser.on("data", function(data) {
    io.sockets.emit("data", data);
    console.log(data);
});