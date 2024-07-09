const express = require("express");
const app = express(); //for handling http request and response.
const http = require("http");
const server = http.createServer(app); //creating http server for sending 1st http request to establish ws connection

const { Server } = require("socket.io"); //requiring websocket server
const io = new Server(server); //creating websocket server

//-----------------------------joing public folder------------------------------------------------------------
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
//-------------------------------io server is going to handle all the ws request---------------------------------
//Jab user io se connect hota hai to 'connection' event generate hota hai and to listen event in nodejs hum .on() method ka use karte hai and to emit event .emit() method ka use karte hai.
//ws me on method 2 parameter leta hai 1st event name and second callbackfunction and us function me user ki saari info send karta hai.
io.on("connection", function (clientInfo) {
  console.log("New user connected");
  //sending eventing to client.
  io.emit("connection", 'new user connected');
    
  //from now client event ko clintInfo.on() method ke through listen karega but emit hamesa server hi karega.
  clientInfo.on("user-msg", function (data) {
    console.log(data);
    io.emit("user-msg", data);
  });
});

//-------------------------------app server is going to handle all the http request--------------------------------------
app.get("/", function (req, res) {
  res.sendFile("/index.html");
});
console.log(path.join(__dirname, "public/index.html"));
server.listen(9000, function () {
  console.log("Server is running on port 9000");
});
