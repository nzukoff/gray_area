//import express and set up webserver on 3000
const express = require("express");
const app = express();
const server = app.listen(3000);

//import path so we can use the public folder
var path = require("path");

//import scoket.io
const io = require("socket.io")(server);

//import and set up the serial port 
const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort("/dev/tty.usbmodem1411", {
    baudRate: 9600
});

//expose the local public folder for inluding files js, css etc..
app.use(express.static("public"));
//respond to an http request with index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//use the serial port parser to delimit a packet of data on a newline
const parser = port.pipe(new Readline({ delimiter: "\r\n" }));

//pipe the serial port data though the parser and pass it to a webscoket called mysocket
parser.on("data", function(data) {
    io.sockets.emit("mysocket", data);
    console.log(data);
});