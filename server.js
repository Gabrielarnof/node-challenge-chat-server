const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];
let availableId = 1;

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.get("/messages", function (request, response) {
  response.json(messages);
});

app.get("/messages/:id", function (request, response) {
  let messageId = request.params.id;
  response.send(JSON.stringify(messages[messageId]));
});

app.post("/messages", function (request, response) {
  const { from, text } = request.body;
  const newMessage = { from, text };

  newMessage.id = availableId++;
  messages.push(newMessage);
  response.sendStatus(201);
  if (selectedId.length === 0) {
    return response.status(400).send({ mess: `This id doesn't exist` });
  }
  response.send(selectedId);
});
app.delete("/messages/:id", function (request, response) {
  let messageId = request.params.id;
  const selectedMessage = messages.find((message) => message.id == messageId);
  if (selectedMessage) {
    messages.splice(selectedMessage, 1);
    response.status(200).send("Message deleted");
  } else {
    response.status(404).send("Message not found");
  }
});
