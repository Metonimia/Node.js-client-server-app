var socket = io.connect("http://localhost:3000");

var numberEmitter = setInterval(function() {
  var number = Math.floor(Math.random() * 10000 + 1);
  socket.emit("random_number", number);
}, 1000);

socket.on("response", function(data) {
  var number = data.number;
  var message = data.message;
  var newId =
    "id" +
    Math.random()
      .toString(16)
      .slice(2);
  var p = document.createElement("P");
  p.setAttribute("id", newId);
  document.getElementById("demo").appendChild(p);
  document.getElementById(newId).innerText = number + message;
  if (data.message === " - Dobrze") {
    clearInterval(numberEmitter);
  }
});
