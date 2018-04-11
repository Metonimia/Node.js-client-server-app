var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var express = require("express");

server.listen(3000);

var random = Math.floor(Math.random() * 10000 + 1);
console.log(random);

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
    socket.on("random_number", function(data) {
        console.log(data);
        if (data > random) {
            console.log("Za dużo");
            socket.emit("response", { number: data, message: " - Za dużo" });
        } else if (data < random) {
            console.log("Za mało");
            socket.emit("response", { number: data, message: " - Za mało" });
        } else if (data === random) {
            console.log("Dobrze");
            socket.emit("response", { number: data, message: " - Dobrze" });
            return;
        }
    });
});
